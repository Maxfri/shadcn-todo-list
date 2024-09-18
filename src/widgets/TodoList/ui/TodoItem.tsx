import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import { Todo } from "@/entities/Todo";

import { Checkbox, Button } from "@/shared/ui";

import { useToggleTodo } from "@/features/ToggleTodo";
import { useDeleteTodo } from "@/features/DeleteTodo";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggle = () => {
    toggleTodo.mutate(todo);
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-2 bg-muted rounded">
      <div className="flex items-center space-x-2">
        <Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
        <span
          className={todo.completed ? "line-through text-muted-foreground" : ""}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          {format(new Date(todo.date), "MMM d, yyyy")}
        </span>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
};
