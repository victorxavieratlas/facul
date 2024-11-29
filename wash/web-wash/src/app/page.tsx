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
					Primeira Plataforma de Estéticas Automotivas do Brasil
				</h3>
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
