import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
        404
      </h1>
      <p className="mb-8 text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-zinc-400 underline underline-offset-4 transition-colors hover:text-white focus:text-white focus:outline-none"
      >
        Back to home
      </Link>
    </main>
  );
}
