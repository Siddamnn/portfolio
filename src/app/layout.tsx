import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { BackgroundMusic } from '@/components/background-music';
import { ChatbotWidget } from '@/components/chatbot-widget';

export const metadata: Metadata = {
  title: "Welcome to Sid's",
  description: 'Welcome to the portfolio of Sid, a creator of neon dreams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <BackgroundMusic src="/background-music.mp3" />
            <Toaster />
            {/* Chatbot lives on all pages; API key can be provided via NEXT_PUBLIC_GEMINI_API_KEY */}
            <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
