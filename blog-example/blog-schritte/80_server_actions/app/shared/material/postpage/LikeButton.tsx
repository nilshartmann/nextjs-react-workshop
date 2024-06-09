"use client";

import { IBlogPostSchema } from "@/app/shared/types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { increaseLikes } from "@/app/shared/material/postpage/like-action.ts";

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
    // todo: rufe hier deine 'increaseLikes'-Server-Action-Funktion auf
    //   - das Ergebnis von increaseLikes muss in den State!
    //   - die Funktion muss in einer Transition laufen (https://19.react.dev/reference/react/useTransition)
    //   - optional: kannst du ein optimistisches Ergebnis erzeugen? (https://19.react.dev/reference/react/useOptimistic)
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
