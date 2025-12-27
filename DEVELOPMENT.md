# 📖 Developer Cheat Sheet: The Hybrid Workflow

This project is a hybrid of Relume (Layout), Shadcn (Primitives), and Next.js (Framework). Use this guide to decide where to look when building.

## 🛠 1. The Decision Matrix

| If you are looking for...                | Use This | Where is the code?                 |
| ---------------------------------------- | -------- | ---------------------------------- |
| Page Sections (Heros, Features, Footers) | Relume   | `src/components/relume/`           |
| UI Primitives (Buttons, Inputs, Dialogs) | Shadcn   | `src/components/ui/`               |
| Global Styles (Colors, Fonts, Radius)    | Tailwind | `tailwind.config.ts & globals.css` |
| Data & Routing (APIs, Server Actions)    | Next.js  | `src/app/`                         |

## 🚀 2. Building a New Page (The "Speed-Run")

1. Find the Layout: Go to Relume Library and pick your components.

2. Import: Copy the React code into a new file in `src/components/relume/`.

3. Refactor Icons: Relume uses `Bi` (Lucide) or Phosphor icons. Ensure they are imported correctly or swap them for Lucide.

4. Assemble: Drop the components into `src/app/page-name/page.tsx`.

## 🎨 3. Styling & Branding

The "Source of Truth"

    - For Dark Mode support: Edit `src/app/globals.css`. Use HSL values.

    - For Relume-specific colors: Edit `tailwind.config.ts`. Use Hex codes in the `brand` or `neutral` objects.

Pro-Tip: Hex vs. HSL

    - Relume components usually use classes like `bg-brand-black` (linked to Hex in config).

    - Shadcn components usually use classes like `bg-primary` (linked to HSL in globals.css).

    - Hybrid Fix: If a Relume section isn't changing in Dark Mode, swap its class to a Shadcn variable (e.g., change `text-neutral-black` to `text-foreground`).

## 🛡 4. Safety & Deployment

Before you Push

    1. Run Build: Always run `npm run build` locally to catch TypeScript errors.

    2. Check SEO: Ensure your metadata factory is updated in `src/lib/metadata.ts`.

    3. Environment: Ensure `NEXT_PUBLIC_SITE_URL` is set in your Vercel Dashboard.

Deployment Workflow

    - Main Branch: This is your "Golden Template." Do not work here.

    - Feature Branches: Use `git checkout -b feature/name` for all client work.

    - Tags: When a version is stable, use `git tag -a v1.x.x` to bookmark it.

## 📚 5. Documentation Quick-Links

[Relume React Docs](https://react-docs.relume.io/) - Component props and usage.

[Shadcn/UI Docs](https://ui.shadcn.com/docs) - Primitive customization.

[Next.js 16 Docs](https://nextjs.org/docs) - Server components and actions.

[Tailwind CSS Docs](https://tailwindcss.com/docs/installation/using-vite) - Utility class reference.
