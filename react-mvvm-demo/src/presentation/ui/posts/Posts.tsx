import postViewModel from "./post-view-model";

export default function Posts() {
  const viewModel = postViewModel();

  if (viewModel.isLoading) return <div>Loading...</div>;
  if (viewModel.error) return <div>{viewModel.error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      {viewModel.posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
