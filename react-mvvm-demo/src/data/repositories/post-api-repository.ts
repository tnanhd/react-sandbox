import type { Post } from "../../domain/models/post";
import type { IPostRepository } from "../../domain/repositories/post-repository";
import httpService from "../datasource/http-service";

export class PostApiRepository implements IPostRepository {
  async getAllPosts(): Promise<Post[]> {
    return (await httpService.get("/posts")).data;
  }

  async getPostById(id: number): Promise<Post> {
    return (await httpService.get(`/posts/${id}`)).data;
  }

  async createPost(post: Post): Promise<void> {
    const response = await httpService.post("/posts", post);
    return response.data;
  }

  async updatePost(post: Post): Promise<void> {
    const response = await httpService.put(`/posts/${post.id}`, post);
    return response.data;
  }

  async deletePost(id: number): Promise<void> {
    const response = await httpService.delete(`/posts/${id}`);
    return response.data;
  }
}
