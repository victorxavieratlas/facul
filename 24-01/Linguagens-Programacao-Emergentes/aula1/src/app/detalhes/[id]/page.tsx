function Detalhes({params}: {params: {id:string}}) {

    const id = params.id
    
    return (
        <h1 className="text-5x1">Detalhes do Produto: {id}</h1>
    )
}

export default Detalhes
