export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full">
      <h1 className="scroll-m-20 py-4 text-2xl font-bold">
        Simple Post-Comments Service
      </h1>
      {children}
    </div>
  );
}
