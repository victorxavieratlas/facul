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
                        <span className="clear-left block mb-4">Termos & Condições</span>
                        <span className={`font-extrabold tracking-wide text-blue-500 ${fredoka.className}`}>lavar auto</span>
                    </h1>
                    <h2 className="text-lg sm:text-1xl font-semibold text-gray-600 text-balance mt-4 mb-4">
                        <span className="clear-left block">Bem-vindo(a) à Lavar Auto, a maior plataforma de estéticas automotivas do Brasil. Ao utilizar nossos serviços, você concorda com os termos e condições aqui estabelecidos. A Lavar Auto atua exclusivamente como um local de anúncios, conectando estéticas automotivas (anunciantes) a clientes interessados. Não nos responsabilizamos pelos serviços prestados pelos anunciantes.</span>
                    </h2>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        1. Aceitação dos Termos
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        1.1 Ao acessar ou utilizar a plataforma Lavar Auto, você concorda em cumprir estes Termos e Condições de Uso. Se você não concorda com estes termos, por favor, não utilize a plataforma.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        2. Sobre a Plataforma
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        2.1. A Lavar Auto é uma plataforma online que conecta estéticas automotivas (anunciantes) a clientes interessados em seus serviços.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        2.2. A plataforma oferece aos anunciantes a possibilidade de criar anúncios com informações de contato, serviços oferecidos e dados importantes do negócio.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        2.3. Os clientes podem buscar estéticas automotivas por estados e cidades, comparar serviços, valores e horários de atendimento.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        3. Natureza dos Serviços
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        3.1. A Lavar Auto atua apenas como um intermediário, não participando da prestação de serviços entre anunciantes e clientes.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        3.2. Não garantimos a qualidade, segurança ou legalidade dos serviços anunciados.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        4. Responsabilidades dos Usuários
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Anunciantes:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                        4.1. Devem fornecer informações precisas, completas e atualizadas sobre seus serviços.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                        4.2. São responsáveis pela veracidade dos dados e pela qualidade dos serviços prestados.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Clientes:
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                        4.3. Devem verificar as informações dos anunciantes e tomar decisões informadas ao contratar serviços.
                        </p>
                        <p className="text-gray-600 mx-10 my-6">
                        4.4. São responsáveis por negociar diretamente com os anunciantes quaisquer detalhes ou condições dos serviços.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        5. Limitação de Responsabilidade
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        5.1. A Lavar Auto não se responsabiliza por quaisquer danos ou prejuízos decorrentes de transações entre anunciantes e clientes.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        5.2. Não somos responsáveis por eventuais divergências, atrasos, falhas ou quaisquer outros problemas relacionados aos serviços prestados pelos anunciantes.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        6. Resolução de Conflitos
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        6.1. Qualquer disputa ou problema decorrente dos serviços contratados deve ser resolvido diretamente entre anunciante e cliente.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        6.2. A Lavar Auto não mediará conflitos nem se responsabilizará por resolver disputas entre as partes.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        7. Direitos de Propriedade Intelectual
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        7.1. Todo o conteúdo da plataforma, incluindo textos, imagens, logotipos e software, é protegido por leis de propriedade intelectual.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        7.2. É proibido reproduzir, distribuir ou utilizar qualquer conteúdo sem autorização prévia e expressa da Lavar Auto.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        8. Uso Adequado da Plataforma
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        8.1. Os usuários comprometem-se a não utilizar a plataforma para fins ilegais ou não autorizados.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        8.2. É proibido inserir conteúdo ofensivo, discriminatório, ilegal ou que viole direitos de terceiros ou que infrinja a legislação brasileira.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        9. Modificações nos Termos
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        9.1. A Lavar Auto reserva-se o direito de alterar estes Termos e Condições de Uso a qualquer momento.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        9.2. As alterações entrarão em vigor imediatamente após a publicação na plataforma.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        9.3. É responsabilidade do usuário verificar periodicamente os termos atualizados.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        10. Privacidade e Proteção de Dados
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        10.1. A Lavar Auto compromete-se a proteger a privacidade dos usuários, conforme disposto em nossa Política de Privacidade.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        10.2. Ao utilizar a plataforma, você concorda com a coleta e uso de suas informações conforme descrito na Política de Privacidade.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        11. Legislação Aplicável e Foro
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        11.1. Estes Termos e Condições de Uso são regidos pelas leis da República Federativa do Brasil.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        11.2. Qualquer litígio ou controvérsia decorrente destes termos será submetido ao foro da comarca do domicílio do usuário.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        12. Contato
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        12.1. Para esclarecimentos ou dúvidas sobre estes termos, entre em contato conosco através da área de contato: Fale conosco.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        Esclarecimentos Adicionais
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Natureza da Plataforma: A Lavar Auto é um local de anúncios que visa facilitar a conexão entre estéticas automotivas e clientes. Não participamos da negociação ou execução dos serviços anunciados.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Isenção de Responsabilidade: Não garantimos a veracidade das informações fornecidas pelos anunciantes nem nos responsabilizamos por quaisquer ações ou omissões dos mesmos.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Resolução de Problemas: Em caso de problemas relacionados aos serviços prestados, anunciante e cliente devem buscar uma solução entre si, podendo recorrer aos órgãos competentes, se necessário.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-lg text-gray-700 m-2">
                        Demais Pontos Importantes
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Segurança: Priorizamos a segurança dos usuários e adotamos medidas para proteger as informações compartilhadas na plataforma.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Direitos dos Usuários: Os usuários têm o direito de acessar, corrigir ou excluir suas informações pessoais, conforme previsto na legislação brasileira.
                        </p>
                        <p className="text-gray-600 mx-8 my-6">
                        Integridade da Plataforma: Qualquer tentativa de violar a segurança ou integridade da plataforma poderá resultar em medidas legais e no banimento do usuário.
                        </p>
                    </div>
                    <div className="mb-14">
                        <p className="text-lg text-gray-700 m-2">
                        Ao utilizar a Lavar Auto, você reconhece que leu, entendeu e concorda com estes Termos e Condições de Uso. Agradecemos por escolher nossa plataforma e esperamos proporcionar a melhor experiência possível na busca por estéticas automotivas de qualidade em todo o Brasil.
                        </p>
                    </div>
                </div>
                {/* <Image src="/car.webp" width={400} height={220} alt="Logotipo da CarWash em azul claro" /> */}
                {/* <Image className="ml-8 mt-12" src="/car8.webp" width={400} height={330} alt="Logotipo da CarWash em azul claro" /> */}
            </div>
        </div>
    )
}
