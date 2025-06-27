import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '多功能网站平台',
  description: '提供热门推荐、游戏、工具和阅后即焚功能的全能平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 