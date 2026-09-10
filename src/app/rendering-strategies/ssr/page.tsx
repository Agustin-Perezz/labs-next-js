import type { Metadata } from "next";

import { getCurrentServerTime } from "./actions";
import { SsrBackLink } from "./components/SsrBackLink";
import { SsrExplanationCard } from "./components/SsrExplanationCard";
import { SsrServerTimeBadge } from "./components/SsrServerTimeBadge";

export const metadata: Metadata = {
  title: "SSR — Server-Side Rendering",
  description:
    "A server-rendered page that fetches fresh data on every request to demonstrate Next.js SSR.",
};

export default async function SSRPage() {
  const serverTimeSnapshot = await getCurrentServerTime();

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <SsrExplanationCard />
      <SsrServerTimeBadge snapshot={serverTimeSnapshot} />
      <SsrBackLink />
    </div>
  );
}
