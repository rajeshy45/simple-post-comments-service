import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex gap-5 justify-center items-center">
      <Button asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
