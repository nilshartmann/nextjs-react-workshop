import { fetchPosts } from "@/app/shared/blog-fetch.ts";
import PostList from "@/app/shared/material/postlistpage/PostList.tsx";
import { revalidatePath } from "next/cache";

export default async function PostsPage() {
  // revalidatePath("/posts")

  // Promise API
  // const p = fetch("/api/posts");
  // p.then( data => console.log(data) );
  // async/await
  // const data = await fetch("/api/posts");
  // ....
  // console.log(data)
  const postsPromise = fetchPosts();

  return (
    <>
      <PostList postsPromise={postsPromise} />
    </>
  );
}
