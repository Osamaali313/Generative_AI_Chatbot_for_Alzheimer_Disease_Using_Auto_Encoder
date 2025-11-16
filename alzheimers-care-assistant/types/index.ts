export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  apiKey: string
  theme: 'light' | 'dark'
  model: string
}

export interface GeminiConfig {
  apiKey: string
  model: string
  temperature?: number
  maxTokens?: number
}
