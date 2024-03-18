interface filmeProps {
    id: number
    titulo: string
    genero: string
    preco: number
    duracao: number
    foto: string
}

function ItemFilme({filme}: {filme: filmeProps}) {
    return (
        <div className="max-w-sm bg-gray-800 shadow mt-2">
            <a href="#">
                <img className="h-72 max-h-72 w-full" src={filme.foto} alt="Capa do Filme" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="h-16 mb-2 text-2xl font-bold tracking-tight text-gray-200">
                        {filme.titulo}
                    </h5>
                </a>
                <p className="h-10 mb-3 font-normal text-gray-200">
                    {filme.genero} - {filme.duracao} min.
                </p>
                <p className="h-10 mb-3 text-bold text-gray-200">
                    {filme.genero}
                </p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Alugar por {filme.preco}
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default ItemFilme
