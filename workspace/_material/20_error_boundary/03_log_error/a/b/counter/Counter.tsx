"use client";

import { useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { logError } from "@/app/error-action.ts";

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
  useEffect(() => {
    try {
      // SERVER CALL!!!!
      // Aufpassen, welche Informationen man hier transportiert!
      // ⚠️ Im "echten Leben" besser keine Fehlermeldung ungeprueft versenden!
      //     - Fehlermeldung könnte sehr lang sein => viele Daten => viel Netzwerk-Traffic
      //     - Fehlermeldung kann sensible Daten enthalten (Passwort, IBAN, Geburtsdatum, ...)
      logError(error.toString());
    } catch (e) {
      console.error(
        "Konnte Fehlermeldung nicht auf dem Server protokollieren!",
      );
    }
  }, []);

  return (
    <section>
      <h1>Failed!</h1>
      <p>{error.toString()}</p>

      <button onClick={() => resetErrorBoundary()}>Try again!</button>
    </section>
  );
}
