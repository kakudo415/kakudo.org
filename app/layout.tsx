import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kakudo.org',
  description: '覚道健太郎のページ。コンピュータサイエンスと応用代数を勉強中です！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
