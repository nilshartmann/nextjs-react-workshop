"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  if (count > 3) {
    throw new Error("Count too high");
  }

  return (
    <main>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </main>
  );
}
