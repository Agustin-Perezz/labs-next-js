import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SSG_USE_CASES: readonly string[] = [
  "Marketing landing pages",
  "Documentation sites",
  "Blog posts and articles",
];

const BUILD_TIME_FACT =
  "After `next build`, this page is a pre-rendered HTML file on disk — no server request needed to serve it.";

export function SsgExplanationCard() {
  return (
    <Card className="w-full max-w-xl bg-white text-zinc-900 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Static Site Generation (SSG)
        </CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          HTML is generated once at build time, then reused for every request.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section>
          <h2 className="mb-2 text-lg font-medium">When to use it</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {SSG_USE_CASES.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium">Build-time fact</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {BUILD_TIME_FACT}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
