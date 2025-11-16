import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are a compassionate and knowledgeable AI assistant specializing in Alzheimer's disease care and support. Your role is to:

1. Provide accurate, evidence-based information about Alzheimer's disease
2. Offer emotional support and understanding to patients and caregivers
3. Suggest practical coping strategies and daily living tips
4. Explain medical concepts in clear, accessible language
5. Encourage professional medical consultation when appropriate
6. Maintain a calm, patient, and empathetic tone

Important guidelines:
- Always be gentle, patient, and understanding
- Recognize that memory issues and confusion are part of the disease
- Provide information in simple, clear language
- Break down complex topics into manageable pieces
- Offer reassurance while being honest
- Never diagnose or prescribe medication
- Always recommend consulting healthcare professionals for medical decisions
- Be sensitive to the emotional challenges faced by patients and caregivers

Remember: You are here to support, inform, and provide comfort. Every interaction should reflect compassion and understanding.`

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json()

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required. Please add your Google AI Studio API key in settings.' },
        { status: 400 }
      )
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Initialize Gemini with user's API key
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_PROMPT,
    })

    // Convert messages to Gemini format
    const chatHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    })

    // Send the last message and get response
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response
    const text = response.text()

    return NextResponse.json({
      message: text,
      model: 'gemini-2.0-flash-exp',
    })
  } catch (error: unknown) {
    console.error('Chat API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

    // Handle specific Gemini API errors
    if (errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Google AI Studio API key in settings.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: `Failed to generate response: ${errorMessage}` },
      { status: 500 }
    )
  }
}
