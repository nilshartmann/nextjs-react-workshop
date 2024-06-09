import { IGetPostsResponse, OrderBy } from "@/app/shared/types.ts";
import PostPreview from "@/app/material/postlistpage/PostPreview.tsx";
import { fetchPosts } from "@/app/shared/blog-fetch.ts";
import { LikeButton } from "@/app/material/postpage/LikeButton.tsx";

type PostListProps = {
  postsPromise: Promise<IGetPostsResponse>;
};

export default async function PostList({ postsPromise }: PostListProps) {
  const response = await postsPromise;
  return (
    <div>
      <div className={"PostList"}>
        {response.data.map((p) => (
          <div key={p.id}>
            <PostPreview post={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
