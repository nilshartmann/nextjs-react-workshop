"use client";

type PostPageErrorProps = {
  error: Error & { digest: string };
};

export default function PostPageError({ error }: PostPageErrorProps) {
  return (
    <div>
      <h1>Something bad happend!</h1>
      <p>{error.toString()}</p>
      <p>Digest: {error.digest}</p>
    </div>
  );
}
