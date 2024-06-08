import { OrderBy } from "@/app/types";
import PostPreview from "@/app/posts/PostPreview";
import { fetchPosts } from "@/app/blog-fetch";

type PostListProps = {
  orderBy?: OrderBy;
};

export default async function PostList({ orderBy }: PostListProps) {
  const response = await fetchPosts(orderBy);

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
