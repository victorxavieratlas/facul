import type { Metadata } from "next"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ClienteProvider from "./context/ClienteContext"

export const metadata: Metadata = {
  title: "Encontre lavagens e estéticas automotivas",
  description: "Encontre as melhores lavagens e estéticas automotivas em qualquer cidade",
  keywords: ["Lavagem", "Estetica automotiva", "Lavagens", "Esteticas automoticas", "Lavagens automotivas", "lavagem de carro", "automotivo", "automotiva", "lavar carro"]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ClienteProvider>
          <Header />
          {children}
          <Footer />
        </ClienteProvider>
      </body>
    </html>
  )
}
