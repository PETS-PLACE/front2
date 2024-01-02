import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pets Place',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body  style={{overflow: 'hidden', height: "100vh", backgroundColor: '#EBEFEF'}}>
        <Header/>
        {children}
      </body>
    </html>
  )
}