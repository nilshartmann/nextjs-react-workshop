import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { Suspense } from "react";
import Post from "@/app/material/Post.tsx";
import PostComments from "@/app/material/postpage/PostComments.tsx";
import { fetchComments, fetchPost } from "@/app/shared/blog-fetch.ts";
import PostPageContent from "@/app/posts/[postId]/PostPageContent.tsx";
import { notFound } from "next/navigation";

type PostPageParams = {
  postId: string;
};
type PostPageProps = {
  params: PostPageParams;
};
export default async function PostPage({ params }: PostPageProps) {
  // todo: mit fetchPost das Post laden
  // todo #2: mit fetchComments die Kommentare laden

  const post = await fetchPost(params.postId);

  if (!post) {
    notFound();
  }

  return <PostPageContent post={post} />;
}
