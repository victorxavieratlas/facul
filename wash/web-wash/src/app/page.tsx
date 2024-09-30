"use client"
import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { ClienteContext } from "./context/ClienteContext"
import States from "./components/States";
import Search from "./components/Search";

export interface stateProps {
	id: number
	name: string
}

export default function Home() {
	const { mudaLogin } = useContext(ClienteContext)
	const router = useRouter()

	// Estado para armazenar os estados
	const [states, setStates] = useState<stateProps[]>([])

	// Verificar cookies e redirecionar se necessário
	useEffect(() => {
		if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
			router.replace(`/`)
			mudaLogin({
				userId: Number(Cookies.get("user_login_id")) || 0,
				userName: Cookies.get("x-user-name") || ""
			})
		}
	}, [router, mudaLogin])

	// Função para buscar os estados
	async function getState() {
		const statesResponse = await fetch("http://localhost:3007/search/state", { cache: 'no-store' })
		const statesData = await statesResponse.json()
		setStates(statesData)
	}

	// Chamada da função `getState` apenas uma vez
	useEffect(() => {
		getState()
	}, []) // Executa apenas uma vez no carregamento do componente

	// Mapear estados após a chamada da API
	const listStates = states.map((state: stateProps) => (
		<States key={state.id} state={state} />
	))

	return (
		<div>
			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-8 mb-4 sm:mb-4">
				<div className="ml-4 flex flex-col gap-4">
					<h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 text-balance">
						<span className="clear-left block mb-4">Encontre</span> 
						<span className="clear-left block mb-4">estéticas automotivas</span> 
						na <span className="font-extrabold sm:pl-4 pl-2 tracking-widest text-blue-500">lavar carro</span>
					</h1>
					<h2 className="text-1xl sm:text-2xl font-semibold text-gray-600 text-balance mt-4">
						<span className="clear-left block">A maior plataforma de estéticas automotivas</span>
						do Brasil.
					</h2>
				</div>
			</div>

			{/* Passando os estados para o componente Search */}
			<Search states={states} />

			{/* Renderizando a lista de estados */}
			<div className="mt-10 text-center grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3 sm:mx-20 mx-2 mb-10">
				{listStates}
			</div>
		</div>
	)
}
