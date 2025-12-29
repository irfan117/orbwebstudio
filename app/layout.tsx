import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebForge - Professional Website Development Services',
  description: 'We create stunning, high-performance websites tailored to your business needs. From e-commerce to corporate sites, we deliver excellence.',
  keywords: 'website development, web design, custom websites, e-commerce, web applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}

