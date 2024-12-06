import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { StoreProvider } from "@/store/StoreProvider"
import { AuthProvider } from "@/components/hooks/useAuth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WorkerApp",
  description: "A modern worker management application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
              {children}
            </main>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}