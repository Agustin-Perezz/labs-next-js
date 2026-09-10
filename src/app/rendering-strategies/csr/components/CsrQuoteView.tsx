const LOADING_MESSAGE = "Fetching a fresh GitHub aphorism…";
const QUOTE_HEADING = "GitHub Zen";

export type FetchState =
  | { status: "loading" }
  | { status: "success"; quote: string }
  | { status: "error"; message: string };

type CsrQuoteViewProps = {
  state: FetchState;
};

export function CsrQuoteView({ state }: CsrQuoteViewProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-24 w-full max-w-xl flex-col gap-3 rounded-xl bg-white p-6 text-zinc-900 ring-1 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800"
    >
      <h2 className="text-lg font-medium">{QUOTE_HEADING}</h2>
      {state.status === "loading" && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {LOADING_MESSAGE}
        </p>
      )}
      {state.status === "success" && (
        <blockquote className="border-l-2 border-zinc-300 pl-4 text-base italic dark:border-zinc-700">
          {state.quote}
        </blockquote>
      )}
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
    </div>
  );
}
