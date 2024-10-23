import type { Metadata } from "next"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ClienteProvider from "./context/ClienteContext"

export const metadata: Metadata = {
  title: "Estéticas automotivas - Lavar Auto",
  description: "A primeira plataforma de estéticas automotivas do Brasil. Contrate estéticas automotivas de forma fácil e segura com a Lavar Auto.",
  keywords: [ "Estetica automotiva", "Lavagem", "estetica automotiva", "Lavagens", "Esteticas automoticas", "Lavagens automotivas", "lavagem de carro", "automotivo", "automotiva", "lavar carro", "lavar auto", "cuidados automotivos", "serviços automotivos"]
}

/* Schema Markup - Adicionar depois da logo*/
// "sameAs": [
//   "https://www.instagram.com/lavarcarro",
//   "https://www.facebook.com/lavarcarro"
// ]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lavar Auto",
              "url": "https://www.lavarauto.com",
              "logo": "https://www.lavarauto.com/logo2.svg"
            })
          }}
        />
      </head>
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
