import type { Metadata } from "next";
import { Suspense } from "react";

import { getCurrentServerTime } from "./actions";
import { SsrBackLink } from "./components/SsrBackLink";
import { SsrExplanationCard } from "./components/SsrExplanationCard";
import { SsrServerTimeBadge } from "./components/SsrServerTimeBadge";

export const metadata: Metadata = {
  title: "SSR — Server-Side Rendering",
  description:
    "A server-rendered page that fetches fresh data on every request to demonstrate Next.js SSR.",
};

const FALLBACK_LABEL = "Loading server time…";

async function DynamicTimeBadge() {
  const snapshot = await getCurrentServerTime();
  return <SsrServerTimeBadge snapshot={snapshot} />;
}

export default function SSRPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <SsrExplanationCard />
      <Suspense
        fallback={
          <div className="flex w-full max-w-xl items-center justify-center rounded-xl border border-zinc-300 border-dashed p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {FALLBACK_LABEL}
          </div>
        }
      >
        <DynamicTimeBadge />
      </Suspense>
      <SsrBackLink />
    </div>
  );
}
