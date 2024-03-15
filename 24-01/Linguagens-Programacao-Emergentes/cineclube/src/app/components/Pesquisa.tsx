function Pesquisa() {
    return (
        <div className="flex">
            <form className="flex-1">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Pesquisar</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-200 bg-gray-800" placeholder="Título ou Gênero do filme..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5  bg-purple-500 hover:bg-purple-600 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2">Pesquisar</button>
                    {/* colocar botões um do lado do outro e retirar borda ao escrever no input */}
                    <button type="button" className="text-white absolute end-2.5 bottom-2.5  bg-purple-500 hover:bg-purple-600 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2">Ver Todos</button>
                </div>
            </form>
        </div>
    )
}

export default Pesquisa
