"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function LoginRegisterForm({
  type,
  handleSubmit,
  setUsername,
  setPassword,
}: {
  type: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Card className="lg:w-[450px] w-[350px]">
      <CardHeader>
        <CardTitle>{type === "login" ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          {type === "login" ? "Login" : "Register"} to view or create posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Input username"
                minLength={6}
                required
                onChange={(e) =>
                  setUsername((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Input password"
                minLength={8}
                required
                onChange={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show"
                onCheckedChange={(checked) =>
                  setShowPassword(checked as boolean)
                }
              />
              <label
                htmlFor="show"
                className="text-sm font-medium leading-none"
              >
                Show password
              </label>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={"/auth/" + (type === "login" ? "register" : "login")}>
                  {type === "login" ? "Register" : "Login"}
                </Link>
              </Button>
              <Button type="submit">
                {type === "login" ? "Login" : "Register"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
