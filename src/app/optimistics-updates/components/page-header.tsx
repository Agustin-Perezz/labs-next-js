export function PageHeader() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">
        Optimistic Updates
      </h1>
      <p className="text-muted-foreground">
        Add a todo and watch it appear instantly, then confirm once the server
        responds.
      </p>
    </header>
  );
}
