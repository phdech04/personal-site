import type { Metadata } from 'next'
import {
  Fraunces,
  Hanken_Grotesk,
  JetBrains_Mono,
  Poppins,
} from 'next/font/google'
import './globals.css'

// Fraunces with the SOFT (rounded terminals) and WONK (playful) axes — used for
// section titles and the italic signature.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-display',
})

// Poppins — geometric sans-serif for the hero name.
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable} ${poppins.variable}`}
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
