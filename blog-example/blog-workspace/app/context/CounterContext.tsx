"use client";
import React, { ReactNode, useContext, useState, createContext } from "react";
import Container from "./Container";
import BlogPageLayout from "@/app/shared/material/BlogPageLayout.tsx";

type ICounterContext = {
  value: number;
  increase(): void;
};

const CounterContext = createContext<ICounterContext | null>(null);

type CounterContextProviderProps = {
  children?: ReactNode;
  initialValue: number;
};

export default function CounterContextProvider({
  children,
  initialValue,
}: CounterContextProviderProps) {
  const [counter, setCounter] = useState(initialValue);

  const increase = () => setCounter(counter + 1);

  return (
    <Container title="CounterContextProvider">
      <CounterContext.Provider
        value={{
          increase,
          value: counter,
        }}
      >
        {children}
      </CounterContext.Provider>
    </Container>
  );
}

export function useCounterContext() {
  const ctx = useContext(CounterContext);

  if (ctx == null) {
    throw new Error(
      "Invalid usage of CounterContext. Please make sure, you have CounterContextProvider enabled.",
    );
  }

  return ctx;
}
