import { ReactNode } from "react";
import Container from "./Container";
export default function TwoColumns({ children }: { children?: ReactNode }) {
  return (
    <Container title="TwoColumns">
      <div className="SameSizeFlex">{children}</div>
    </Container>
  );
}
