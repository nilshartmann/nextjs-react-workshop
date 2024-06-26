import type { Metadata } from "next";
import "./index.css";
import CounterContextProvider from "@/app/CounterContext.tsx";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CounterContextProvider>{children}</CounterContextProvider>
        <footer>
          <p>
            <Link href={"/"} prefetch={false}>
              Home
            </Link>
          </p>
          <p>
            <Link href={"/user"} prefetch={false}>
              User
            </Link>
          </p>
          <p>
            <Link href={"/greeting"} prefetch={false}>
              Greeting
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
