import { githubChannel } from "eve/channels/github";

export default githubChannel({
  botName: "martyy-code",
  credentials: {
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
  },
});