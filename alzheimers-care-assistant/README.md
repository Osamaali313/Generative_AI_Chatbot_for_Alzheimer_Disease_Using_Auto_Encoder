# Alzheimer's Care Assistant 🧠💙

A beautiful, compassionate AI-powered web application designed to provide support, information, and guidance for Alzheimer's disease patients and caregivers. Built with Next.js 14, powered by Google's Gemini 2.0 Flash AI model.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Gemini AI](https://img.shields.io/badge/Gemini-2.0%20Flash-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## Features ✨

### 🤖 AI-Powered Chat Interface
- **Gemini 2.0 Flash Integration**: Advanced conversational AI specifically trained for Alzheimer's care support
- **Compassionate Responses**: Empathetic, patient-centered communication tailored to unique challenges
- **Context-Aware**: Maintains conversation history for coherent, meaningful interactions

### 💬 Chat Management
- **Multiple Chat Sessions**: Create and manage multiple conversation threads
- **Persistent History**: All conversations saved locally in browser storage
- **Export Capability**: Download chat sessions as JSON files for record-keeping
- **Auto-Generated Titles**: Smart conversation naming based on content

### 🎨 Beautiful UI/UX
- **3D Medical Environment**: Calming Three.js animated background with floating particles
- **Medical-Themed Design**: Professional color palette designed for healthcare context
- **Framer Motion Animations**: Smooth, engaging transitions throughout the app
- **Dark/Light Mode Support**: Automatic theme switching based on system preferences
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### 🔒 Privacy & Security
- **Client-Side API Key**: Users provide their own Google AI Studio API key
- **Local Storage**: All data stored locally - nothing sent to external servers
- **No Data Collection**: Complete privacy - we never access or store your conversations

## Getting Started 🚀

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Google AI Studio API Key** (free tier available)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd alzheimers-care-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting Your Google AI Studio API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. In the app, click the Settings icon and paste your API key
6. Click "Save" - your key is stored securely in your browser's local storage

## Tech Stack 🛠️

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js & React Three Fiber** - 3D graphics
- **Lucide Icons** - Beautiful icon library

### AI & Backend
- **Google Gemini 2.0 Flash** - Advanced AI model via Google AI Studio
- **Next.js API Routes** - Serverless API endpoints
- **Edge Runtime** - Fast, globally distributed API responses

## Usage Guide 📖

### Starting a New Conversation

1. Click "Start Chatting" on the landing page or navigate to `/chat`
2. If this is your first time, add your API key in Settings
3. Type your message in the text area
4. Press Enter or click the Send button
5. The AI assistant will respond with compassionate, informed answers

### Managing Chat History

- **View History**: Click the History icon (📋) to see all your conversations
- **Switch Sessions**: Click on any session in the history panel to view it
- **New Chat**: Click the Plus (+) icon to start a fresh conversation
- **Export Chat**: Click the Download icon on any session to save it as JSON
- **Delete Chat**: Click the Trash icon to remove a session

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message

## Building for Production 🏗️

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel** (recommended)

   The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

   **Important**: If your Next.js app is in a subdirectory (like `alzheimers-care-assistant/`), you need to:

   - In Vercel project settings, set **Root Directory** to `alzheimers-care-assistant`
   - Or use the `vercel.json` configuration file in the repository root

   Then deploy:
   ```bash
   npm install -g vercel
   vercel
   ```

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/alzheimers-care-assistant)

## Customization ⚙️

### Updating the System Prompt

Edit `/app/api/chat/route.ts` to customize the AI assistant's behavior:

```typescript
const SYSTEM_PROMPT = `Your custom instructions here...`
```

### Changing Theme Colors

Modify `/app/globals.css` to adjust the color scheme:

```css
:root {
  --medical-blue: #4a90e2;
  --calm-gradient-start: #667eea;
  --calm-gradient-end: #764ba2;
}
```

## Disclaimer ⚠️

This AI assistant provides information and support but **does not replace professional medical advice, diagnosis, or treatment**. Always consult qualified healthcare professionals for medical decisions and Alzheimer's care planning.

## License 📄

This project is licensed under the MIT License.

---

**Built with ❤️ for Alzheimer's patients and caregivers**
