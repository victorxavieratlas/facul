import Image from 'next/image';
import Link from 'next/link';
import States from './components/States';
import Search from './components/Search';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
	subsets: ['latin'],
	preload: true,
	display: 'swap'
});

export interface StateProps {
	id: number;
	name: string;
}

export default async function Home() {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	const statesResponse = await fetch(`${apiBaseUrl}/search/state`, { cache: 'no-store' });
	const statesData: StateProps[] = await statesResponse.json();

	const listStates = statesData.map((state: StateProps) => (
		<States key={state.id} state={state} />
	));

	return (
		<div>
			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-8 mb-4 sm:mb-4">
				<div className="ml-4 mt-10 flex flex-col gap-4">
					<h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance">
						<span className="clear-left block mb-4">Encontre</span>
						<span className="clear-left block mb-4">estéticas automotivas</span>
						na <span className={`font-extrabold sm:pl-3 pl-1 tracking-wide text-blue-500 ${fredoka.className}`}>lavar auto</span>
					</h1>
					<h2 className="text-1xl sm:text-2xl font-semibold text-gray-600 text-balance mt-4">
						<span className="clear-left block">A primeira plataforma de estéticas automotivas</span>
						do Brasil.
					</h2>
				</div>
				{/* <Image src="/car.webp" width={400} height={220} alt="Logotipo da CarWash em azul claro" /> */}
				{/* <Image className="ml-8 mt-12" src="/car8.webp" width={400} height={330} alt="Logotipo da CarWash em azul claro" /> */}
			</div>

			{/* Passando os estados para o componente Search */}
			<Search states={statesData} />

			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto relative mt-20 mb-4 sm:mb-4">
				<div className="w-full flex flex-col items-center text-center mb-8">
					<h3 className="mb-4 px-4 font-bold text-xl sm:text-2xl text-gray-500">
						Anuncie grátis na primeira plataforma de estéticas automotivas do Brasil.
					</h3>
				</div>
				<div className="flex flex-col justify-center sm:flex-row sm:justify-between gap-4 relative sm:mx-56 ml-10">
					<ul className="max-w-md space-y-1 font-semibold text-lg text-gray-500 list-inside">
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Você não paga nada para anunciar
						</li>
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Aumente o faturamento
						</li>
						<li className="flex items-center sm:pb-2 pb-1">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Receba contato de clientes
						</li>
					</ul>
					<ul className="max-w-md space-y-1 font-semibold text-lg text-gray-500 list-inside">
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Domine a sua cidade
						</li>
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Preços e serviços
						</li>
						<li className="flex items-center sm:pb-2">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Plataforma dedicada
						</li>
					</ul>
				</div>
			</div>

			<div className="flex justify-center mt-16">
				<Link href="/cadastrar" className="bg-blue-500 text-white font-bold py-3 px-20 rounded-lg hover:bg-blue-600 transition duration-300">
					Anunciar grátis
				</Link>
			</div>

			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto relative mt-20 mb-4 sm:mb-4">
				<div className="w-full flex flex-col items-center text-center">
					<h3 className="mb-4 px-4 font-bold text-xl sm:text-2xl text-gray-500">
						Contrate com mais praticidade e segurança
					</h3>
					<p className="px-4 mb-8">
						Na Lavar Auto, você encontra as melhores estéticas automotivas, e pode comparar e contratar sem complicações
					</p>
				</div>
				<div className="flex flex-col justify-center sm:flex-row sm:justify-between gap-4 relative sm:mx-56 ml-10">
					<ul className="max-w-md space-y-1 font-semibold text-lg text-gray-500 list-inside">
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Contato direto por WhatsApp
						</li>
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Lista de serviços
						</li>
						<li className="flex items-center sm:pb-2 pb-1">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Pesquisa por cidades e bairros
						</li>
					</ul>
					<ul className="max-w-md space-y-1 font-semibold text-lg text-gray-500 list-inside">
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Lista de valores
						</li>
						<li className="flex items-center sm:pb-2 pb-4">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Fácil comparação
						</li>
						<li className="flex items-center sm:pb-2">
							<svg className="w-5 h-5 me-2 text-blue-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							Plataforma dedicada
						</li>
					</ul>
				</div>
			</div>

			<div className="flex justify-center mt-16">
				<a href="#search" className="bg-blue-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-600 transition duration-300">
					Veja estéticas automotivas agora
				</a>
			</div>

			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap sm:mt-20 mt-14 mb-4 sm:mb-4">
				<h3 className="ml-4 max-w-sm sm:max-w-md font-bold text-xl sm:text-2xl text-gray-500">
					Maior plataforma de estéticas automotivas do Brasil
				</h3>
				<div className="w-full m-4 ml-0 mt-0">
					<h4 className="font-bold text-lg text-gray-500 mt-2 ml-2 p-2 px-2 sm:px-4">
						Apresentação
					</h4>
					<p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
						A Lavar Carro foi fundada em 2024 e é a primeira plataforma de estéticas automotivas do Brasil.
						A paixão por automóveis limpos com os devidos e necessários cuidados é o foco princípal da
						plataforma que visa transformar e melhorar a relação entre estéticas automotivas e clientes,
						dando mais visibilidade para este mercado tão importante e em constante crescimento.
					</p>
					<p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
						Desde o início, a plataforma oferece uma experiência única para estéticas automotivas e clientes,
						onde as estéticas automotivas podem criar anúncios com informações de contato, serviços oferecidos e
						dados importantes do negócio, e clientes podem fazer buscas por estados e cidades para escolher as
						melhores estéticas automotivas confiáveis que supram suas necessidades.
					</p>
					<h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
						Escontre estéticas automotivas por todo o Brasil
					</h4>
					<p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
						A Lavar Carro oferece uma busca poderosa que permite encontrar as melhores estéticas automotivas
						da cidade escolhida. Ao acessar a busca de uma cidade e o perfil da estética automotiva, é possível comparar valores, horários de
						atendimento e serviços, garantindo as estéticas automotivas que encontrem mais clientes e que
						clientes consigam ter certeza de qual estética automotiva vão escolher.
					</p>
					<h4 className="font-bold text-lg text-gray-500 mt-4 p-2 px-2 sm:px-4">
						Segurança é uma prioridade
					</h4>
					<p className="font-semibold text-lg text-gray-500 p-2 px-4 sm:px-8">
						A plataforma preza por estéticas automotivas e clientes confiáveis e sérios, também,
						contamos com diversos integrações de segurança para garantir a melhor experiência.
					</p>
				</div>

			</div>

			{/* Renderizando a lista de estados */}
			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-20 mb-4 sm:mb-4">
				<h3 className="ml-4 max-w-sm sm:max-w-md font-bold text-xl sm:text-2xl text-gray-500">
					Estéticas automotivas nos estados
				</h3>
			</div>
			<div className="mt-10 text-center grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3 sm:mx-20 mx-2 mb-10 sm:pl-14 font-semibold text-lg text-gray-500">
				{listStates}
			</div>
		</div>
	)
}
