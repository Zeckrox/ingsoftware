'use client'

import Header from './Utils/Header';
import Footer from './Utils/Footer';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <html lang="en"  className={poppins.className}>
      <body style={{margin:0}}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>{children}</main>
        <Footer />
      </QueryClientProvider>
     </body>
    </html>
  );
}
