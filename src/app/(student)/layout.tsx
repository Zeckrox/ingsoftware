'use client'
import { UserProvider } from '@/context/userContext';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <div>{children}</div>  );
}
