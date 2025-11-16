import type { Post } from "../models/post";

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post>;
  createPost(post: Post): Promise<void>;
  updatePost(post: Post): Promise<void>;
  deletePost(id: number): Promise<void>;
}
