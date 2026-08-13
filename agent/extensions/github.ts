import githubExtension from '@github-tools/eve-extension';

export default githubExtension({
  // connector: 'github/github-agent', // or token: process.env.GITHUB_TOKEN
  token: process.env.GITHUB_TOKEN,
  preset: 'code-review',
  requireApproval: {
    addPullRequestComment: ({ toolInput }) => toolInput?.owner !== 'vercel-labs',
  },
});
