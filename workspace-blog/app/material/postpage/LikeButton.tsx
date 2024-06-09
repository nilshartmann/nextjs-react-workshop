"use client";

import { IBlogPostSchema } from "@/app/shared/types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { increaseLikes } from "@/app/material/postpage/like-action.ts";

type LikeButtonProps = {
  post: IBlogPostSchema;
};

export function LikeButton({ post }: LikeButtonProps) {
  const [likes, setLikes] = useState(post.likes);
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, increaseLikesOptimistic] = useOptimistic(likes);

  // const handleLikeClick = () => {
  //   setLikes(likes + 1);
  // };

  const handleLikeClick = () => {
    startTransition(async () => {
      increaseLikesOptimistic(likes + 1);
      const newLikes = await increaseLikes(post.id);
      setLikes(newLikes);
    });
  };

  return (
    <button disabled={isPending} onClick={handleLikeClick}>
      {likes} Likes ({optimisticLikes})
    </button>
  );
}
