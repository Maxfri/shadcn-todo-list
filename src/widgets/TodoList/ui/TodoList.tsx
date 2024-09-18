import { useState } from "react";

import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";

import { TodoItem } from "./TodoItem";
import { useTodoList } from "../model/useTodoList";
import { SortOption, StatusFilter } from "../model/types";
import { SORT_OPTIONS, STATUS_FILTERS } from "../model/constance";

export const TodoList = () => {
  const { data: todoList = [], isLoading, isError } = useTodoList();
  const [textFilter, setTextFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [sortOption, setSortOption] = useState<SortOption>("date");

  if (isLoading) return <div>Загрузка...</div>;

  if (isError) return <div>Ошибка при загрузке задач</div>;

  const filteredTodoList = todoList
    .filter((todo) => {
      if (statusFilter === "completed" && !todo.completed) return false;
      if (statusFilter === "active" && todo.completed) return false;
      return todo.text.toLowerCase().includes(textFilter.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return a.text.localeCompare(b.text);
      }
    });

  return (
    <div>
      <div className="space-y-2 mb-4">
        <Input
          placeholder="Filter by text"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
        />
        <Select
          value={statusFilter}
          onValueChange={(value: StatusFilter) => setStatusFilter(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((status) => (
              <SelectItem value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortOption}
          onValueChange={(value: SortOption) => setSortOption(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ul className="space-y-2">
        {filteredTodoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};
