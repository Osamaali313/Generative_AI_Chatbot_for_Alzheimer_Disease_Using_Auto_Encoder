'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, User, Bot, Settings, History, Plus, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useChat } from '@/hooks/use-chat'
import { format } from 'date-fns'

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [tempApiKey, setTempApiKey] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    isLoading,
    sendMessage,
    apiKey,
    saveApiKey,
    sessions,
    currentSessionId,
    createNewSession,
    deleteSession,
    setCurrentSessionId,
    exportSession,
  } = useChat()

  useEffect(() => {
    setTempApiKey(apiKey)
  }, [apiKey])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    await sendMessage(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSaveApiKey = () => {
    saveApiKey(tempApiKey)
    setShowSettings(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Chat History */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 border-r border-border bg-card p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Chat History</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={createNewSession}
                title="New Chat"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setCurrentSessionId(session.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {session.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(session.updatedAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            exportSession(session.id)
                          }}
                          title="Export"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSession(session.id)
                          }}
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--calm-gradient-start)] to-[var(--calm-gradient-end)] bg-clip-text text-transparent">
                  Alzheimer's Care Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  Your compassionate AI companion
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-border bg-muted/50 overflow-hidden"
            >
              <div className="max-w-4xl mx-auto p-4 space-y-3">
                <h3 className="font-semibold">Settings</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Google AI Studio API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder="Enter your Gemini API key"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button onClick={handleSaveApiKey}>Save</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{' '}
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Bot className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to Alzheimer's Care Assistant
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  I'm here to provide information, support, and guidance about
                  Alzheimer's disease. How can I help you today?
                </p>
                {!apiKey && (
                  <Card className="max-w-md mx-auto bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <p className="text-sm text-foreground/80 mb-3">
                        To get started, please add your Google AI Studio API key
                        in the settings.
                      </p>
                      <Button
                        variant="medical"
                        onClick={() => setShowSettings(true)}
                        className="w-full"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure API Key
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--calm-gradient-start)] to-[var(--calm-gradient-end)] flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}

                    <Card
                      className={`max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card'
                      }`}
                    >
                      <CardContent className="p-4">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className="text-xs mt-2 opacity-70">
                          {format(new Date(message.timestamp), 'HH:mm')}
                        </p>
                      </CardContent>
                    </Card>

                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--calm-gradient-start)] to-[var(--calm-gradient-end)] flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <Card className="bg-card">
                      <CardContent className="p-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  apiKey
                    ? 'Type your message... (Press Enter to send, Shift+Enter for new line)'
                    : 'Please add your API key in settings to start chatting'
                }
                disabled={!apiKey || isLoading}
                className="min-h-[60px] max-h-[200px] resize-none"
              />
              <Button
                type="submit"
                variant="medical"
                size="icon"
                disabled={!input.trim() || !apiKey || isLoading}
                className="h-[60px] w-[60px]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
