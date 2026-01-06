import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/Navbar";
import { constructMetadata } from "@/lib/metadata";
import { Container } from "@/components/shared/Container";
import { SmoothScroll } from "@/components/smooth-scroll";

export const runtime = "edge";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <SmoothScroll>
            <Container>{children}</Container>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
