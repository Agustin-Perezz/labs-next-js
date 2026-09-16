import type { Metadata } from "next";

import { PprBackLink } from "./components/PprBackLink";
import { PprExplanationCard } from "./components/PprExplanationCard";
import { PprStaticShell } from "./components/PprStaticShell";

export const metadata: Metadata = {
  title: "PPR — Partial Prerendering",
  description:
    "A page demonstrating Partial Prerendering: a static shell served instantly with dynamic content streamed in via Suspense.",
};

export default function PPRPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <PprStaticShell />
      <PprExplanationCard />
      <PprBackLink />
    </div>
  );
}
