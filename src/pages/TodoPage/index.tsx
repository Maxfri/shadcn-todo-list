import { AddTodoForm } from "@/features/AddTodo";
import { TodoList } from "@/widgets/TodoList";
import { ThemeToggle } from "@/features/ThemeToggle/ui/ThemeToggle";

export const TodoPage = () => {
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 bg-background shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <ThemeToggle />
      </div>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};
