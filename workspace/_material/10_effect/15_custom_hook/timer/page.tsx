"use client";

import { useEffect, useState } from "react";

export default function TimerPage() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  return (
    <section className={"TimerPage"}>
      <input
        type={"text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>Count! {count}</button>
      {value.length > 3 && <Toast msg={"Text too long: " + value} />}
    </section>
  );
}
type ToastProps = {
  msg: string;
};

function useToastMessage(msg: string) {
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log("Clearing toast...", msg);
      setIsRunning(false);
    }, 2000);
    return () => clearTimeout(timerId);
  }, [msg]);

  return isRunning ? msg : null;
}

function Toast({ msg }: ToastProps) {
  const toastMessage = useToastMessage(msg);

  return toastMessage ? <div className={"Toast"}>{msg}</div> : null;
}
