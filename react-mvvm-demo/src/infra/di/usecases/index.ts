import { useContext } from "react";
import { UseCaseDependencyContext } from "./UseCaseDependencyProvider";
import { GetPostsUseCase } from "../../../domain/usecases/posts/get-posts-usecase";
import { GetPostUseCase } from "../../../domain/usecases/posts/get-post-usecase";
import type { RepositoryModule } from "../../../data/module";

export type UseCaseModule = {
  getPostsUseCase: GetPostsUseCase;
  getPostUseCase: GetPostUseCase;
};

export function useUseCaseModule(
  repositories: RepositoryModule
): UseCaseModule {
  const { postRepository } = repositories;

  return {
    getPostsUseCase: new GetPostsUseCase(postRepository),
    getPostUseCase: new GetPostUseCase(postRepository),
  };
}

export const useUseCases: () => UseCaseModule = () => {
  const context = useContext(UseCaseDependencyContext);
  console.log(`context`, context);
  if (context === null) {
    console.error("useDependencies must be used within a DependencyProvider");
    throw new Error("useDependencies must be used within a DependencyProvider");
  }
  return useContext(UseCaseDependencyContext)!;
};
