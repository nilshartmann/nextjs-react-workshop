"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => setTime((t) => t + 1), 1);
  }, []);

  return <div>Zeit: {time}</div>;
}
