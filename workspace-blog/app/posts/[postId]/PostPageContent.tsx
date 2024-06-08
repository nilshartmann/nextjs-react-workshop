import { IBlogPostSchema, IGetPostResponse } from "@/app/shared/types.ts";
import Post from "@/app/material/Post.tsx";
import { Suspense } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import PostComments from "@/app/material/postpage/PostComments.tsx";
import { fetchComments } from "@/app/shared/blog-fetch.ts";

type PostPageContentProps = {
  post: IGetPostResponse;
};

export default function PostPageContent({ post }: PostPageContentProps) {
  const commentsPromise = fetchComments(post.data.id);
  return (
    <>
      <Post post={post.data} />

      <Suspense
        fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
      >
        <PostComments commentsPromise={commentsPromise} />
      </Suspense>
    </>
  );
}
