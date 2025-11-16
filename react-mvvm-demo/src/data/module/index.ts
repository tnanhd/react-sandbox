import type { IPostRepository } from "../../domain/repositories/post-repository";
import { PostApiRepository } from "../repositories/post-api-repository";

export type RepositoryModule = {
  postRepository: IPostRepository;
};

const postRepository = new PostApiRepository();

export function useRepositoryModule(): RepositoryModule {
  return {
    postRepository,
  };
}
