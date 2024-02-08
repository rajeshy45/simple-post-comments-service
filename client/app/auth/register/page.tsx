"use client";

import * as React from "react";

import LoginRegisterForm from "@/components/login-register-form";
import { toast } from "@/components/ui/use-toast";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const cookies = useCookies();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast({
      title: "Creating an account...",
    });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: data.error,
          });
        } else {
          cookies.set("TOKEN", data.token);
          cookies.set("USERNAME", data.username);

          toast({
            title: "Registration successful!",
          });

          router.push("/home");
        }
      });
  }

  return (
    <LoginRegisterForm
      type="register"
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
