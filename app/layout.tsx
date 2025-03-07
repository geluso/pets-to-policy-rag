import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PETS To Policy',
  description: 'PETS To Policy',
}

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en" className="h-full w-full m-0 p-0">
            <body className="h-full w-full m-0 p-0 flex flex-col">
                {children}
            </body>
        </html>
    )
}
