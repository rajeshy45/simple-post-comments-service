"use client";

import * as React from "react";

import LoginRegisterForm from "@/components/login-register-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function Page() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();
  const cookies = useCookies();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast({
      title: "Logging in...",
    });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
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
            title: "Login successful!",
          });

          router.push(`/home?user=${data.username}`);
        }
      });
  }

  return (
    <LoginRegisterForm
      type="login"
      setUsername={setUsername}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
