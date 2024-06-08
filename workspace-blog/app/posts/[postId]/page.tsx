import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { Suspense } from "react";
import Post from "@/app/posts/[postId]/Post.tsx";
import PostComments from "@/app/posts/[postId]/PostComments.tsx";
import { fetchComments, fetchPost } from "@/app/blog-fetch.ts";

type PostPageParams = {
  postId: string;
};
type PostPageProps = {
  params: PostPageParams;
};
export default async function PostPage({ params }: PostPageProps) {
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
