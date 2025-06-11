import GlobalHeader from './Utils/Header';
import GlobalFooter from './Utils/Footer';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en"  className={poppins.className}>
      <body style={{margin:0}}>
      <GlobalHeader />
      <main>{children}</main>
      <GlobalFooter />
     </body>
    </html>
  );
}
