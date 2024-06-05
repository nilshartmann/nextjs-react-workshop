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

  // todo: Wenn der Editor angezeigt ist, soll der 'value' im TabTitel gefolgt von " - Editor" angezeigt werden
  //    - also zum Beispiel "hallo - Editor"
  //
  // - Wenn der Editor wieder geschlossen wird, soll der Tabtitel wieder auf seinen ursprünglichen Wert gesetzt werden
  // - Der Tabtitel soll nur gesetzt werden, wenn sich der value verändert hat, aber nihct, wenn sich der count geändert hat
  //   - Baue in dein Effect-Callback eine console.log-Ausgabe, um das zu überprüfen
  //
  // Hinweise:
  //   - Den aktuellen Tabtitel kannst Du mit window.document.title abfragen
  //   - Setzen kannst Du den Tabtitel mit window.document.title = "..."
  //
  // Optional:
  //   - Kannst du für die Funktionalität einen Custom-Hook bauen?
  //     - Der Hook soll den neuen Fenstertitel entgegen nehmen
  //     - Auch hier soll die Effect-Callback-Funktion nur ausgeführt werden, wenn sich der Fenstertitel
  //       verändert hat
  //     - Damit könntest du dann auch den Fenstertitel in 'EditorPage' oben setzen

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
