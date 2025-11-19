import type {Metadata} from 'next';
import { Literata } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { BackgroundMusic } from '@/components/background-music';

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
});

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
      <body className={`${literata.variable} font-body antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <BackgroundMusic src="/background-music.mp3" />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
