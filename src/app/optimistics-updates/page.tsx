import { getTodos } from "./actions";
import TodoList from "./components/todo-list";

export default async function TodosPage() {
  const todos = await getTodos();
  return <TodoList initialTodos={todos} />;
}
