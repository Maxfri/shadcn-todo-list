import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Trash2, Plus, Search, Filter } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [textFilter, setTextFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const addTodo = () => {
    if (newTodo.trim() !== "" && selectedDate) {
      setTodoList([
        ...todoList,
        { id: Date.now(), text: newTodo, completed: false, date: selectedDate },
      ]);
      setNewTodo("");
      setSelectedDate(new Date());
    }
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodoList = todoList.filter(
    (todo) =>
      todo.text.toLowerCase().includes(textFilter.toLowerCase()) &&
      (!dateFilter ||
        format(todo.date, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd"))
  );

  return (
    <div className="max-w-md mx-auto p-4 bg-background shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter by text"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {dateFilter ? (
                  format(dateFilter, "PPP")
                ) : (
                  <span>Filter by date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[140px] pl-3 text-left font-normal"
            >
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={addTodo}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add todo</span>
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTodoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-muted rounded"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {format(todo.date, "MMM d, yyyy")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete todo</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
