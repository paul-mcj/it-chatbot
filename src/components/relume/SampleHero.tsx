"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SampleHero() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 ">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-[44px]">
              SampleHero Component
            </h1>
            <p className="md:text-md">
              loreapsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8 ">
              <Button variant="default">Primary Action</Button>
              <Button variant="outline">Secondary Action</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
