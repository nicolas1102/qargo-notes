import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "Qargo Notes",
    template: "%s | Qargo Notes",
  },
  description: "Quick and simple note-taking app for focused productivity.",
  keywords: [
    "notes app",
    "note-taking",
    "Qargo Notes",
    "notepad online",
    "minimal notes",
    "fast notes app",
    "productivity tool",
    "organize ideas",
  ],
  authors: [{ name: "Nicolás Díaz", url: "https://qargo-notes.vercel.app" }],
  creator: "Nicolás Díaz",
  openGraph: {
    title: "Qargo Notes",
    description: "Write and organize your notes with simplicity and speed.",
    url: "https://qargo-notes.vercel.app",
    siteName: "Qargo Notes",
    images: [
      {
        url: "https://qargo-notes.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qargo Notes Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qargo Notes",
    description: "Take notes effortlessly and stay organized with Qargo Notes.",
    images: ["https://qargo-notes.vercel.app/og-image.png"],
    creator: "@qargo",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
