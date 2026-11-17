"use client";

import { usePathname } from "next/navigation";

/** The requested path, for the terminal-style 404 message. */
export default function MissingPath() {
  return <>{usePathname() ?? "/"}</>;
}
