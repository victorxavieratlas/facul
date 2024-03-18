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
      foto: "https://cinepop.com.br/wp-content/uploads/2024/02/meumalvadofavorito4_2.jpg.webp",
    },
    {
      id: 2,
      titulo: "Hotel Transilvânia",
      genero: "Animação",
      preco: 10.99,
      duracao: 92,
      foto: "https://cinemacomrapadura.com.br/imagens/2012/08/Cartaz-Nacional-Hoteltransilvania-CCR.jpg",
    },
    {
      id: 3,
      titulo: "Garfild Fora de Casa",
      genero: "Animação",
      preco: 18.99,
      duracao: 103,
      foto: "https://cinepop.com.br/wp-content/uploads/2024/01/garfield.jpg.webp",
    },
    {
      id: 4,
      titulo: "Kung Fu Panda 4",
      genero: "Animação",
      preco: 19.99,
      duracao: 120,
      foto: "https://cinepop.com.br/wp-content/uploads/2024/01/kung-fu-panda-2.jpg.webp",
    },
    {
      id: 5,
      titulo: "Elementos",
      genero: "Animação",
      preco: 19.99,
      duracao: 120,
      foto: "https://cinepop.com.br/wp-content/uploads/2023/05/imagem_2023-05-03_140718851.jpg.webp",
    }
]
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <Carousel />


      <h1 className="my-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-200 lg:text-3xl">Alugue Filmes: </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-4">
        <ItemFilme filme={filme[0]}/>
        <ItemFilme filme={filme[1]}/>
        <ItemFilme filme={filme[2]}/>
        <ItemFilme filme={filme[3]}/>
        <ItemFilme filme={filme[4]}/>
        <ItemFilme filme={filme[4]}/>
        <ItemFilme filme={filme[3]}/>
        <ItemFilme filme={filme[2]}/>
        <ItemFilme filme={filme[1]}/>
        <ItemFilme filme={filme[0]}/>
      </div>
    </div>
  )
}
