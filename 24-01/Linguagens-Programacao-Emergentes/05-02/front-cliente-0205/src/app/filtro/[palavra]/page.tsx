import Pesquisa from "../../components/Pesquisa"
import ItemFilme from "../../components/ItemFilme"
import { filmeProps } from "../../page"

async function getFilmes(palavra: string) {
  const response = await fetch("http://localhost:3004/filmes/pesquisa/" + palavra,
    { cache: 'no-store' })
  const dados = await response.json()
  return dados
}

async function Filtro({ params }: { params: { palavra: string } }) {

  const filmes = await getFilmes(params.palavra)

  const listaFilmes = filmes.map((filme: filmeProps) => (
    <ItemFilme key={filme.id} filme={filme} />
  ))

  return (
    <div className="max-w-7xl mx-auto">
      <Pesquisa />
      <h1 className="mt-5 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">
        Pesquisa de Filmes:
        <span className="ms-2 underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
          [{params.palavra}]</span>
      </h1>

      {filmes.length >= 1 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {listaFilmes}
        </div>
        :
        <h2>Não há filmes com a palavra pesquisada</h2>
      }

    </div>
  )
}

export default Filtro