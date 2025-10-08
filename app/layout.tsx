import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import ToasterContext from './context/ToasterContext'
import Authcontext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'
import localFont from 'next/font/local';

// const inter = Inter({ subsets: ['latin'] })
const inter = localFont({
  src: [
    { path: '/fonts/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: '/fonts/Inter-Bold.woff2', weight: '700', style: 'normal' }
  ],
  // variable: '--font-inter',
  display: 'swap'
});


export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone ',
}

export default function RootLayout({
  children,
}: {  
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authcontext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </Authcontext>
        </body>
    </html>
  )
}
