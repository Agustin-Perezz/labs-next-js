import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SSR_USE_CASES: readonly string[] = [
  "Personalized pages behind authentication",
  "Dashboards with data that changes per request",
  "Pages that must always show fresh server data",
];

const SSR_VS_SSG_FACT =
  "Unlike SSG, this page runs on the server for every request — the timestamp below is generated now, not at build time.";

export function SsrExplanationCard() {
  return (
    <Card className="w-full max-w-xl bg-white text-zinc-900 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Server-Side Rendering (SSR)
        </CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          HTML is generated on the server for every request, so it is always
          fresh.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section>
          <h2 className="mb-2 text-lg font-medium">When to use it</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {SSR_USE_CASES.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium">SSR vs SSG</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {SSR_VS_SSG_FACT}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
