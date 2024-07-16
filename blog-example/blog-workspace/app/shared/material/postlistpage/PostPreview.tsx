import { dateTimeString } from "@/app/shared/components/date-formatter.ts";
import AppLink from "@/app/shared/components/AppLink.tsx";
import { IBlogPostSchema } from "@/app/shared/types.ts";
import { LikeButton } from "@/app/shared/material/postpage/LikeButton.tsx";
import BlogCounter from "@/app/posts/BlogCounter.tsx";

function postAbstract({ body }: IBlogPostSchema) {
  return body.length > 150 ? body.substring(0, 150) + "..." : body;
}

type PostPreviewProps = {
  post: IBlogPostSchema;
};
export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <article className="Container">
      <p className="Date">{dateTimeString(post.date)}</p>
      {/*<BlogCounter />*/}
      <AppLink href={`/posts/${post.id}`} prefetch={false}>
        <h1>{post.title}</h1>
      </AppLink>
      <div className={"PreviewAbstract"}>
        <p>{postAbstract(post)}</p>
      </div>
      <NewestComment post={post} />
      <LikeButton post={post} />
    </article>
  );
}

type NewestCommentProps = {
  post: IBlogPostSchema;
};
function NewestComment({ post }: NewestCommentProps) {
  if (!post.newestComment) {
    return null;
  }

  return (
    <div>
      <p>
        Latest comment:
        <br />
        <em>{post.newestComment.comment}</em>
      </p>
    </div>
  );
}
