import { dateTimeString } from "@/app/components/date-formatter";
import AppLink from "@/app/components/AppLink";
import { IBlogPostSchema } from "@/app/types.ts";

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
      <AppLink href={`/posts/${post.id}`} prefetch={false}>
        <h1>{post.title}</h1>
      </AppLink>
      <div className={"PreviewAbstract"}>
        <p>{postAbstract(post)}</p>
      </div>
      <NewestComment post={post} />
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
