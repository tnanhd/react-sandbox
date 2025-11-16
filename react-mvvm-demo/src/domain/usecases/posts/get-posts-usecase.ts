import type { Post } from "../../models/post";
import type { IPostRepository } from "../../repositories/post-repository";

export class GetPostsUseCase {
  private postRepository: IPostRepository | undefined;

  constructor(postRepository?: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<Post[]> {
    if (!this.postRepository) {
      console.error("postRepository is undefined");
      throw new Error("postRepository is undefined");
    }
    console.log(`repo: ${this.postRepository}`);
    return await this.postRepository!.getAllPosts();
  }
}
