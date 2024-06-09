import { IBlogPostSchema, IGetPostResponse } from "@/app/shared/types.ts";
import Post from "@/app/shared/material/Post.tsx";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import PostComments from "@/app/shared/material/postpage/PostComments.tsx";
import { fetchComments } from "@/app/shared/blog-fetch.ts";

type PostPageContentProps = {
  post: IGetPostResponse;
};

export default function PostPageContent({ post }: PostPageContentProps) {
  // todo: Lade die Kommentare für den übergebenen BlogPost mit 'fetchComments'
  //       - übergib das Promise an die (fertige) 'PostComments'-Komponente
  //       - verwende die Suspense-Komponente, um ein Fallback darzustellen,
  //         während die Kommentare geladen werden
  //       - was passiert, wenn du die Suspense-Komponente entfernst?
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
