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

const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  all: "Все",
  completed: "Выполненные",
  active: "Активные",
};

const SORT_OPTION_LABELS: Record<SortOption, string> = {
  date: "Дата",
  text: "Текст",
};

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
        <Input
          placeholder="Фильтр по тексту"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          className="flex-grow"
        />
        <Select
          value={statusFilter}
          onValueChange={(value: StatusFilter) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {STATUS_FILTER_LABELS[filter]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortOption}
          onValueChange={(value: SortOption) => setSortOption(value)}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Сортировать по" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {SORT_OPTION_LABELS[option]}
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
