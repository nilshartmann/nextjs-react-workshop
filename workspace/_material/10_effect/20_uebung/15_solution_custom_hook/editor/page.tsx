"use client";

import { useEffect, useState } from "react";

export default function EditorPage() {
  const [isVisible, setIsVisible] = useState(false);

  useWindowTitle("EditorPage");

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

function useWindowTitle(title: string) {
  useEffect(() => {
    const currentTitle = window.document.title;

    window.document.title = title;

    return () => {
      window.document.title = currentTitle;
    };
  }, [title]);
}

function Editor() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  useWindowTitle(`${value} - Editor`);

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
