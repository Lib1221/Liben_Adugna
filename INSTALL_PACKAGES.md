# 📦 Required Package Installation

## Packages to Install

Add these two packages to your project:

```bash
npm install @google/generative-ai react-markdown
```

### What these packages do:

1. **@google/generative-ai** (~0.21.0)
   - Google's official Gemini AI SDK
   - Handles communication with Gemini API
   - Provides chat session management

2. **react-markdown** (~9.0.0)
   - Renders markdown-formatted AI responses
   - Makes responses more readable with formatting
   - Supports code blocks, lists, and emphasis

## Alternative Installation Methods

If `npm` is not working, try:

### Using Yarn:
```bash
yarn add @google/generative-ai react-markdown
```

### Using pnpm:
```bash
pnpm add @google/generative-ai react-markdown
```

## Verification

After installation, check your `package.json` to ensure these appear in dependencies:

```json
"dependencies": {
  "@google/generative-ai": "^0.21.0",
  "react-markdown": "^9.0.1",
  ...other dependencies
}
```

## Next Steps

After installing packages:
1. Set up your Gemini API key in `.env.local`
2. Run `npm run dev` to start the development server
3. Look for the glowing chatbot button in the bottom-right corner!

## Troubleshooting

**If npm command is not found:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart  your terminal after installation
- Verify with: `node --version` and `npm --version`
