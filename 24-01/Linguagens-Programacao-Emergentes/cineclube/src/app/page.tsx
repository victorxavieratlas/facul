import Carousel from "./components/Carousel";
import ItemFilme from "./components/ItemFilme";
import Pesquisa from "./components/Pesquisa";

export default function Home() {
  const filme = [
    {
      id: 1,
      titulo: "Meu Malvado Favorito 4",
      genero: "Animação",
      preco: 14.99,
      duracao: 95,
      foto: "https://static.wikia.nocookie.net/dublagem/images/2/2f/Meu_Malvado_Favorito_4.jpg/revision/latest?cb=20240209004154&path-prefix=pt-br",
    },
    {
      id: 2,
      titulo: "Hotel Transilvânia",
      genero: "Animação",
      preco: 10.99,
      duracao: 92,
      foto: "https://cinemacomrapadura.com.br/imagens/2012/08/Cartaz-Nacional-Hoteltransilvania-CCR.jpg",
    }
]
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <Carousel filme={filme[1]}/>


      <h1 className="my-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-200 lg:text-3xl">Alugue Filmes: </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-4">
        <ItemFilme filme={filme[0]}/>
        <ItemFilme filme={filme[1]}/>
        <ItemFilme filme={filme[0]}/>
        <ItemFilme filme={filme[1]}/>
        <ItemFilme filme={filme[0]}/>
        <ItemFilme filme={filme[1]}/>
      </div>
    </div>
  )
}
