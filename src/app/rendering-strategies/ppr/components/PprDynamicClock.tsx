import { connection } from "next/server";

const SLEEP_MS = 1500;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function PprDynamicClock() {
  // Opt out of prerendering: everything below runs at request time only.
  await connection();
  await sleep(SLEEP_MS);
  const serverTime = new Date().toISOString();

  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Streamed at request time
      </p>
      <p className="font-mono text-sm text-zinc-900 dark:text-zinc-50">
        {serverTime}
      </p>
    </div>
  );
}
