import { fetchComments, fetchPost } from "@/app/shared/blog-fetch.ts";
import Post from "@/app/shared/material/Post.tsx";
import { notFound } from "next/navigation";
import PostPageContent from "@/app/shared/material/postpage/PostPageContent.tsx";
import { useEffect, useState } from "react";

type PostPageProps = {
  params: {
    postId: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const postId = params.postId;
  console.log("POST ID", postId);

  const commentsPromise = fetchComments(post.data.id);
  const post = await fetchPost(postId); // Next.js -> Spring Boot

  if (!post) {
    notFound();
  }

  return <PostPageContent post={post} />; // Next.js -> Browser UI Code
}

// CLIENT KOMPONENTE
//   TanStack Query  oder SWR
// function PostPageVomBrowser() {
//   const postId = "P7";
//   const [post, setPost] = useState<any>();
//
//   useEffect(() => {
//     const loadedBlogPost = fetchPost(postId);
//     setPost(loadedBlogPost);
//     // ...
//   }, []);
//
//   return <PostPageContent post={post} />;
// }
