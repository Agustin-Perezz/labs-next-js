import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddTodoFormProps = {
  formRef: React.RefObject<HTMLFormElement | null>;
  onAddTodo: (formData: FormData) => void;
};

export function AddTodoForm({ formRef, onAddTodo }: AddTodoFormProps) {
  return (
    <form ref={formRef} action={onAddTodo} className="flex gap-2">
      <Input
        type="text"
        name="text"
        placeholder="New todo"
        required
        aria-label="New todo"
        className="flex-1"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
