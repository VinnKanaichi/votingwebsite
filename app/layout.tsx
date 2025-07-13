// app/layout.tsx
import './styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Voting Bot',
  description: 'Voting untuk bot Furina atau Multifungsi',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
