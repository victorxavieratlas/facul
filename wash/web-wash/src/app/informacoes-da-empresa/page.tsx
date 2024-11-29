import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
    subsets: ['latin'],
    preload: true,
    display: 'swap'
});

export default async function CompanyInformation() {
    return (
        <div>
            <div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-8 mb-4 sm:mb-4">
                <div className="ml-4 mt-10 flex flex-col gap-4">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance mb-2">
                        <span className="clear-left block mb-4">Informações da Empresa</span>
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
                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            Desde o início, a Lavar Auto proporciona uma experiência única para estéticas automotivas e clientes. As estéticas automotivas podem criar anúncios detalhados com informações de contato, serviços oferecidos como lavagem de carro, polimento, enceramento, detalhamento automotivo e limpeza interna, e dados importantes do negócio. Por outro lado, os clientes podem realizar buscas por estados e cidades, comparando preços, horários de atendimento e serviços disponíveis, garantindo a escolha das melhores estéticas automotivas confiáveis que atendam às suas necessidades.
                        </p>

                        <h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
                            Encontre Estéticas Automotivas por Todo o Brasil
                        </h4>
                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            A Lavar Auto oferece uma poderosa ferramenta de busca que permite encontrar as melhores estéticas automotivas, lavagens de carro e serviços similares em qualquer cidade do Brasil. Ao acessar a busca de uma cidade e o perfil da estética automotiva, é possível comparar valores, horários de atendimento e serviços como lavagem de carro, polimento, enceramento, limpeza interna, hidratação de couro e cristalização de pintura, entre outros. Assim, garantimos que as estéticas automotivas alcancem mais clientes e que os clientes tenham a certeza de qual estética automotiva escolher.
                        </p>

                        <h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
                            Segurança e Confiança são Prioridades
                        </h4>
                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            Nossa plataforma valoriza a segurança e confiabilidade tanto das estéticas automotivas quanto dos clientes. Contamos com diversas integrações de segurança e sistemas de avaliação para garantir a melhor experiência possível.
                        </p>

                        <h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
                            Por Que Escolher a Lavar Auto
                        </h4>
                        <p className="text-gray-500 text-lg mx-8 my-2 font-semibold">
                            Rede Ampla:
                        </p>
                        <p className="font-semibold text-lg text-gray-500 mx-10 mb-6">
                            - Com estéticas automotivas e lavagens de carro cadastradas em todo o Brasil, você tem acesso a uma vasta gama de opções.
                        </p>
                        <p className="text-gray-500 text-lg mx-8 mt-6 mb-2 font-semibold">
                            Comparação Fácil:
                        </p>
                        <p className="font-semibold text-lg text-gray-500 mx-10 mb-6">
                            - Compare preços, serviços e avaliações de clientes para encontrar a melhor opção para você.
                        </p>
                        <p className="text-gray-500 text-lg mx-8 mt-6 mb-2 font-semibold">
                            Agendamento Rápido:
                        </p>
                        <p className="font-semibold text-lg text-gray-500 mx-10 mb-6">
                            - Agende sua lavagem de carro ou serviço de detalhamento automotivo diretamente no contato da loja.
                        </p>

                        <h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
                            Experimente o Melhor em Estética Automotiva
                        </h4>
                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            Seja para uma simples lavagem de carro ou um serviço completo de detalhamento automotivo, a Lavar Auto conecta você com profissionais que podem deixar seu carro como novo. Nossa plataforma é dedicada a ajudá-lo a encontrar serviços de alta qualidade, como polimento, enceramento, limpeza interna, hidratação de couro e muito mais.
                        </p>

                        <h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
                            Junte-se à Lavar Auto Hoje Mesmo
                        </h4>
                        <p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
                            Se você é proprietário de uma estética automotiva ou lava jato, cadastre-se agora e aumente a visibilidade do seu negócio. Se você é um cliente em busca dos melhores serviços de lavagem de carro e estética automotiva, comece sua busca conosco e encontre a melhor opção na sua cidade.
                        </p>
                    </div>
                </div>
                {/* <Image src="/car.webp" width={400} height={220} alt="Logotipo da CarWash em azul claro" /> */}
                {/* <Image className="ml-8 mt-12" src="/car8.webp" width={400} height={330} alt="Logotipo da CarWash em azul claro" /> */}
            </div>
        </div>
    )
}
