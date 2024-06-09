"use client";

import { FallbackProps } from "react-error-boundary";

export default function CommentsErrorBoundary({ error }: FallbackProps) {
  return (
    <div>
      <h1>Comment loading failed!</h1>
      <p>{error.toString()}</p>
    </div>
  );
}
