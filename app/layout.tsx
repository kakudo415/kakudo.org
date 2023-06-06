import './globals.css'
import { Inter, Noto_Sans_JP } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ["400", "500"],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata = {
  title: 'Kakudo Kentaro',
  description: "Kakudo Kentaro's personal website.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${inter.variable} ${noto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
