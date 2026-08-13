<p align="center">
  <h1 align="center">marty-gh</h1>
</p>

<p align="center">
  <strong>GitHub-aware assistant agent built on the eve framework.</strong> Reads issues and pull requests, replies where useful, and (with explicit operator confirmation) takes structural actions on GitHub. Deployed on Vercel, designed to interoperate with <a href="https://github.com/deessejs/errors">@deessejs/errors</a> for typed failure handling.
</p>

<p align="center">
  <a href="https://github.com/nesalia-inc/marty/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nesalia-inc/marty" alt="License"></a>
  <a href="https://github.com/nesalia-inc/marty/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nesalia-inc/marty/ci.yml?label=CI" alt="CI"></a>
  <a href="https://github.com/nesalia-inc/marty/stargazers"><img src="https://img.shields.io/github/stars/nesalia-inc/marty?style=social" alt="Stars"></a>
</p>

<p align="center">
  <a href="https://eve.dev"><img src="https://img.shields.io/badge/framework-eve.dev-blue" alt="eve framework"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/deploy-vercel-black" alt="Vercel"></a>
</p>

> **Sibling projects:** [@deessejs/errors](https://github.com/deessejs/errors) provides typed error factories that integrate natively with marty-gh's structured error responses. Install it together to get end-to-end typed error pipelines without string-based footguns.

---

## What is included

| Layer                   | What you get                                                                  | Why it matters                                                              |
| ----------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Agent core**          | `defineAgent` wiring in `agent/agent.ts` with a system prompt and a model.    | One place to configure behavior, model, and tool surface.                   |
| **Channels**            | `agent/channels/eve.ts` (local dev) and `agent/channels/github.ts` (GitHub).  | Same agent, two transports — switch between local playground and GitHub.    |
| **Extensions**          | `agent/extensions/github.ts` exposes GitHub tools and permission scopes.      | Tells the agent what GitHub actions it may attempt and which need approval. |
| **System prompt**       | `agent/instructions.md` is the single source of truth for agent behavior.     | Operator-facing, version-controlled, easy to review in PRs.                 |
| **Confirmation gate**   | Structural actions (close, merge, delete) require explicit operator approval. | Reduces blast radius of prompt injection or model mistakes.                 |
| **Vercel deployment**   | Standard Vercel build pipeline, no custom config.                             | Push to `main` deploys; no release engineering needed.                      |
| **CI**                  | GitHub Actions workflow runs lint, format check, typecheck, and build.        | Catches regressions before they reach production.                           |
| **Standard repo files** | `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, templates. | Ready for external contributors from day one.                               |

## Why this project

- **Operator in control.** The agent summarizes, replies, and proposes — it only acts on GitHub after a human confirms.
- **ESM-only, TypeScript-first.** Strict types, modern packaging, no `any` leakage on the agent surface.
- **Small surface.** Two channels, one extension, one prompt. Easy to read, easy to audit.
- **Typed errors end-to-end.** Pairs with [@deessejs/errors](https://github.com/deessejs/errors) for structured error handling in tool calls and replies.
- **Standard GitHub workflows.** Issue templates, security policy, code of conduct, CI — all in place from the first commit.

## Quick start

### Prerequisites

- Node.js **24.x** for running and consumers (the project emits ESM)
- npm 10+ for development (the lockfile is `package-lock.json`)
- TypeScript 7.x is used in the repo (`tsc` is invoked through `npm run typecheck`)

### Install

```bash
npm install
```

[@deessejs/errors](https://github.com/deessejs/errors) is optional — install it only if you want typed error factories to flow through marty-gh's tool calls.

### Usage

```bash
# Local development (eve dev server with hot reload)
npm run dev

# Production build (eve build)
npm run build

# Run the built app
npm run start

# Lint, format check, typecheck (run together)
npm run check
```

The dev server is provided by `eve dev`. Framework documentation lives under
`node_modules/eve/docs/` once `npm install` has run, or at https://eve.dev/docs.

### Engine compatibility

| Runtime    | Minimum version      |
| ---------- | -------------------- |
| Node.js    | 24.0.0               |
| npm        | 10 (for development) |
| TypeScript | 7.x                  |

ESM-only. Consumers using a CJS resolver need to use dynamic `import()` or migrate to ESM.

## Available commands

### Package: `marty-gh` (root)

| Command                | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server (`eve dev`) |
| `npm run build`        | Production build (`eve build`)   |
| `npm run start`        | Run the built app (`eve start`)  |
| `npm run typecheck`    | Type-check with `tsc`            |
| `npm run lint`         | Run ESLint                       |
| `npm run lint:fix`     | Auto-fix ESLint issues           |
| `npm run format`       | Format with Prettier             |
| `npm run format:check` | Verify formatting                |
| `npm run check`        | Lint + format check + typecheck  |

### CI

| Workflow | Trigger             | What it does                                          |
| -------- | ------------------- | ----------------------------------------------------- |
| `ci.yml` | push & PR to `main` | Node 24, npm ci, lint, format check, typecheck, build |

## Compatibility

### Runtime dependencies

| Package                       | Required | Notes                                                                |
| ----------------------------- | -------- | -------------------------------------------------------------------- |
| `eve`                         | Yes      | Agent runtime — channels, extensions, and the dev/build/start tools. |
| `@github-tools/eve-extension` | Yes      | GitHub integration helpers used by the agent.                        |
| `@github-tools/sdk`           | Yes      | Low-level GitHub SDK used by the channel and extension.              |
| `ai`                          | Yes      | Vercel AI SDK — model abstraction.                                   |
| `vercel-minimax-ai-provider`  | Yes      | Model provider wiring.                                               |
| `@vercel/connect`             | Yes      | Vercel platform integration.                                         |
| `vercel`                      | Yes      | Vercel CLI used at build time.                                       |
| `zod`                         | Yes      | Schema validation for tool inputs and structured outputs.            |

### Engines

| Field            | Value      |
| ---------------- | ---------- |
| `engines.node`   | `24.x`     |
| `packageManager` | `npm@10.x` |

## Project structure

```
.
├── agent/                     # The agent
│   ├── agent.ts               # defineAgent + model wiring
│   ├── instructions.md        # System prompt
│   ├── channels/
│   │   ├── eve.ts             # Local dev channel
│   │   └── github.ts          # GitHub API channel
│   └── extensions/
│       └── github.ts          # GitHub tools and permissions
├── evals/                     # Evaluation suites (import alias #evals/*)
├── .github/
│   ├── ISSUE_TEMPLATE/        # Bug, feature, refactor, chore
│   └── workflows/             # CI
├── AGENTS.md                  # Agent-facing conventions
├── CLAUDE.md                  # Claude-facing conventions
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── README.md
├── package.json
└── tsconfig.json
```

## Deployment

`marty-gh` is deployed on Vercel. There is no custom `vercel.json` — the framework's default build pipeline reads `package.json` and uses `npm run build`.

| What           | How                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Push to `main` | Vercel builds and deploys automatically.                                                               |
| Environment    | Configure model provider keys, `GITHUB_TOKEN`, and other secrets in the Vercel project settings.       |
| Logs           | Available in the Vercel dashboard. Never include secrets in logs — see [`SECURITY.md`](./SECURITY.md). |
| Hotfix         | Branch from `main`, push the fix, open a PR. CI must pass before merge.                                |
| Rollback       | Use the Vercel dashboard to promote a previous deployment.                                             |

## Architecture notes

- **ESM-only.** The agent exports ES modules. Anyone consuming the runtime in CJS will need dynamic `import()`.
- **Strict types.** The agent surface is fully typed — model calls, channel messages, extension tools. No `any` leakages.
- **Operator in the loop.** Structural GitHub actions go through a confirmation gate. The agent cannot close, merge, or delete on its own.
- **Prompt injection aware.** All GitHub-controlled inputs (issue/PR/comment text) are treated as untrusted. See [`SECURITY.md`](./SECURITY.md) for the full threat model.
- **CI gates changes.** Every push to `main` runs lint, format check, typecheck, and build. A broken build blocks deployment.
- **Minimal dev tooling.** ESLint + Prettier with sane defaults. No bespoke plugin stack to maintain.
- **Symmetric interop with [@deessejs/errors](https://github.com/deessejs/errors).** When paired, tool-call failures can flow as typed error instances rather than strings.

## Contributing

Open an issue to discuss larger changes. For typos, broken links, and small fixes, PRs are welcome.

Before submitting a PR:

1. Open an issue using one of the templates under `.github/ISSUE_TEMPLATE/` (bug, feature, refactor, chore).
2. Run `npm run check` and `npm run build` locally — CI runs the same.
3. Read [`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md) — they describe the agent's own conventions.
4. Update the relevant docs (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`) when behavior changes.

## Acknowledgements

The README layout and dev-tooling for this project are based on the
[deessejs/errors](https://github.com/deessejs/errors) repository, adapted for
an eve Agent App deployed on Vercel rather than a published npm library. The
framework is [eve](https://eve.dev).

## License

[MIT](./LICENSE). See the LICENSE file for details.

## Support

- Issues: [github.com/nesalia-inc/marty/issues](https://github.com/nesalia-inc/marty/issues)
- Email: [support@nesalia.com](mailto:support@nesalia.com)
- Framework docs: [eve.dev/docs](https://eve.dev/docs)
