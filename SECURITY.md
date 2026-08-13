# Security Policy

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| `0.x`   | :white_check_mark: |

This project is in active pre-release development. Only the latest commit on
`main` receives security fixes. There are no tagged stable releases yet.

## A note about this project

`marty-gh` is a **GitHub-aware agent**. When deployed, it acts on GitHub on
behalf of the operator — opening, closing, commenting on, and (under explicit
operator confirmation) merging or deleting issues and pull requests.

This means a few categories of issues that would be theoretical elsewhere are
**direct attack surface** here:

- **Permissions of the GitHub token used by the agent.** Treat any compromise
  of that token as a critical incident.
- **Prompt injection via GitHub inputs.** Issue titles, bodies, comments, PR
  titles/bodies, and review comments are user-controlled and may reach the
  agent's model. Anything that lets untrusted input override system instructions
  or exfiltrate repository data is in scope.
- **Secrets in logs and traces.** The agent may read and write logs. Any path
  through which secrets (GitHub tokens, Vercel tokens, API keys) could end up in
  those logs is in scope.
- **Dependency compromise.** Vulnerabilities in `eve`, `@github-tools/*`,
  `ai`, `vercel-minimax-ai-provider`, or other runtime dependencies used by the
  agent are in scope.

## Reporting a vulnerability

If you discover a security vulnerability, please report it privately:

1. **Do not** open a public GitHub issue.
2. Email **support@nesalia.com** with:
   - A description of the vulnerability
   - Steps to reproduce, or a proof of concept
   - Potential impact (especially with respect to the GitHub token or prompt
     injection)
   - Any suggested fixes (optional)

You should receive an acknowledgement within **72 hours**. After triage we will
coordinate disclosure timing with you.

## Scope

### In scope

- Code under `agent/`, `evals/`, and CI configuration under `.github/`.
- Runtime dependencies used by the agent to act on GitHub: `eve`,
  `@github-tools/eve-extension`, `@github-tools/sdk`,
  `vercel-minimax-ai-provider`, `ai`, `@vercel/connect`.
- Prompt-injection vectors that allow GitHub-input content (issue/PR/comment
  text) to alter the agent's behavior beyond what the operator intended.

### Out of scope

- Lack of rate-limiting or abuse-handling on GitHub's side — report to GitHub.
- Generic denial-of-service vulnerabilities.
- Vulnerabilities in upstream Vercel, Node.js, or other infrastructure
  providers — report to those vendors.
- Theoretical issues without a concrete reproduction path.
- Issues that require the operator's GitHub token to already be compromised in
  order to exploit (report the token compromise to GitHub).

## Disclosure policy

We follow coordinated disclosure. We will:

- Acknowledge your report within 72 hours.
- Provide an assessment and severity within one week where feasible.
- Develop and ship a fix before publishing details, unless you prefer a different
  timeline.
- Credit you in the release notes unless you ask to remain anonymous.

Security fixes are released as patch commits on `main` and announced in the
release notes.
