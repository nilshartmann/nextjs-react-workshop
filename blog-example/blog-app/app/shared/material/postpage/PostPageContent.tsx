import { IBlogPostSchema, IGetPostResponse } from "@/app/shared/types.ts";
import Post from "@/app/shared/material/Post.tsx";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import PostComments from "@/app/shared/material/postpage/PostComments.tsx";
import { fetchComments } from "@/app/shared/blog-fetch.ts";
import { ErrorBoundary } from "react-error-boundary";
import CommentsErrorBoundary from "@/app/shared/material/postpage/CommentsErrorBoundary.tsx";

type PostPageContentProps = {
  post: IGetPostResponse;
};

export default function PostPageContent({ post }: PostPageContentProps) {
  const commentsPromise = fetchComments(post.data.id);
  return (
    <>
      <Post post={post.data} />

      <ErrorBoundary FallbackComponent={CommentsErrorBoundary}>
        <Suspense
          fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
        >
          <PostComments commentsPromise={commentsPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
