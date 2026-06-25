import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  variable: '--font-display',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Den Chaba — Mathematics & Quantitative Finance',
  description:
    'Den Chaba — Mathematics student at the University of Waterloo working in quantitative finance and machine learning. Builder of trading platforms, factor-research engines, and AI systems.',
  metadataBase: new URL('https://pdchaba.com'),
  openGraph: {
    title: 'Den Chaba — Mathematics & Quantitative Finance',
    description:
      'Mathematics @ Waterloo · quantitative finance · machine learning. Selected projects and experience.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
