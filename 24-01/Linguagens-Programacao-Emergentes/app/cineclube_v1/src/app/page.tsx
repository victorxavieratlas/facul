import ItemFilme from "./components/ItemFilme";
import Pesquisa from "./components/Pesquisa";

export default function Home() {
  const filme = {
    id: 1,
    titulo: "Minha Irmã e Eu",
    genero: "Comédia",
    preco: 14.90,
    duracao: 95,
    foto: "https://br.web.img2.acsta.net/pictures/23/11/21/20/37/1333793.png"
  }

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <Pesquisa />

      <h1 className="my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">Lançamentos de Filmes: <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Direto do Cinema</span></h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <ItemFilme filme={filme} />
        <ItemFilme filme={filme} />
        <ItemFilme filme={filme} />
        <ItemFilme filme={filme} />
        <ItemFilme filme={filme} />
      </div>

    </div>
  )
}
