"use client";

type ErrorHandlerProps = {
  error: any;
};

export default function ErrorHandler({ error }: ErrorHandlerProps) {
  return <h1>Comments loading failed {error.toString()}</h1>;
}
