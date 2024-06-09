"use client";

import { IBlogPostSchema } from "@/app/shared/types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { increaseLikes } from "@/app/shared/material/postpage/like-action.ts";

type LikeButtonProps = {
  post: IBlogPostSchema;
};

export function LikeButton({ post }: LikeButtonProps) {
  const [likes, setLikes] = useState(post.likes);

  // todo: Ersetze 'isPending' mit 'isPending' von 'useTransition'
  const isPending = false;

  const handleLikeClick = () => {
    // todo: rufe hier deine 'increaseLikes'-Server-Action-Funktion auf
    //   - das Ergebnis von increaseLikes muss in den State!
    //   - die Funktion muss in einer Transition laufen (https://19.react.dev/reference/react/useTransition)
    //   - optional: kannst du ein optimistisches Ergebnis erzeugen? (https://19.react.dev/reference/react/useOptimistic)
  };

  return (
    <button disabled={isPending} onClick={handleLikeClick}>
      {likes} Likes
    </button>
  );
}
