// Pulls recent highlights from Curius (https://curius.app/mapk-uraine).
// Curius has no official API, but its public JSON endpoints back the profile
// page. Highlights carry no author, so each article's own HTML metadata is
// read for that. Everything is cached via Next's fetch cache (ISR).

const CURIUS_USER_ID = 6861;
const REVALIDATE_SECONDS = 60 * 60;
const MAX_SNIPPETS = 2;

export type ReadingSnippet = {
  id: number;
  title: string;
  author: string | null;
  url: string;
  highlight: string;
};

type CuriusHighlight = {
  id: number;
  userId: number;
  highlight: string;
  createdDate: string;
};

type CuriusLink = {
  id: number;
  link: string;
  title: string;
  highlights?: CuriusHighlight[];
};

const TRACKING_PARAMS = /^(utm_\w+|ref|ref_src|fbclid|gclid|mc_\w+)$/i;

const cleanUrl = (raw: string) => {
  try {
    const url = new URL(raw);
    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_PARAMS.test(key)) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return raw;
  }
};

// Used for de-duping the same article saved twice with different params.
const urlKey = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const metaContent = (html: string, key: string) => {
  // Attribute order varies, so match the whole tag and pull content out.
  const tagRe = new RegExp(
    `<meta[^>]+(?:name|property)=["']${key}["'][^>]*>`,
    "i",
  );
  const tag = html.match(tagRe)?.[0];
  const content = tag?.match(/content=["']([^"']+)["']/i)?.[1];
  return content ? decodeEntities(content.trim()) : null;
};

const jsonLdAuthor = (html: string) => {
  const blocks = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const [, body] of blocks) {
    try {
      const data = JSON.parse(body);
      const nodes = Array.isArray(data) ? data : (data["@graph"] ?? [data]);
      for (const node of nodes) {
        const author = node?.author;
        const first = Array.isArray(author) ? author[0] : author;
        const name = typeof first === "string" ? first : first?.name;
        if (name) return String(name).trim();
      }
    } catch {
      // Malformed JSON-LD is common; skip it.
    }
  }
  return null;
};

const fetchAuthor = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-reader)" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const author =
      metaContent(html, "author") ??
      jsonLdAuthor(html) ??
      metaContent(html, "article:author");
    // article:author is sometimes a profile URL rather than a name.
    if (!author || /^https?:\/\//.test(author)) {
      return metaContent(html, "og:site_name");
    }
    return author;
  } catch {
    return null;
  }
};

// Strip a trailing " · Author" / " | Site" from the title when it repeats the author.
const cleanTitle = (title: string, author: string | null) => {
  if (!author) return title.trim();
  const re = new RegExp(`\\s*[·|–—-]\\s*${author.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
  return title.replace(re, "").trim();
};

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export const getRecentHighlights = async (): Promise<ReadingSnippet[]> => {
  try {
    const res = await fetch(
      `https://curius.app/api/users/${CURIUS_USER_ID}/links?page=0`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return [];
    const { userSaved } = (await res.json()) as { userSaved?: CuriusLink[] };

    // One snippet per article: that article's most recent highlight of mine.
    const seen = new Set<string>();
    const picks: { link: CuriusLink; highlight: CuriusHighlight }[] = [];
    for (const link of userSaved ?? []) {
      const key = urlKey(cleanUrl(link.link));
      if (seen.has(key)) continue;
      const latest = (link.highlights ?? [])
        .filter((h) => h.userId === CURIUS_USER_ID && h.highlight?.trim())
        .sort((a, b) => b.createdDate.localeCompare(a.createdDate))[0];
      if (!latest) continue;
      seen.add(key);
      picks.push({ link, highlight: latest });
    }

    picks.sort((a, b) =>
      b.highlight.createdDate.localeCompare(a.highlight.createdDate),
    );

    return Promise.all(
      picks.slice(0, MAX_SNIPPETS).map(async ({ link, highlight }) => {
        const url = cleanUrl(link.link);
        const author = (await fetchAuthor(url)) ?? hostname(url);
        return {
          id: highlight.id,
          title: cleanTitle(link.title, author),
          author,
          url,
          highlight: highlight.highlight.trim(),
        };
      }),
    );
  } catch {
    return [];
  }
};
