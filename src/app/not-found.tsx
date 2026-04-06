import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-5xl pl-4 pr-4 pt-12 md:pl-12 md:pr-12">
      <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
        404
      </h1>
      <p className="mb-4 text-sm text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm text-zinc-400 transition-colors hover:text-white focus:text-white focus:outline-none"
      >
        Back to home
      </Link>
    </main>
  );
}
