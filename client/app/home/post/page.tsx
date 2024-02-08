"use client";

import Loading from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Post } from "@/lib/definitions";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null) as [unknown, unknown] as [Post, any];
  const searchParams = useSearchParams();
  const router = useRouter();
  const cookies = useCookies();

  useEffect(() => {
    if (!searchParams.get("id")) {
      router.push("/home");
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${searchParams.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("TOKEN") as string,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast({
            title: "Something went wrong!",
            description: data.error,
          });
        } else {
          setData(data);
        }
      });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold">{data.title}</h1>
      <div className="my-2 flex gap-4">
        <p>Posted by: {data.user?.username}</p>
        <p>Posted on: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>Last updated on: {new Date(data.updatedAt).toLocaleDateString()}</p>
      </div>
      <Separator className="my-4" />
      <img
        className="mx-auto"
        alt="post image"
        src={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${data.image}`}
        style={{minWidth: '50%', maxWidth: '100%'}}
      />
    </div>
  );
}
