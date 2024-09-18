import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api";
import { Todo } from "@/entities/Todo";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const { data } = await axiosInstance.put(
        `/todos/${todo.id}`,
        updatedTodo
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
