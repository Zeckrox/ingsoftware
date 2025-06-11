'use client'

import Header from '../components/utils/Header';
import Footer from '../components/utils/Footer';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className={poppins.className}>
      <body style={{margin:0}}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>{children}</main>
        {/* <GlobalFooter /> */}
        <ReactQueryDevtools initialIsOpen={false} />
        <Footer />
      </QueryClientProvider>
     </body>
    </html>
  );
}
