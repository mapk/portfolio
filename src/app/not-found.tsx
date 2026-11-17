import Link from "next/link";
import MissingPath from "@/components/MissingPath";

export default function NotFound() {
  return (
    <main className="portfolio-main baseline-grid pt-12 text-sm">
      <p className="text-zinc-600">
        $ cd <MissingPath />
      </p>
      <p className="text-zinc-400">
        bash: cd: <MissingPath />: No such file or directory
      </p>
      <p className="mt-[var(--baseline)]">
        <span className="text-zinc-600">$ </span>
        <Link href="/" className="text-white">
          cd ~
        </Link>
        <span className="cursor-blink" aria-hidden="true">
          █
        </span>
      </p>
    </main>
  );
}
