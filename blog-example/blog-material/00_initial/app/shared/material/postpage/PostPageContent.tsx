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
  // todo: Lade die Kommentare für den übergebenen BlogPost mit 'fetchComments'
  //       - übergib das Promise an die (fertige) 'PostComments'-Komponente
  //       - verwende die Suspense-Komponente, um ein Fallback darzustellen,
  //         während die Kommentare geladen werden
  return (
    <>
      <Post post={post.data} />
    </>
  );
}
