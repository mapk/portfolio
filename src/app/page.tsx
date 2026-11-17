import PortfolioGrid from "@/components/PortfolioGrid";
import { getRecentHighlights } from "@/lib/curius";

// Re-fetch Curius highlights at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const readingSnippets = await getRecentHighlights();
  // ISR render time; shown as "synced … ago" in the status bar.
  const generatedAt = new Date().toISOString();

  return (
    <main className="portfolio-main baseline-grid relative z-10 min-h-screen">
      <PortfolioGrid
        readingSnippets={readingSnippets}
        generatedAt={generatedAt}
      />
    </main>
  );
}
