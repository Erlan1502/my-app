import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import ReduxProvider from '../store/ReduxProvider';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'SkyFitnessPro',
  description: 'Онлайн-тренировки для занятий дома',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${roboto.className} antialiased`}>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
