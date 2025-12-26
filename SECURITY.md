# Security Policy

## 🔒 Universal Template Protections

This project is built with a "Security-First" architecture to protect against modern supply-chain threats, including the **Sha1-Hulud 2.0** (Nov 2025) variants.

### 1. Supply Chain Defense

- **Script Blocking**: The `.npmrc` is configured with `ignore-scripts=true` to prevent unauthorized execution of malware during dependency installation.
- **Audit Gate**: A `security-check` script runs automatically `prebuild` to scan for known malware signatures (`setup_bun.js`, `bun_environment.js`).
- **Lockfile Integrity**: We use strict lockfiles to ensure that only vetted versions of packages are deployed.

### 2. Data Protection

- **React Server Components (RSC)**: Leveraging React 19's `experimental_taintObjectReference` to prevent accidental leakage of server-side secrets (API keys, DB strings) to the client browser.
- **CSP Headers**: Default Content Security Policy headers are configured in `next.config.ts` to mitigate XSS and data exfiltration.
