"use client";

type PostErrorProps = {
  error: Error & { digest: string };
};

export default function PostError({ error }: PostErrorProps) {
  return (
    <div>
      <h1>Fehler!</h1>
      <p>Error: {error.toString()}</p>
      <p>Digest: {error.digest}</p>
    </div>
  );
}
