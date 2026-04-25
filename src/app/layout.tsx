import type { Metadata } from 'next';
import { Anton, Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { BackgroundMusic } from '@/components/background-music';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sid's Starlit Stage",
  description: "Frontend, AI, blockchain, and the occasional poem written under late-night fluorescents. A small portfolio of things made with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        {children}
        <BackgroundMusic src="/background-music.mp3" />
      </body>
    </html>
  );
}
