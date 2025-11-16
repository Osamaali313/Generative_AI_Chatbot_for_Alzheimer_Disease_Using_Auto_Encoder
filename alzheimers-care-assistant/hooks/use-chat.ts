'use client'

import { useState, useCallback, useEffect } from 'react'
import { Message, ChatSession } from '@/types'

const STORAGE_KEYS = {
  SESSIONS: 'alzheimers-care-sessions',
  CURRENT_SESSION: 'alzheimers-care-current-session',
  API_KEY: 'alzheimers-care-api-key',
}

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState<string>('')

  // Load sessions and API key from localStorage on mount
  useEffect(() => {
    const storedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS)
    const storedCurrentSession = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION)
    const storedApiKey = localStorage.getItem(STORAGE_KEYS.API_KEY)

    if (storedSessions) {
      const parsedSessions = JSON.parse(storedSessions)
      // Convert date strings back to Date objects
      parsedSessions.forEach((session: ChatSession) => {
        session.createdAt = new Date(session.createdAt)
        session.updatedAt = new Date(session.updatedAt)
        session.messages.forEach((msg) => {
          msg.timestamp = new Date(msg.timestamp)
        })
      })
      setSessions(parsedSessions)
    }

    if (storedCurrentSession) {
      setCurrentSessionId(storedCurrentSession)
    }

    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  // Update messages when current session changes
  useEffect(() => {
    if (currentSessionId) {
      const session = sessions.find((s) => s.id === currentSessionId)
      if (session) {
        setMessages(session.messages)
      }
    } else {
      setMessages([])
    }
  }, [currentSessionId, sessions])

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
    }
  }, [sessions])

  // Save current session ID
  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, currentSessionId)
    }
  }, [currentSessionId])

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
    return newSession.id
  }, [])

  const deleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null)
    }
  }, [currentSessionId])

  const updateSessionTitle = useCallback((sessionId: string, title: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, title, updatedAt: new Date() } : s
      )
    )
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !apiKey) return

      let sessionId = currentSessionId
      if (!sessionId) {
        sessionId = createNewSession()
      }

      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      // Add user message
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                messages: [...s.messages, userMessage],
                updatedAt: new Date(),
              }
            : s
        )
      )

      setIsLoading(true)

      try {
        const currentSession = sessions.find((s) => s.id === sessionId)
        const allMessages = [
          ...(currentSession?.messages || []),
          userMessage,
        ]

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: allMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            apiKey,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response')
        }

        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        }

        // Add assistant message
        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [...s.messages, assistantMessage],
                  updatedAt: new Date(),
                  // Auto-generate title from first user message
                  title:
                    s.messages.length === 1
                      ? content.slice(0, 50) + (content.length > 50 ? '...' : '')
                      : s.title,
                }
              : s
          )
        )
      } catch (error) {
        console.error('Failed to send message:', error)

        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          role: 'assistant',
          content: `I apologize, but I encountered an error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }. Please check your API key in settings and try again.`,
          timestamp: new Date(),
        }

        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [...s.messages, errorMessage],
                  updatedAt: new Date(),
                }
              : s
          )
        )
      } finally {
        setIsLoading(false)
      }
    },
    [apiKey, currentSessionId, sessions, createNewSession]
  )

  const saveApiKey = useCallback((key: string) => {
    setApiKey(key)
    localStorage.setItem(STORAGE_KEYS.API_KEY, key)
  }, [])

  const clearAllSessions = useCallback(() => {
    setSessions([])
    setCurrentSessionId(null)
    localStorage.removeItem(STORAGE_KEYS.SESSIONS)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION)
  }, [])

  const exportSession = useCallback((sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return

    const exportData = {
      ...session,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${session.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [sessions])

  return {
    sessions,
    currentSessionId,
    messages,
    isLoading,
    apiKey,
    sendMessage,
    createNewSession,
    deleteSession,
    updateSessionTitle,
    setCurrentSessionId,
    saveApiKey,
    clearAllSessions,
    exportSession,
  }
}
