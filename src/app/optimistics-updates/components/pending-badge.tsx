const OPTIMISTIC_LABEL_PENDING = "Saving…";

export function PendingBadge() {
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
      {OPTIMISTIC_LABEL_PENDING}
    </span>
  );
}
