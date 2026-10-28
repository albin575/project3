import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StudyShell } from '@/components/study-shell'
import { DM_Sans, Noto_Sans_Malayalam } from 'next/font/google'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], weight: ['400', '500', '600', '700'], variable: '--font-malayalam', display: 'swap' })

export const metadata: Metadata = {
  title: 'padippu. — Marketing, but make it easy.',
  description: 'Marketing Management പഠിക്കാം മലയാളത്തിൽ. Detailed notes, real-life examples, revision cards and practice quizzes based on your MG University syllabus.',
  generator: 'v0.app',
  icons: { icon: { url: '/icon.svg', type: 'image/svg+xml' } },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f9f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${malayalam.variable} light`}>
      <body className="antialiased">
        <StudyShell>{children}</StudyShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
