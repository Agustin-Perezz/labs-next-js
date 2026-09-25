"use client";

import { useOptimistic, useState } from "react";
import { addTodo } from "../actions";

type Todo = { id: number; text: string; done: boolean };
type OptimisticTodo = Todo & { pending?: boolean };
type UseTodoActionsResult = {
  error: string | null;
  formAction: (formData: FormData) => Promise<void>;
  optimisticTodos: OptimisticTodo[];
};

export function useTodoActions(
  initialTodos: OptimisticTodo[],
): UseTodoActionsResult {
  const [todos, setTodos] = useState(initialTodos);
  const [error, setError] = useState<string | null>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodoText: string): OptimisticTodo[] => [
      ...state,
      { id: Math.random(), text: newTodoText, done: false, pending: true },
    ],
  );

  async function formAction(formData: FormData) {
    const text = formData.get("text") as string;
    addOptimisticTodo(text);
    try {
      // Sync real state once the server confirms
      const newTodo = await addTodo(text);
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch {
      // Drop the optimistic ghost with a fresh state reference (same
      // content) so useOptimistic discards the overlay.
      setTodos((prev) => [...prev]);
      setError(`Could not save "${text}". Please try again.`);
    }
  }

  return { error, formAction, optimisticTodos };
}
