"use client";

import { useCookies } from "next-client-cookies";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

export default function Navbar() {
  const cookies = useCookies();
  const router = useRouter();

  function handleLogout() {
    toast({
      title: "Logging out...",
    });

    cookies.remove("TOKEN");
    cookies.remove("USERNAME");

    router.push("/");
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="scroll-m-20 py-4 text-xl font-semibold">
        Simple Post-Comments Service
      </h1>
      <div className="flex gap-4 items-center">
        <p>{cookies.get("USERNAME")}</p>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
