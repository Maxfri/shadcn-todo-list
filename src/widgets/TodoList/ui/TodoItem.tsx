import { Trash2 } from "lucide-react";
import { format } from "date-fns";

import { useToggleTodo } from "@/features/ToggleTodo";
import { useDeleteTodo } from "@/features/DeleteTodo";

import { Todo } from "@/entities/Todo";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui/accordion";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
}

const MAX_TEXT_LENGTH = 80;

export const TodoItem = ({ todo }: TodoItemProps) => {
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggle = () => {
    toggleTodo.mutate(todo);
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  const isTextLong = todo.text.length > MAX_TEXT_LENGTH;

  return (
    <li className="p-2 bg-muted rounded w-full">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-start space-x-2">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            id={`todo-${todo.id}`}
          />

          {isTextLong ? (
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value={`item-${todo.id}`} className="border-none">
                <AccordionTrigger className="w-full">
                  <span
                    className={cn(
                      "inline-block w-full text-sm break-words",
                      todo.completed ? "line-through text-muted-foreground" : ""
                    )}
                  >
                    {todo.text.slice(0, MAX_TEXT_LENGTH)}...
                  </span>
                </AccordionTrigger>
                <AccordionContent className="w-full">
                  <p
                    className={cn(
                      todo.completed ? "line-through text-muted-foreground" : ""
                    )}
                  >
                    {todo.text}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <label
              htmlFor={`todo-${todo.id}`}
              className={cn(
                "text-sm",
                todo.completed ? "line-through text-muted-foreground" : ""
              )}
            >
              {todo.text}
            </label>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {format(new Date(todo.date), "MMM d, yyyy")}
          </span>
          <Button variant="ghost" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
};
