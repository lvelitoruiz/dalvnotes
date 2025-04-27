import './globals.css'
import './code.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { PrismInitializer } from '@/components/PrismInitializer'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '900']
})

export const metadata: Metadata = {
  title: 'RMX Blog',
  description: 'Blog de desarrollo web y tecnología',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={workSans.className}>
      <body>
        <Header />
        <main className="w-full mx-auto px-0 pb-8">
          {children}
        </main>
        <Footer />
        <PrismInitializer />
      </body>
    </html>
  )
}
