import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";

export const metadata: Metadata = {
  title: "CineClube Avenida",
  description: "Clube de Cinema, aluguel e avaliação de filmes",
  keywords: ["Cinema", "Filmes", "Locações de filmes"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="./pipoca.png" type="image/x-icon" />
      </head>
      <body>
        <Titulo />
        {children}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
