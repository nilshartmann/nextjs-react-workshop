import { marked } from "marked"; // 36 K (gzipped: 11 K)

import { IBlogPostSchema, INewBlogPost } from "@/app/shared/types.ts";
import { dateTimeString } from "@/app/components/date-formatter.ts";
import { LikeButton } from "@/app/material/postpage/LikeButton.tsx";

// type IBlogPost = {
//   id: string;
//   date?: string;
//   title: string;
//   body: string;
//   likes: number;
// };

type PostProps = {
  post: IBlogPostSchema | INewBlogPost;
};
export default function Post({ post }: PostProps) {
  const date = "date" in post ? dateTimeString(post.date) : null;
  const body = marked.parse(post.body);

  return (
    <article className="Container">
      {date ?? <p className="Date">{date}</p>}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      {"id" in post && <LikeButton post={post} />}
    </article>
  );
}
