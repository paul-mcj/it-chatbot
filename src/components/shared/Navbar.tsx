"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "GitHub Repo", href: "https://github.com/paul-mcj/it-chatbot" },
  {
    name: "View Netbox",
    href: "http://localhost:8000/ipam/prefixes/1/ip-addresses/",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl transition-colors dark:hover:text-gray-300 hover:text-gray-600"
        >
          Home
        </Link>
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={
                link.name === "GitHub Repo" || link.name === "View Netbox"
                  ? "_blank"
                  : ""
              }
              rel="noopener noreferrer"
              className="transition-colors dark:hover:text-gray-300 hover:text-gray-600"
            >
              {link.name}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        {/* MOBILE NAV */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left mb-4">Navigation</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={
                      link.name === "GitHub Repo" || link.name === "View Netbox"
                        ? "_blank"
                        : ""
                    }
                    rel="noopener noreferrer"
                    className="text-lg font-semibold"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
