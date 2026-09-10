import type { ServerTimeSnapshot } from "../actions";

type SsrServerTimeBadgeProps = {
  snapshot: ServerTimeSnapshot;
};

const BADGE_LABEL = "Rendered on the server at";
const REQUEST_ID_LABEL = "Request ID";

export function SsrServerTimeBadge({ snapshot }: SsrServerTimeBadgeProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex w-full max-w-xl flex-col gap-2 rounded-xl bg-white p-6 text-zinc-900 ring-1 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {BADGE_LABEL}
      </span>
      <time
        dateTime={snapshot.iso}
        className="text-2xl font-semibold tracking-tight"
      >
        {snapshot.formatted}
      </time>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {REQUEST_ID_LABEL}: {snapshot.requestId}
      </span>
    </div>
  );
}
