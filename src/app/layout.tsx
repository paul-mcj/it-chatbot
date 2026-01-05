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
      <body className="min-bg-background text-foreground antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Navbar />
            <Container>{children}</Container>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
