import { fetchPosts } from "@/app/shared/blog-fetch.ts";
import PostList from "@/app/shared/material/postlistpage/PostList.tsx";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type PostsPageProps = {
  searchParams: {
    order_by: "asc" | "desc";
  };
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  console.log("SEARCH PARAMS", searchParams);

  // revalidatePath("/posts")

  // Promise API
  // const p = fetch("/api/posts");
  // p.then( data => console.log(data) );
  // async/await
  // const data = await fetch("/api/posts");
  // ....
  // console.log(data)
  const postsPromise = fetchPosts(searchParams.order_by);

  return (
    <>
      <Link href={"/posts?order_by=asc"}>
        Sortieren nach Datum (aufsteigend)
      </Link>
      <Link href={"/posts?order_by=desc"}>
        Sortieren nach Datum (absteigend)
      </Link>
      <PostList postsPromise={postsPromise} />
    </>
  );
}
