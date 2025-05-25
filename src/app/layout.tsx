import Header from './HTML/Header';
import Footer from './HTML/Footer';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Header /> 
          {children}
          <Footer /> 
        </main>
      </body>
    </html>
  );
}