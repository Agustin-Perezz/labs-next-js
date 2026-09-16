import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PPR_TITLE = "Partial Prerendering (PPR)";
const PPR_DESCRIPTION =
  "One route, two speeds: a static shell prerendered at build time, with dynamic holes streamed in at request time through Suspense boundaries.";

const PPR_STEPS: readonly string[] = [
  "cacheComponents (next.config) enables PPR as the default behavior for the App Router",
  "During next build, the page is prerendered up to the first Suspense boundary — everything outside it becomes the static shell",
  "The user receives the shell instantly (TTFB is cache-fast), with fallback UI inside the Suspense holes",
  "The dynamic component calls connection(), opting out of prerendering — it re-runs on every request",
  "React streams the resolved dynamic HTML into the same response; no client round-trip is needed",
  "Unlike ISR, the shell never goes stale — only the dynamic hole is computed per request",
] as const;

export function PprExplanationCard() {
  return (
    <Card className="w-full max-w-xl bg-white text-zinc-900 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {PPR_TITLE}
        </CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          {PPR_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section>
          <h2 className="mb-2 font-medium text-lg">How this example works</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {PPR_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
