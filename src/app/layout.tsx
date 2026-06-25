import type { Metadata } from 'next'
import {
  Fraunces,
  Hanken_Grotesk,
  JetBrains_Mono,
  Big_Shoulders_Display,
} from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  variable: '--font-display',
})

// High-contrast sans-serif for the hero name: keeps the thick/thin variation
// and curves of a Didone, without the sharp serifs.
const headline = Big_Shoulders_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
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
  title: 'Phemo Den Chaba — Mathematics & Quantitative Finance',
  description:
    'Phemo Den Chaba — Mathematics student at the University of Waterloo working in quantitative finance and machine learning. Builder of trading platforms, factor-research engines, and AI systems.',
  metadataBase: new URL('https://pdchaba.com'),
  openGraph: {
    title: 'Phemo Den Chaba — Mathematics & Quantitative Finance',
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
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable} ${headline.variable}`}
    >
      <body>
        {/* Hide the hero before the intro paints — only when JS is present, so
            no-JS users still see the full page. Cleared by the intro effect. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-intro','armed')",
          }}
        />
        {children}
      </body>
    </html>
  )
}
