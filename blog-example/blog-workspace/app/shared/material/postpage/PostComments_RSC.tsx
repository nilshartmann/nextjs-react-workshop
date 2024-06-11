import { componentLog } from "@/app/shared/component-log.ts";
import { IGetCommentsResponse } from "@/app/shared/types.ts";

type PostCommentsProps = {
  commentsPromise: Promise<IGetCommentsResponse>;
};

export default async function PostComments({
  commentsPromise,
}: PostCommentsProps) {
  componentLog("PostComments");

  const { data: comments } = await commentsPromise;

  return (
    <div className={"Container"}>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  );
}
