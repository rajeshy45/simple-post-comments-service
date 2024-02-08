import { getCookies } from "next-client-cookies/server";
import { redirect } from "next/navigation";

export default function Page() {
  const cookies = getCookies();

  if (cookies.get("TOKEN") && cookies.get("USERNAME")) {
    redirect("/home");
  } else {
    redirect("/auth");
  }
}
