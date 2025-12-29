# 🚀 Universal Next.js 16 + Relume Starter

A high-performance, responsive foundation for client projects.

Built with: Next.js 16.1 (Turbopack) • React 19 (Stable) • Relume UI • Tailwind CSS v3 (Stable) • Shadcn/UI

## ⚡ New Project Checklist

Follow these steps every time you start a new client site to ensure 100% setup accuracy.

1.  **Template Initialization**: Click **"Use this template"** on GitHub to create a fresh repository without the commit history.

2.  **Environment Sync**: Run `nvm use` to ensure you are on Node 22+ (LTS).

3.  **Dependency Install**: Run `npm install`.

    1. **Note**: The `.npmrc` is pre-configured with `legacy-peer-deps=true` and `ignore-scripts=true` for safety.

4.  **Local Config**: `cp .env.example .env.local` and fill in client-specific keys.

    1. **Note**: Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000` for local dev.

5.  **Branding**: - Update brand colors in `tailwind.config.ts` and `src/app/globals.css`.

    1. **Note**: Replace `public/favicon.ico` and `public/og-image.png`.

6.  **SEO Setup**: Update the `siteConfig` constants in `src/lib/metadata.ts`.

7.  **Pre-Flight Check**: Run `npm run security-check` to ensure no 2025 supply-chain artifacts exist.

## 🎨 Styling & Theming

This template is optimized for the **Relume "Speed-Run"** workflow:

**Figma**: Map out the site using the Relume Figma Library v3.5+.

**Relume App**: Export the sitemap to the React library.

**Tailwind v3 Stability**: We use Tailwind v3.4 to ensure 100% compatibility with Relume components and the Shadcn/UI engine in Next.js 16.

    Config: `tailwind.config.ts` uses the `relumeTailwindPreset`.

    CSS: Entry point is `src/app/globals.css` using `@tailwind` directives.

**Implementation**:

    Create a file: `src/components/relume/[ComponentName].tsx`.

    Paste the Relume React/Tailwind code.

    Import the component into `src/app/page.tsx`.

    The `relumeTailwindPreset` handles all specialized classes automatically.

**Dark Mode**: Managed via next-themes.

    Toggle: Use the ModeToggle component in the Navbar.

    Variables: Colors are mapped to HSL variables in globals.css. Ensure new components use bg-background and text-foreground.

## 🔍 SEO & Metadata Management

We use a centralized Metadata Factory to avoid duplicating SEO logic across pages.

**To set page-specific SEO**:

`// src/app/about/page.tsx
export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn more about our mission.",
});`

**Dynamic SEO Files (2025 Standard)**

Unlike static files, this template generates SEO assets dynamically:

    robots.ts: Automatically configures crawl rules and links to the sitemap.

    sitemap.ts: Generates a valid XML sitemap using your NEXT_PUBLIC_SITE_URL.

    Verify: Visit /robots.txt or /sitemap.xml in your browser.

## 🛡️ Security & Performance

1. **Hardened Headers**

The `next.config.ts` includes a strict Content Security Policy (CSP).

    **Note**: CSP is automatically disabled in `development` mode to allow Turbopack to inject styles efficiently.

2. Turbopack Fixes

The config includes a `resolveAlias` fix for `fs`, `path`, and `os` to prevent third-party library crashes during local development.

3. Supply Chain Defense

   `npm run security-check`: Scans for known 2025 malware artifacts before builds.

   `ignore-scripts=true`: Prevents malicious packages from running code during install.

## 🛠 Available Commands

`npm run dev` Starts Turbopack development (Instant HMR).
`npm run build` Runs security scan + Production build.
`npm run analyze` Visualizes bundle sizes to find bloated dependencies.
`npm run security-check` Manually scan for 2025 supply-chain malware.
`npm run clean` Resets the project (nukes `.next`, `node_modules`, and locks).
`

## 📂 Directory Structure

`src/app/`: Next.js App Router (Routes & Layouts). Contains all routes, layouts, and global CSS.

`src/components/relume/`: Custom Relume library components. The library for exported Figma/Webflow React components.

`src/components/ui/`: Shadcn/UI primitives. Low-level components (Buttons, Inputs, Dialogs) installed via CLI.

`src/lib/`: Shared logic. Includes `utils.ts` (Tailwind Merge), `metadata.ts` (SEO Factory), and Zod schemas.

`src/hooks/`: Custom React hooks. Reusable logic for dark mode, scroll handling, etc.

## 🚀 Deployment

**Host**: Designed for Vercel (Auto-detects Next.js 16).

**Build Settings**:

    Build Command: `npm run build`

    Install Command: `npm install`

**Environment**: Ensure `NEXT_PUBLIC_SITE_URL` is set to the live domain for correct OG image paths and Sitemap generation in Vercel dashboard (e.g., `https://client-site.com`).

## 🛠️ The "Universal" Git Flow

Once a new client project is made from this cloned repo, you need to ensure that all the yml files in .github folder are correct.

Then make sure to go to the remote repo settings on the browser GUI and do the following:

    1. Settings > General > Pull Requests: check "allow squash merging", "allow auto-merge", and "automatically delete head branches".

    2. Settings > Actions > General: select "read and write permissions" and check "Allow GitHub Actions to create and approve pull requests".

    3. Settings > Rules > Rulesets: New ruleset > New branch ruleset call it "Master Branch Protection". Set enforcement status to "active". Add target branch to "include default branch". Leave defaults checked, but also check "Require status checks to pass" -- you must select at least one check name or you will get an error.

        4. CRITICAL STEP: You must run the workflow once (by pushing the files, or by making a new branch and doing a quick blank PR -- you can simply delete these later) before the check name appears here. Once it has run once, search for "secure-automation" in the "Add checks" box and select it ("secure-automation" is the name of the job in the yml script for automation).

Now that these rules are set, your workflow changes slightly for the better:

    1. Create a branch: git checkout -b feature/new-component

    2. Work and Commit: git commit -m "add relume hero section"

    3. Push Branch: git push origin feature/new-component

    4. Open PR: Go to GitHub, open a Pull Request.

    5. The Test: GitHub Actions will run npm run build.

    6. Merge: Once the "Green Check" appears, merge it into main.

**_Last Updated: December 2025_**
