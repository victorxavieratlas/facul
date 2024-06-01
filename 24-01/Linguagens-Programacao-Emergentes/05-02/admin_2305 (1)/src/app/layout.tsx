import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";

export const metadata: Metadata = {
  title: "Admin: Cineclube Avenida",
  description: "Área Administrativa: Cineclube Avenida",
  keywords: ["Cineclube", "Aluguel de Filmes", "Cinema"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Titulo />
        {children}
      </body>
    </html>
  );
}
