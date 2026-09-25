"use client";

import { useRef } from "react";
import { AddTodoForm } from "./add-todo-form";
import { PageHeader } from "./page-header";
import { TodoError } from "./todo-error";
import { TodoItem } from "./todo-item";
import { useTodoActions } from "./use-todo-actions";

type Todo = { id: number; text: string; done: boolean };

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { error, formAction, optimisticTodos } = useTodoActions(initialTodos);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <PageHeader />

      <ul className="flex flex-col gap-2">
        {optimisticTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>

      {error && <TodoError message={error} />}

      <AddTodoForm formRef={formRef} onAddTodo={formAction} />
    </div>
  );
}
