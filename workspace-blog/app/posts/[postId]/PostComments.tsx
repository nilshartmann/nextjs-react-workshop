import { componentLog } from "@/app/component-log.ts";
import { IGetCommentsResponse } from "@/app/types.ts";

type PostCommentsProps = {
  commentsResponse: Promise<IGetCommentsResponse>;
};

export default async function PostComments({
  commentsResponse,
}: PostCommentsProps) {
  componentLog("PostComments");
  const { data: comments, meta } = await commentsResponse;
  return (
    <div className={"Container"}>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  );
}
