import { ReactNode } from "react";

type ButtonBarProps = {
  children: ReactNode;
};
export default function ButtonBar({ children }: ButtonBarProps) {
  return <div className={"ButtonBar"}>{children}</div>;
}
