import Cards from "../../../../../../components/Card"
import Link from "next/link"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getProfilesByCity(cityId: string) {
	const response = await fetch(`${apiBaseUrl}/search/profiles/city/${cityId}`,
		{ cache: 'no-store' })
	const data = await response.json()
	return data
}

async function getState(stateId: string) {
	const response = await fetch(`${apiBaseUrl}/search/state/${stateId}`, { cache: 'no-store' })
	const data = await response.json()
	return data
}

async function getCity(cityId: string) {
	const response = await fetch(`${apiBaseUrl}/search/city/${cityId}`, { cache: 'no-store' })
	const data = await response.json()
	return data
}

export interface profileProps {
	id: number
	userId: string
	name: string
	phone: string
	bio: string
	minPrice: string
	maxPrice: string
	startDay: string
	finalDay: string
	openHour: string
	closeHour: string
	images: [{
		url: string
		published: boolean
	}]
	profileLocation: [{
		profileId: number,
		cityId: number,
		stateId: number,
		neighborhoodsId: number,
		address: string,
		addressNumber: string,
		addressCEP: string,
		addressComplement: string,
		neighborhood: {
			name: string
		},
		zone: {
			name: string
		}
	}]
}


export default async function cityDetails({
	params,
}: {
	params: { cityId: string, cityName: string, stateName: string, stateId: string, stateSlug: string, citySlug: string }
}) {

	const state = await getState(params.stateId)
	const city = await getCity(params.cityId)

	// const decodStateName = decodeURIComponent(params.stateName)
	const decodCityName = decodeURIComponent(params.cityName)

	const profiles = await getProfilesByCity(params.cityId)

	const listProfiles = profiles.map((profile: profileProps) => (
		<Cards key={profile.id} profile={profile} />
	))
	return (
		<div className="ml-4 sm:ml-48 mt-4">
			<nav className="flex" aria-label="Breadcrumb">
				<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
					<li className="inline-flex items-center">
						<Link href="/" className="inline-flex items-center text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500">
							<svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
							</svg>
							Início
						</Link>
					</li>
					<li>
						<div className="flex items-center">
							<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
							</svg>
							<Link href={`/estados/${params.stateSlug}/${params.stateId}`} className="text-center min-w-24 ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
								{state.name}
							</Link>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
							</svg>
							<a href="#" className="ms-1 text-md sm:text-sm font-medium text-blue-500 md:ms-2">{city.name}</a>
						</div>
					</li>
				</ol>
			</nav>

			<h1 className="w-full text-2xl sm:text-3xl font-extrabold text-gray-800 text-balance mb-10 mt-4">
				Estéticas automotivas em <span className="w-full font-extrabold text-blue-500">{city.name}, {state.name}</span>
			</h1>

			<div className="mb-10">
				{/* Adicionar 'ordenar e filtrar' */}
			</div>

			<div>
				{!listProfiles.length ?
					<div className="w-full flex flex-col items-center text-center pr-5 sm:pr-48 mb-60">
						<h2 className="text-md sm:text-lg font-semibold text-gray-600 mt-16 mb-12">
							Nenhuma estética automotiva encontrada.
						</h2>

						<h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 my-6">
							Seja o primeiro e domine a cidade!
						</h3>

						<div className="mt-8 min-w-60 sm:min-w-72">
							<Link href="/cadastrar" className="bg-blue-500 text-white font-bold py-3 px-14 sm:px-20 rounded-lg hover:bg-blue-600 transition duration-300">
								Anunciar grátis
							</Link>
						</div>
					</div>
					:
					<ul className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-5 sm:mr-20 sm:pr-28 mb-60 ml-2 mr-4">
						{listProfiles}
					</ul>
				}
			</div>
		</div>
	)
}