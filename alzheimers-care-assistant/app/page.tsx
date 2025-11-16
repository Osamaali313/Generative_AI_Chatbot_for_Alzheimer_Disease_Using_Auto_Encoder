'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Heart, MessageCircle, Shield, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'

const MedicalEnvironment = dynamic(
  () => import('@/components/three/medical-environment'),
  { ssr: false }
)

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MedicalEnvironment />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Powered by Gemini 2.0 Flash
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--calm-gradient-start)] to-[var(--calm-gradient-end)] bg-clip-text text-transparent">
                Alzheimer&apos;s Care
                <br />
                Assistant
              </h1>

              <p className="text-xl sm:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Your compassionate AI companion providing support, information,
                and guidance for Alzheimer&apos;s disease patients and caregivers
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/chat">
                  <Button variant="medical" size="lg" className="text-lg px-8 py-6">
                    Start Chatting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Assistant?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with care, powered by AI, designed for compassion
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Evidence-Based Information',
                  description:
                    'Access accurate, up-to-date information about Alzheimer\'s disease, treatments, and care strategies.',
                  color: 'text-medical-blue',
                },
                {
                  icon: Heart,
                  title: 'Compassionate Support',
                  description:
                    'Receive empathetic, patient-centered responses tailored to the unique challenges of Alzheimer\'s.',
                  color: 'text-medical-purple',
                },
                {
                  icon: MessageCircle,
                  title: 'Conversational AI',
                  description:
                    'Chat naturally with our advanced AI powered by Google\'s Gemini 2.0 Flash for smooth interactions.',
                  color: 'text-medical-teal',
                },
                {
                  icon: Shield,
                  title: 'Privacy First',
                  description:
                    'Your conversations are private. Use your own API key - we never store or access your data.',
                  color: 'text-medical-green',
                },
                {
                  icon: Sparkles,
                  title: 'Intelligent Responses',
                  description:
                    'Get personalized, context-aware answers that adapt to your specific questions and concerns.',
                  color: 'text-primary',
                },
                {
                  icon: Brain,
                  title: 'Chat History',
                  description:
                    'Keep track of all conversations with built-in history management and export capabilities.',
                  color: 'text-secondary',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-[var(--calm-gradient-start)] to-[var(--calm-gradient-end)] border-none text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 text-white/90">
                  Begin your journey with a compassionate AI assistant today.
                  All you need is a free Google AI Studio API key.
                </p>
                <Link href="/chat">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6"
                  >
                    Launch Chat Interface
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md border-t border-border/50">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground">
            <p className="text-sm">
              Built with care for Alzheimer&apos;s patients and caregivers.
              <br />
              This AI assistant provides information and support but does not replace
              professional medical advice.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
