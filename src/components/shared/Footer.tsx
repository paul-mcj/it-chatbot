"use client";

import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="font-bold text-xl">
              LOGO
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Built with Next.js, Relume, and Shadcn. High-performance solutions
              for modern digital experiences.
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              {section.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Client Name. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">
              Twitter
            </Link>
            <Link href="#" className="hover:text-primary">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-primary">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
