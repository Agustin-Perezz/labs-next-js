import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PprDynamicClock } from "./PprDynamicClock";

const SHELL_TITLE = "Static shell — prerendered at build time";
const SHELL_DESCRIPTION =
  "This card is part of the static shell. It is served instantly from the prerendered HTML, while the clock below streams in.";
const FALLBACK_LABEL = "Loading dynamic content…";

export function PprStaticShell() {
  return (
    <Card className="w-full max-w-xl bg-white text-zinc-900 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {SHELL_TITLE}
        </CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          {SHELL_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="animate-pulse rounded-md border border-zinc-300 border-dashed p-3 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {FALLBACK_LABEL}
            </div>
          }
        >
          <PprDynamicClock />
        </Suspense>
      </CardContent>
    </Card>
  );
}
