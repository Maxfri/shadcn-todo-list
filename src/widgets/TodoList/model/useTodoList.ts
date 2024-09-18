import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/shared/api";
import { Todo } from "@/entities/Todo";

export const useTodoList = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Todo[]>("/todos");
      return data;
    },
  });
};
