import { useState } from "react";
import { Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Button,
  Input,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";

import { useAddTodo } from "../model/useAddTodo";

export const AddTodoForm = () => {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const addTodo = useAddTodo();

  const handleAdd = () => {
    if (text.trim() && selectedDate) {
      addTodo.mutate({
        text,
        date: selectedDate.toISOString(),
        completed: false,
      });
      setText("");
      setSelectedDate(new Date());
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        placeholder="New todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[140px] pl-3 text-left">
            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleAdd}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
