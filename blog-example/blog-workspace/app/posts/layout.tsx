import { ReactNode } from "react";
import BlogPageLayout from "@/app/material/BlogPageLayout.tsx";

type BlogLayoutProps = {
  children: ReactNode;
};
export default function BlogLayout({ children }: BlogLayoutProps) {
  return <BlogPageLayout>{children}</BlogPageLayout>;
}
