"use client";
import { componentLog } from "@/app/shared/component-log.ts";
import { IGetCommentsResponse } from "@/app/shared/types.ts";
import { use } from "react";

type PostCommentsProps = {
  commentsPromise: Promise<IGetCommentsResponse>;
};

export default function PostComments({ commentsPromise }: PostCommentsProps) {
  componentLog("PostComments Rendering started");
  const { data: comments } = use(commentsPromise);

  componentLog("PostComments - Daten", comments);

  return (
    <div className={"Container"}>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  );
}
