# AI Assistant Setup Guide

## 🚀 Quick Setup

### 1. Install Dependencies

Run the following command in your project directory:

```bash
npm install @google/generative-ai react-markdown
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your API key

### 3. Configure Environment Variable

1. Create a file named `.env.local` in your project root (same directory as `package.json`)
2. Add your API key to the file:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with the API key you copied.

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Test the AI Assistant

1. Look for the **glowing yellow button** in the bottom-right corner
2. Click it to open the chatbot
3. Try asking:
   - "What projects has Liben built?"
   - "What technologies does Liben know?"
   - "Tell me about the Smart Gebere project"

## ✅ Features

- **Portfolio-Specific Answers**: Only responds to questions about your work
- **Modern UI**: Glassmorphic design with smooth animations
- **Suggested Questions**: Helpful prompts to get started
- **Conversation History**: Maintains context throughout the chat
- **Responsive Design**: Works beautifully on mobile and desktop

## 🔒 Security Note

The `.env.local` file is already in `.gitignore`, so your API key won't be committed to Git.

## 🐛 Troubleshooting

**"API key not found" error:**
- Make sure `.env.local` is in the project root
- Restart the dev server after creating the file
- Check the variable name is exactly `VITE_GEMINI_API_KEY`

**Chatbot button not appearing:**
- Clear browser cache and refresh
- Check browser console for errors

**No response from AI:**
- Verify your API key is valid
- Check your internet connection
- Ensure you haven't exceeded the free tier quota

## 📝 Customization

You can customize the chatbot in `src/components/AIChatbot.tsx`:
- Change colors (yellow-400, gray-900, etc.)
- Adjust positioning (bottom-6, right-6)
- Modify suggested questions
- Update welcome message
