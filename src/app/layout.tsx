import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={poppins.className}>
        <body>
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <main><div>Header</div>{children}<div>Footer</div></main>
        </body>
      </html>
    )
  }
