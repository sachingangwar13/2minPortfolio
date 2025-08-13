import React from "react";
import { Cover } from "../component/ui/Cover";

export function CoverDemo({children}) {
  return (
    <div>
      <h1
        className="bg-clip-text sm:text-5xl lg:text-6xlpx-2 py-2 text-4xl leading-tight font-bold tracking-tight text-transparent ">
        <Cover>{children}</Cover>
      </h1>
    </div>
  );
}
