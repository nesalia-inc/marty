# marty-gh

> GitHub-aware assistant agent built on the [`eve`](https://eve.dev) framework.

`marty-gh` is a small, focused agent that operates on GitHub: it reads issues
and pull requests, replies where useful, and (with explicit operator
confirmation) takes structural actions like closing, merging, or deleting. It is
deployed on Vercel and ships with two channels — a development `eve` channel
and a `github` channel that hooks into the GitHub API via
`@github-tools/eve-extension`.

## What it does

- **Reads and summarizes** issues, pull requests, and comments on the
  repositories it is configured to monitor.
- **Responds** in-thread on issues and PRs when its contribution is useful.
- **Acts on structural changes** (close, label, comment, merge, delete) only
  after asking for explicit confirmation — see [`AGENTS.md`](./AGENTS.md).

## Quickstart

### Prerequisites

- Node.js **24.x**
- npm (the lockfile is `package-lock.json`)

### Install and run locally

```bash
npm install
npm run dev
```

The dev server is provided by `eve dev`. See the framework docs under
`node_modules/eve/docs/` once installed, or https://eve.dev/docs.

### Build and run for production

```bash
npm run build
npm run start
```

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
├── package.json
└── tsconfig.json
```

## Available scripts

| Script                 | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server (`eve dev`) |
| `npm run build`        | Build the app (`eve build`)      |
| `npm run start`        | Run the built app (`eve start`)  |
| `npm run typecheck`    | Type-check with `tsc`            |
| `npm run lint`         | Run ESLint                       |
| `npm run lint:fix`     | Auto-fix ESLint issues           |
| `npm run format`       | Format with Prettier             |
| `npm run format:check` | Verify formatting                |
| `npm run check`        | Lint + format check + typecheck  |

## Deployment

`marty-gh` is deployed on Vercel. The framework's default build pipeline is
used — there is no custom `vercel.json`. Vercel reads `package.json` and uses
`npm run build` for the build step.

Environment variables (set in Vercel, never committed):

- `GITHUB_TOKEN` — the token the agent uses to act on GitHub.
- Provider-specific keys for the model configured in `agent/agent.ts`.

Refer to [`SECURITY.md`](./SECURITY.md) for guidance on rotating and protecting
these credentials.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Bug reports, feature requests,
refactors, and chores each have a dedicated issue template under
`.github/ISSUE_TEMPLATE/`.

## Security

See [`SECURITY.md`](./SECURITY.md). Do not open public issues for
vulnerabilities — email **support@nesalia.com**.

## License

[MIT](./LICENSE).
