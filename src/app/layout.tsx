import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Fraunces — the hero name, section titles, and italic signature.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
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
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body>
        {/* Hide the hero before the intro paints — only when JS is present, so
            no-JS users still see the full page. Cleared by the intro effect. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-intro','armed');" +
              // Failsafe: if the intro JS never runs (bundle fails to load),
              // reveal the hero anyway after a few seconds.
              "setTimeout(function(){if(document.documentElement.getAttribute('data-intro')==='armed'){document.documentElement.setAttribute('data-intro','on')}},4000)",
          }}
        />
        {children}
      </body>
    </html>
  )
}
