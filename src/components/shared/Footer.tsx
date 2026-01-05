"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background">
      <div className="container py-12 md:py-16">
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Paul McJannet. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link
              href="https://www.linkedin.com/in/paul-mcjannet/"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/paul-mcj/"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
