import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'
import Header from './components/Search/Header/Header'

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
        <html lang="en" className="w-full h-full m-0 p-0">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full m-0 p-0`}>
                <Header />
                <div className="bg-gray-300 flex flex-col w-full h-full items-center">
                    <div className="h-full w-4/5 bg-white border-t-0 border-b-0 border-x-1 border-solid border-black overflow-auto">
                      <div className="p-2 flex flex-col gap-5">
                        {children}
                      </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
