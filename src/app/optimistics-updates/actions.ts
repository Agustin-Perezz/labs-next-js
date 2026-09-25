"use server";

import { revalidatePath } from "next/cache";

// Pretend this is your DB
let todos = [{ id: 1, text: "Learn Next.js", done: false }];

// Texts containing this marker make addTodo fail, to demo the error path
const FAILURE_MARKER = "[fail]";

export async function addTodo(text: string) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1000));

  // Simulate a server-side failure for texts marked as failing
  if (text.includes(FAILURE_MARKER)) {
    throw new Error("Failed to add todo");
  }

  const newTodo = { id: Date.now(), text, done: false };
  todos = [...todos, newTodo];

  revalidatePath("/todos");
  return newTodo;
}

export async function getTodos() {
  return todos;
}
