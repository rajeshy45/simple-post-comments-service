import Navbar from "@/components/navbar";
import { getCookies } from "next-client-cookies/server";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = getCookies();

  if (!cookies.get("TOKEN")) {
    redirect("/");
  }

  return (
    <div className="p-4 lg:px-12 h-full flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
