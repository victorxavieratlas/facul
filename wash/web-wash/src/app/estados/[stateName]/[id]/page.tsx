import { escape } from "querystring"
import Cities from "../../../components/Cities"

async function getCitiesByState(stateId: string) {
	const response = await fetch(`http://localhost:3007/search/cities-by-state/${stateId}`,
		{ cache: 'no-store' })
	const data = await response.json()
	return data
}

async function getState(stateId: string, stateName: string) {
	const state = {
		id: Number(stateId),
		stateName: stateName
	}
	return state
}

export interface cityProps {
	id: number
	name: string
	stateId: number
}

export interface stateProps {
	id: number
	stateName: string
}

export default async function stateDetails({
	params,
}: {
	params: { id: string, stateName: string }
}) {


	const state = await getState(params.id, params.stateName)

	const decodStateName = decodeURIComponent(params.stateName)

	const cities = await getCitiesByState(params.id)

	const listCities = cities.data.map((city: cityProps) => (
		<Cities key={city.id} city={city} state={state} />
	))

	return (
		<div className="ml-48 mt-4">


			<nav className="flex" aria-label="Breadcrumb">
				<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
					<li className="inline-flex items-center">
						<a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500">
							<svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
							</svg>
							Início
						</a>
					</li>
					<li>
						<div className="flex items-center">
							<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
							</svg>
							<a href="#" className="ms-1 text-sm font-medium text-blue-400 md:ms-2">{decodStateName}</a>
						</div>
					</li>
				</ol>
			</nav>

			<h1 className="text-3xl font-extrabold text-gray-800 text-balance mb-10">
				Lavagens e Estéticas Automotivas em <span className="text-4xl font-extrabold text-blue-500">{decodStateName}</span>
			</h1>
			<ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mr-20 mb-10 ml-4">{listCities}</ul>
		</div>
	)
}