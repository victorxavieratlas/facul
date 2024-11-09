import Link from "next/link"
import Cities from "../../../components/Cities"
import { slugify } from "@/app/utils/slugify"

async function getCitiesByState(stateId: string) {
	const response = await fetch(`http://localhost:3007/search/cities-by-state/${stateId}`,
		{ cache: 'no-store' })
	const data = await response.json()
	return data
}

async function getState(stateId: string) {
	const response = await fetch(`http://localhost:3007/search/state/${stateId}`, { cache: 'no-store' })
	const data = await response.json()
	return data
}

// async function getCity(cityId: string) {
// 	const response = await fetch(`http://localhost:3007/search/city/${cityId}`, { cache: 'no-store' })
// 	const data = await response.json()
// 	return data
// }

export interface cityProps {
	id: number
	name: string
	stateId: number
}

export interface stateProps {
	id: number
	name: string
}

export default async function stateDetails({
	params,
}: {
	params: { stateId: string, stateName: string, stateSlug: string; }
}) {


	const state = await getState(params.stateId)

	// const decodStateName = decodeURIComponent(params.stateName)

	const cities = await getCitiesByState(params.stateId)

	const listCities = cities.data.map((city: cityProps) => (
		<Cities key={city.id} city={city} state={state} />
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
							<a href="#" className="ms-1 text-md sm:text-sm font-medium text-blue-400 md:ms-2">{state.name}</a>
						</div>
					</li>
				</ol>
			</nav>

			<h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-balance mb-10 mt-4">
				Estéticas automotivas em <span className="font-extrabold text-blue-500">{state.name}</span>
			</h1>
			<ul className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mr-4 sm:mr-20 pr-4 sm:pr-20 mb-40 ml-4">
				{listCities}
			</ul>
		</div>
	)
}