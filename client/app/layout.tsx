import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "@/components/fonts";
import { Toaster } from "@/components/ui/toaster";
import { CookiesProvider } from "next-client-cookies/server";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "h-full bg-background font-sans antialiased dark",
          fontSans.variable
        )}
      >
        <main className="h-full">
          <CookiesProvider>{children}</CookiesProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
