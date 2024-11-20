import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
    subsets: ['latin'],
    preload: true,
    display: 'swap'
});

export default async function PrivacyPolicy() {
    return (
        <div>
            <div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-8 mb-4 sm:mb-4">
                <div className="ml-4 mt-10 flex flex-col gap-4">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance">
                        <span className="clear-left block mb-4">Política de Privacidade</span>
                        <span className={`font-extrabold tracking-wide text-blue-500 ${fredoka.className}`}>lavar auto</span>
                    </h1>
                    <h2 className="text-lg sm:text-1xl font-semibold text-gray-600 text-balance mt-4">
                        <span className="clear-left block">Na Lavar Auto, respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e compartilhamos suas informações, em conformidade com as leis brasileiras e a Lei Geral de Proteção de Dados (LGPD).</span>
                    </h2>
                    <div className="mt-4">
                        <p className="text-lg text-gray-700 m-2">
                            1. Introdução
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                            Bem-vindo à política de privacidade da Lavar Auto, uma plataforma que conecta anunciantes a clientes. Ao utilizar nossos serviços, você concorda com a coleta e uso de suas informações conforme descrito nesta Política de Privacidade.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                            2. Dados Coletados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                            Coletamos os seguintes dados pessoais:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Informações de Cadastro: nome, e-mail, telefone, endereço e outros dados fornecidos ao se registrar na plataforma.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Dados de Uso: histórico de navegação, interações com anúncios e anunciantes, preferências e feedback.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Dados de Comunicação: mensagens trocadas entre clientes e anunciantes através da plataforma.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        3. Finalidades do Tratamento de Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Utilizamos seus dados para:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Facilitar a Comunicação: conectar clientes e anunciantes de forma eficiente.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Melhorar nossos Serviços: analisar o uso da plataforma para aprimorar funcionalidades.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Marketing e Promoções: enviar ofertas e novidades que possam ser do seu interesse.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Cumprimento Legal: atender a obrigações legais e regulatórias.
                        </p>
                    </div>
                </div>
                {/* <Image src="/car.webp" width={400} height={220} alt="Logotipo da CarWash em azul claro" /> */}
                {/* <Image className="ml-8 mt-12" src="/car8.webp" width={400} height={330} alt="Logotipo da CarWash em azul claro" /> */}
            </div>
        </div>
    )
}
