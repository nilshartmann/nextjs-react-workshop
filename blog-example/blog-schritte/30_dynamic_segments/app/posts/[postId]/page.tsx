import { fetchPost } from "@/app/shared/blog-fetch.ts";
import PostPageContent from "@/app/shared/material/postpage/PostPageContent.tsx";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: { postId: string };
};
export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPost(params.postId);

  if (!post) {
    notFound();
  }

  return <PostPageContent post={post} />;
}
