"use client";

import { useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function Counter() {
  return (
    <ErrorBoundary FallbackComponent={CounterErrorHandler}>
      <CounterInternal />
    </ErrorBoundary>
  );
}

function CounterInternal() {
  const [count, setCount] = useState(0);

  if (count > 3) {
    throw new Error("Count too high");
  }

  return (
    <section>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </section>
  );
}

function CounterErrorHandler({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section>
      <h1>Failed!</h1>
      <p>{error.toString()}</p>

      <button onClick={() => resetErrorBoundary()}>Try again!</button>
    </section>
  );
}
