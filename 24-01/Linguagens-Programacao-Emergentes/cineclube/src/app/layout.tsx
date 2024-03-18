import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";

export const metadata: Metadata = {
  title: "CineClube Avenida",
  description: "Clube de Cinema, aluguel e avaliação de filmes",
  keywords: ["Cinema", "Filmes", "Locação de Filmes"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
       <link rel="shortcut icon" href="./logo.png" type="image/x-icon" />
      </head>
      <body className=" bg-gray-900">
        <Titulo />
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
