"use client";

import AppLink from "@/app/shared/components/AppLink.tsx";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav>
      <p>
        <AppLink href={"/"}>Home</AppLink>
      </p>
      {pathname === "/posts" ? (
        <p>
          <AppLink className={"Button"} href={"/posts"}>
            Posts
          </AppLink>
        </p>
      ) : (
        <p>
          <AppLink href={"/posts"}>Posts</AppLink>
        </p>
      )}
      <p>
        <AppLink href={"/posts/P1"}>Post Id 1</AppLink>
      </p>
    </nav>
  );
}
