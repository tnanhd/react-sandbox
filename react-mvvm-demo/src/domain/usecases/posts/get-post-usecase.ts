import type { Post } from "../../models/post";
import type { IPostRepository } from "../../repositories/post-repository";

export class GetPostUseCase {
  private postRepository: IPostRepository;
  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(id: number): Promise<Post> {
    return await this.postRepository.getPostById(id);
  }
}
