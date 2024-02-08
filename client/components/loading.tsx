import * as React from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="h-full flex flex-1 justify-center items-center gap-3">
      <LoadingSpinner />
      {text ? text : "Loading..."}
    </div>
  );
}
