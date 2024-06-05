import { FallbackProps } from "react-error-boundary";

export default function AppErrorMessage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  console.error("AppErrorMessage - Something bad happend:", error);
  return <h1>Something bad happen !</h1>;
}
