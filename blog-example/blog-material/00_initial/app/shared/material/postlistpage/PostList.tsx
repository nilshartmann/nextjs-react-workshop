import {
  IBlogPostSchema,
  IGetPostsResponse,
  OrderBy,
} from "@/app/shared/types.ts";
import PostPreview from "@/app/shared/material/postlistpage/PostPreview.tsx";
import { fetchPosts } from "@/app/shared/blog-fetch.ts";
import { LikeButton } from "@/app/shared/material/postpage/LikeButton.tsx";

// todo: PostListProps setzen und Komponente zu ende implementieren

// todo #1: Properties
// Je nachdem, wie du dich entscheidest - ob du hier auf das Promise wartest - oder bereits in der page.tsx -
// musst du hier Properties anpassen:

// Wenn du hier wartest:
// type PostListProps = {
//   postsPromise: Promise<IGetPostsResponse>;
// };

// Wenn du die Liste fertig übergibst:
// type PostListProps = {
//   posts: IGetPostsResponse;
// };

type PostListProps = {
  // todo #1: s.o.
};

export default async function PostList({} /* todo #2: hier 'postPromise' oder 'posts' einfügen */ : PostListProps) {
  // todo #3:data aus postsPromise bzw. posts auslesen
  const data: IBlogPostSchema[] = [];
  return (
    <div>
      <div className={"PostList"}>
        {data.map((p) => (
          <div key={p.id}>
            <PostPreview post={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
