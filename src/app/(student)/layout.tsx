'use client'
import { UserProvider } from '@/context/userContext';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <UserProvider>{children}</UserProvider>  );
}
