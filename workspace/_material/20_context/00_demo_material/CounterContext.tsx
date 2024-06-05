"use client";
import React, { ReactNode, useContext, useState, createContext } from "react";
import Container from "./Container";

type ICounterContext = {
  value: number;
  increase(): void;
};

const CounterContext = createContext<ICounterContext | null>(null);

type CounterContextProviderProps = { children?: ReactNode };

export default function CounterContextProvider({
  children,
}: CounterContextProviderProps) {
  const [c, setC] = useState(0);

  const increase = React.useCallback(() => setC((c) => c + 1), []);

  return (
    <Container title="CounterContextProvider">
      <CounterContext.Provider
        value={{
          increase,
          value: c,
        }}
      >
        {children}
      </CounterContext.Provider>
    </Container>
  );
}

export function useCounterContext(): ICounterContext {
  const ctx = useContext(CounterContext);
  if (ctx == null) {
    throw new Error(
      "Invalid usage of CounterContext. Please make sure, you have CounterContextProvider enabled.",
    );
  }

  return ctx;
}
