import HelloMessage from "@/app/HelloMessage.tsx";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Hallo Next.js</h1>

      <Link href={"/posts"} prefetch={false}>
        Open Blog Posts
      </Link>
    </div>
  );
}
