import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Todo } from "@/entities/Todo";

interface NewTodo {
  text: string;
  date: string;
  completed: boolean;
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const { data } = await axiosInstance.post<Todo>("/todos", newTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
