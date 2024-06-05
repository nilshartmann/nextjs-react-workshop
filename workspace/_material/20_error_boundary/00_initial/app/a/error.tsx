"use client";
type ErrorProps = {
  error?: Error;
  reset: () => void;
};
export default function BError({ error, reset }: ErrorProps) {
  return (
    <main>
      <h1>Error Handler in /app/a/b!</h1>
      <p>{error?.toString()}</p>
      <button onClick={() => reset()}>Reset</button>
    </main>
  );
}
