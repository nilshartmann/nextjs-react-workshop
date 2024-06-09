import PostList from "@/app/shared/material/postlistpage/PostList.tsx";
import { fetchPosts } from "@/app/shared/blog-fetch.ts";

export default async function PostListPage() {
  const postsPromise = fetchPosts();
  return (
    <>
      <PostList postsPromise={postsPromise} />
    </>
  );
}
