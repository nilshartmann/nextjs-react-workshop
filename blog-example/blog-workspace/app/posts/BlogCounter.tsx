"use client";

import { useCounterContext } from "@/app/context/CounterContext.tsx";

export default function BlogCounter() {
  const counterContext = useCounterContext();

  return <p>Counter: {counterContext.value}</p>;
}
