"use client";

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Post } from "@/lib/definitions";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const cookies = useCookies();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("TOKEN") as string,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast({
            title: "Something went wrong!",
            description: "Please refresh the page to try again.",
          });
        } else {
          setData(data);
        }
      });
  }, []);

  return (
    <div className="p-4 flex flex-col grow">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Welcome, {cookies.get("USERNAME")}!
        </h1>
        <Button>New Post</Button>
      </div>
      {!data ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:py-4">
          {data.map((post: Post) => {
            return (
              <Link href={`/home/post?id=${post.id}`}>
                <Card className="m-4 lg:mx-8">
                  <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {post.image && (
                      <Image
                        className="mx-auto w-full"
                        alt="post image"
                        src={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${post.image}`}
                        width={250}
                        height={250}
                      />
                    )}
                  </CardContent>
                  <CardFooter>{post.description}</CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
