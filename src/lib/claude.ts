import Anthropic from '@anthropic-ai/sdk'

// Creating client to communicate with Claude API
export const claude = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  // Better to proxy through a serverless function in production.
  dangerouslyAllowBrowser: true
})