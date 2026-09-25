type TodoErrorProps = { message: string };

export function TodoError({ message }: TodoErrorProps) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
