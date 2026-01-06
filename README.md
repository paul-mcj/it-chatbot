# ⚡ IT-Chatbot: Infrastructure & Networking Assistant

An AI-powered specialized assistant designed to provide instant, high-quality technical support for IT Infrastructure, Networking, and CI/CD workflows.

## 🚀 The Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router)
- **Backend:** [Cloudflare Pages Functions](https://pages.cloudflare.com/) (Edge Runtime)
- **AI Engine:** [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) running `Llama-3.1-8b-instruct`
- **Deployment:** Global Edge Network (Cloudflare)

## 🛠 Key Features

- **Edge Inference:** AI processing happens at the network edge, minimizing latency for global users.
- **Specialized Knowledge:** Hard-coded system prompts focus on VLAN configurations, CI/CD best practices, and security hardening.
- **Type-Safe API:** Fully implemented in TypeScript with robust error handling for edge environments.

## 📦 Infrastructure & CI/CD

Following best practices for project maintenance:

- **Automated Dependency Management:** Integrated with GitHub Dependabot for monthly grouped updates and immediate security vulnerability patching.
- **Edge Runtime:** Optimized to run without the overhead of traditional Node.js servers, utilizing Cloudflare’s V8 isolate-based architecture.

## 🚦 Getting Started

Since this project uses Cloudflare-specific bindings (AI), the best way to preview is via the Cloudflare Pages deployment. Assuming local deployment (first ensuring docker container is running):

```bash
# Install dependencies
npm install

# Build
npm run build

# Deploy via Cloudflare
npx @cloudflare/next-on-pages@latest

# Test Locally via CloudFlare
npx wrangler pages dev .vercel/output/static --ai AI --compatibility-flag=nodejs_compat --binding NETBOX_TOKEN="[token_here]"
```
