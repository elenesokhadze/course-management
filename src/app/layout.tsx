import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Aside } from './components/Aside'
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Course Management Platform',
  description: 'Empowering education with a robust course management system. Manage courses, students and payments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen font-montserrat'>
          <div className='flex min-h-screen'>
            <Aside />
            <main className='w-full bg-main'>
              <Header />
              {children}
            </main>
          </div>
        </ div>
      </body>
    </html>
  )
}
