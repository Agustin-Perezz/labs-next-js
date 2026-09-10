import type { Metadata } from "next";

import { SsgBackLink } from "./components/SsgBackLink";
import { SsgExplanationCard } from "./components/SsgExplanationCard";

export const metadata: Metadata = {
  title: "SSG — Static Site Generation",
  description:
    "A statically generated page rendered at build time to demonstrate Next.js SSG.",
};

export default function SSGPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <SsgExplanationCard />
      <SsgBackLink />
    </div>
  );
}
