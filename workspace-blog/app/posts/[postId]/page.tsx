import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { Suspense } from "react";
import Post from "@/app/material/Post.tsx";
import PostComments from "@/app/material/postpage/PostComments.tsx";
import { fetchComments, fetchPost } from "@/app/shared/blog-fetch.ts";

type PostPageParams = {
  postId: string;
};
type PostPageProps = {
  params: PostPageParams;
};
export default async function PostPage({ params }: PostPageProps) {
  // todo: mit fetchPost das Post laden
  // todo #2: mit fetchComments die Kommentare laden

  const postPromise = fetchPost(params.postId);
  const comments = fetchComments(params.postId);

  const post = await postPromise;

  return (
    <>
      <Post post={post.data} />

      <Suspense
        fallback={<LoadingIndicator>Loading Comments...</LoadingIndicator>}
      >
        <PostComments commentsResponse={comments} />
      </Suspense>
    </>
  );
}

//
// {/**/}
