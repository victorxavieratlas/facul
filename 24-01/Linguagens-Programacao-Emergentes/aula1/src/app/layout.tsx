import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";

export const metadata: Metadata = {
  title: "Aula 1: Next",
  description: "Exemplos de Recursos do Next",
  keywords: ["Next", "UniSenac", "Programação"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <Titulo/>
        {children}
      </body>
    </html>
  );
}
