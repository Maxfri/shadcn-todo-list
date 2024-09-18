import { useState } from "react";
import { Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Input,
  Button,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
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
    <div className="space-y-2 mb-4">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[140px] pl-3 text-left text-sm"
            >
              {selectedDate ? format(selectedDate, "PPP") : "Выберите дату"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Новая задача"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
