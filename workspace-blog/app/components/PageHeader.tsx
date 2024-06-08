import { ReactNode } from "react";

/**
 * Displays a header for each page, including some buttons (optionally)
 *
 */
type PageHeaderProps = {
  children: ReactNode;
  button?: ReactNode;
};
export default function PageHeader({ children, button }: PageHeaderProps) {
  return (
    <div className={"PageHeader"}>
      <PageTitle>{children}</PageTitle>
      {!!button && <div>{button}</div>}
    </div>
  );
}

type PageTitleProps = {
  children: ReactNode;
};
function PageTitle({ children }: PageTitleProps) {
  return <h1>{children}</h1>;
}
