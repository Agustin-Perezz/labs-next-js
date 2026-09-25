import { PendingBadge } from "./pending-badge";

type TodoItemProps = {
  id: string;
  text: string;
  pending?: boolean;
};

export function TodoItem({ id, text, pending }: TodoItemProps) {
  return (
    <li
      key={id}
      className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3"
    >
      <span className={pending ? "text-muted-foreground" : "text-foreground"}>
        {text}
      </span>
      {pending && <PendingBadge />}
    </li>
  );
}
