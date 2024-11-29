import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
    subsets: ['latin'],
    preload: true,
    display: 'swap'
});

export default async function Contact() {
    return (
        <div>
            <div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-8 mb-4 sm:mb-4">
                <div className="ml-4 mt-10 flex flex-col gap-4">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance mb-2">
                        <span className="clear-left block mb-4">Fale Conosco</span>
                        <span className={`font-extrabold tracking-wide text-blue-500 ${fredoka.className}`}>lavar auto</span>
                    </h1>
                    <h2 className="text-lg sm:text-1xl font-semibold text-gray-600 text-balance mb-4 mt-4">
                        <span className="clear-left block">A Lavar Auto é a primeira e mais completa plataforma de estéticas automotivas do Brasil, conectando clientes a serviços como lavagem de carro, polimento e detalhamento. Com uma ferramenta de busca poderosa, os usuários podem comparar preços, serviços e localizações para encontrar a melhor opção em sua cidade. Estéticas automotivas podem se cadastrar para aumentar a visibilidade do negócio e alcançar mais clientes.</span>
                    </h2>
                    <div className="w-full m-4 ml-0 mt-0">
                        <h4 className="font-bold text-lg text-gray-500 mt-2 ml-2 p-2 px-2 sm:px-4">
                            Apresentação
                        </h4>

                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            Fundada em 2024, a Lavar Auto é a primeira e mais completa plataforma de estéticas automotivas do Brasil. Movida pela paixão por carros limpos e bem cuidados, nosso objetivo principal é revolucionar e aprimorar a relação entre estéticas automotivas, lavagens de carro e clientes, oferecendo mais visibilidade a este mercado tão importante e em constante crescimento.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
