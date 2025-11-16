import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alzheimer's Care Assistant - Compassionate AI Support",
  description: "An AI-powered chatbot providing compassionate support, information, and guidance for Alzheimer's disease patients and caregivers. Powered by Google Gemini 2.0 Flash.",
  keywords: ["Alzheimer's", "AI Assistant", "Healthcare", "Caregiving", "Medical Support", "Gemini AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
