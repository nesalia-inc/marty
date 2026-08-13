# Contributing to marty-gh

Thank you for your interest in contributing! This document covers how to set up
your environment, propose changes, and submit pull requests.

## Code of Conduct

Everyone participating in this project is expected to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior to
**support@nesalia.com**.

## Getting help

For general questions and operational support, email **support@nesalia.com**.
Do not use GitHub issues for support requests.

## Reporting bugs and proposing changes

Use the GitHub issue templates under `.github/ISSUE_TEMPLATE/`:

- **Bug report** — something is broken or behaves incorrectly.
- **Feature request** — propose a new capability for the agent.
- **Refactor request** — propose a refactor with explicit scope and risks.
- **Task / chore** — general maintenance, tooling, dependency updates.

Open an issue first for any non-trivial change so we can agree on direction
before you invest time in a pull request.

## Branching strategy

This repository uses a **single-branch** workflow on `main`:

- `main` is the integration branch. Open feature, fix, refactor, and chore pull
  requests directly against `main`.
- Branch names should be prefixed: `feat/`, `fix/`, `refactor/`, `chore/`, or
  `docs/`.

## Local setup

### Prerequisites

- Node.js **24.x** (matches `engines.node` in `package.json`)
- npm (the lockfile is `package-lock.json` — do not switch to pnpm or yarn)

### First run

```bash
npm install
npm run dev
```

Read [`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md) before any
non-trivial contribution. They contain the project's agent-specific
instructions and the conventions for working with the `eve` framework.

### Useful scripts

| Script                 | Purpose                                |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start the local dev server (`eve dev`) |
| `npm run build`        | Production build (`eve build`)         |
| `npm run start`        | Run the built app (`eve start`)        |
| `npm run typecheck`    | TypeScript checking (`tsc`)            |
| `npm run lint`         | Run ESLint                             |
| `npm run lint:fix`     | Auto-fix ESLint issues                 |
| `npm run format`       | Format with Prettier                   |
| `npm run format:check` | Verify formatting without writing      |
| `npm run check`        | Run lint + format check + typecheck    |

## Development workflow

1. Create a branch from `main`.
2. Make your changes. Keep commits focused and write clear messages.
3. Before opening a pull request, run locally:
   ```bash
   npm run lint
   npm run format:check
   npm run typecheck
   npm run build
   ```
   The CI will run the same checks on your pull request.
4. Open a pull request targeting `main`.
5. Address review feedback. Squash or rebase as requested.

## Coding style

- **TypeScript strict, ESM-only.** This project is published as an ES module.
  Use the existing import aliases (`#*` for `agent/*`, `#evals/*` for `evals/*`)
  rather than long relative paths.
- **Formatting.** Prettier owns formatting. Do not hand-format.
- **Linting.** ESLint owns basic code quality. Fix or justify every warning.
- **Commits.** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`,
  `chore:`, `test:`) are encouraged but not enforced.

## Security

Please do **not** open public issues for security vulnerabilities. Follow the
process in [`SECURITY.md`](./SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE).
