import { AddTodoForm } from "@/features/AddTodo";
import { TodoList } from "@/widgets/TodoList";

export const TodoPage = () => {
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 bg-background shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};
