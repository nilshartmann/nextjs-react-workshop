"use client";
import { useState } from "react";
import Container from "./Container";
import TwoColumns from "./TwoColumns.tsx";

function Main() {
  // was wird neu gerendert wenn sich der lokale Zustand ändert?
  const [appCount, setAppCount] = useState(0);

  return (
    <Container title="Main">
      <div className="Flex">
        local app counter: {appCount}
        <button onClick={() => setAppCount(appCount + 1)}>Increase</button>
      </div>
      <TwoColumns>
        <CounterDisplay />
      </TwoColumns>
    </Container>
  );
}

function CounterDisplay() {
  // Context verwenden
  return (
    <Container title="Counter Display">
      <h1>Counter</h1>
      <NumberDisplay label="Current Counter value" value={7} />
      <button>Increase!</button>
    </Container>
  );
}

type NumberDisplayProps = {
  label: string;
  value: number;
};
function NumberDisplay({ label, value }: NumberDisplayProps) {
  return (
    <Container title="NumberDisplay">
      <p>
        {label}: {value}
      </p>
    </Container>
  );
}

export default function CounterApp() {
  return (
    <Container title="Root">
      <Main />
    </Container>
  );
}
