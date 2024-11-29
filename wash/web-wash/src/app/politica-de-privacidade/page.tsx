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
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance mb-2">
                        <span className="clear-left block mb-4">Política de Privacidade</span>
                        <span className={`font-extrabold tracking-wide text-blue-500 ${fredoka.className}`}>lavar auto</span>
                    </h1>
                    <h2 className="text-lg sm:text-1xl font-semibold text-gray-600 text-balance mb-4 mt-4">
                        <span className="clear-left block">Na Lavar Auto, respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e compartilhamos suas informações, em conformidade com as leis brasileiras e a Lei Geral de Proteção de Dados (LGPD).</span>
                    </h2>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                            1. Introdução
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                            Bem-vindo(a) à política de privacidade da Lavar Auto, uma plataforma que conecta anunciantes a clientes. Ao utilizar nossos serviços, você concorda com a coleta e uso de suas informações conforme descrito nesta Política de Privacidade.
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
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        4. Compartilhamento de Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Seus dados podem ser compartilhados com:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Anunciantes: para viabilizar o contato e negociação de produtos ou serviços.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Prestadores de Serviços Terceirizados: que auxiliam na operação da plataforma (ex.: serviços de pagamento, segurança).
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Autoridades Competentes: em caso de exigência legal ou para proteger nossos direitos.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        5. Segurança dos Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        6. Direitos dos Titulares dos Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Você tem o direito de:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Confirmar a existência de tratamento de seus dados.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Acessar seus dados pessoais.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Corrigir dados incompletos, inexatos ou desatualizados.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Anonimizar, bloquear ou eliminar dados desnecessários ou excessivos.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Solicitar a portabilidade dos dados a outro fornecedor de serviço.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Eliminar dados tratados com seu consentimento.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Obter informações sobre o compartilhamento de seus dados.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Revogar o consentimento a qualquer momento.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Para exercer seus direitos, entre em contato conosco através da área de contato: [ADICIONAR LINK DA ÁREA DE CONTATO].
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        7. Retenção de Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Manteremos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, exceto se houver exigência legal em contrário.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        8. Cookies e Tecnologias Semelhantes
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência na plataforma. Você pode gerenciar as preferências de cookies nas configurações do seu navegador.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        9. Alterações nesta Política de Privacidade
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por outros meios de comunicação.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        10. Contato
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Em caso de dúvidas ou solicitações relacionadas a esta Política de Privacidade, entre em contato:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                            - Fale conosco
                        </p>
                    </div>
                    <div className="mb-14">
                        <p className="text-gray-600 mx-8 my-6">
                        Agradecemos por confiar na Lavar Auto. Estamos comprometidos em proteger sua privacidade e garantir a segurança de seus dados pessoais.
                        </p>
                    </div>
                </div>
                {/* <Image src="/car.webp" width={400} height={220} alt="Logotipo da CarWash em azul claro" /> */}
                {/* <Image className="ml-8 mt-12" src="/car8.webp" width={400} height={330} alt="Logotipo da CarWash em azul claro" /> */}
            </div>
        </div>
    )
}
