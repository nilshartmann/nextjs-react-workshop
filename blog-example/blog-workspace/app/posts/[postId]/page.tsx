import { fetchPost } from "@/app/shared/blog-fetch.ts";
import Post from "@/app/shared/material/Post.tsx";
import { notFound } from "next/navigation";
import PostPageContent from "@/app/shared/material/postpage/PostPageContent.tsx";

type PostPageProps = {
  params: {
    postId: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const postId = params.postId;
  console.log("POST ID", postId);
  const post = await fetchPost(postId);

  if (!post) {
    notFound();
  }

  return <PostPageContent post={post} />;
}
