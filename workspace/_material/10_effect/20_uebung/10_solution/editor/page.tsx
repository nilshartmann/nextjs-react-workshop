"use client";

import { useEffect, useState } from "react";

export default function EditorPage() {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <section>
        <Editor />
        <button onClick={() => setIsVisible(false)}>Close Editor</button>
      </section>
    );
  }

  return (
    <section>
      <button onClick={() => setIsVisible(true)}>Open Editor</button>
    </section>
  );
}

function Editor() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const currentTitle = window.document.title;

    window.document.title = `${value} - Editor`;

    return () => {
      window.document.title = currentTitle;
    };
  }, [value]);

  return (
    <section className={"TimerPage"}>
      <input
        type={"text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>Count! {count}</button>
    </section>
  );
}
