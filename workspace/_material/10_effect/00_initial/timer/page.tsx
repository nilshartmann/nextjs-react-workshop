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

function Toast({ msg }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  // todo: Funktion, die ein "Toast" für zwei Sekunden anzeigt...

  return isVisible ? <div className={"Toast"}>{msg}</div> : null;
}
