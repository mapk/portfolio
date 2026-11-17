import PortfolioGrid from "@/components/PortfolioGrid";
import { getRecentHighlights } from "@/lib/curius";

// Re-fetch Curius highlights at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const readingSnippets = await getRecentHighlights();

  return (
    <main className="portfolio-main baseline-grid relative z-10 min-h-screen">
      <PortfolioGrid readingSnippets={readingSnippets} />
    </main>
  );
}
