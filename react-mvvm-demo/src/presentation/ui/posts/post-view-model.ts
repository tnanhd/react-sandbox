import { useQuery } from "@tanstack/react-query";
import { useUseCases } from "../../../infra/di/usecases";

export default function usePostsViewModel() {
  const { getPostsUseCase } = useUseCases();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostsUseCase.execute(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    posts: data,
    isLoading,
    error,
  };
}
