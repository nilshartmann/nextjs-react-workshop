import { IBlogPostSchema, IGetPostResponse } from "@/app/shared/types.ts";
import Post from "@/app/shared/material/Post.tsx";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import PostComments from "@/app/shared/material/postpage/PostComments_RSC.tsx";
import { fetchComments } from "@/app/shared/blog-fetch.ts";
import { ErrorBoundary } from "react-error-boundary";
import CommentsErrorBoundary from "@/app/shared/material/postpage/CommentsErrorBoundary.tsx";
import Timer from "@/app/Timer.tsx";
import ErrorHandler from "@/app/posts/[postId]/CommentsErrorHandler.tsx";

type PostPageContentProps = {
  post: IGetPostResponse;
};

export default function PostPageContent({ post }: PostPageContentProps) {
  // if (true) {
  //   throw new Error("Schade, kaputt!");
  // }

  const apiKey = process.env.API_SECRECT_KEY;

  return (
    <>
      <Post post={post.data} />
      {/*<Timer />*/}

      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Suspense fallback={<h1>Loading Comments...</h1>}>
          <PostComments commentsPromise={commentsPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function EB({ FallbackComponent }: any) {
  return <FallbackComponent />;
}
