"use client";

import { useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function Counter() {
  // todo:
  //
  //  - was passiert, wenn der Counter in CounterInternal über 3 geht?
  //
  //  - Füge eine ErrorBoundary-Komponente ein
  //    - diese soll sicherstellen, dass das globale Layout erhalten bleibt
  //    - es soll also nur "CounterInteral" durch die ErrorBoundary-Komponente ausgetauscht werden
  //    - In der ErrorBoundary-Komponente sollte es einen "Retry"-Knopf geben, der den Fehler
  //      zurücksetzt
  //    - Die FallbackComponent für den ErrorBoundary ist unten schon angefangen, aber du musst die
  //      Komponente noch vervollständigen
  return <CounterInternal />;
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

function CounterErrorHandler({}: FallbackProps) {
  // TODO:
  //   - Zeige den error an
  //   - Füge einen Retry-Button hinzu, der den Fehler zurücksetzt
  //     - Wenn auf den Button geklickt wird, müsste der Counter wieder sichtbar werden
  return (
    <section>
      <h1>Failed!</h1>
    </section>
  );
}
