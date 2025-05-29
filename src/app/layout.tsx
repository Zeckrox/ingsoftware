import GlobalHeader from './utils/Header';
import GlobalFooter from './utils/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <GlobalHeader />
      <main>{children}</main>
      <GlobalFooter />
     </body>
    </html>
  );
}
