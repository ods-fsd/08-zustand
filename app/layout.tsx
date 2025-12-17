import type { Metadata } from 'next';
import { Roboto } from 'next/font/google'; 
import './globals.css';
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';


const roboto = Roboto({
  weight: ['400', '500', '700'], 
  subsets: ['latin'],
  variable: '--font-roboto', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub - Organize Your Daily Tasks and Notes', 
  description: 'A simple and efficient application to manage your notes, tasks, and ideas in one place.', 
  openGraph: {
    title: 'NoteHub - Organize Your Daily Tasks and Notes',
    description: 'A simple and efficient application to manage your notes, tasks, and ideas in one place.',
    url: 'https://08-zustand-lyart-pi.vercel.app/', 
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg', 
        width: 1200,
        height: 630,
        alt: 'NoteHub Application Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* Використовуємо змінну шрифту Roboto */}
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal} 
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}