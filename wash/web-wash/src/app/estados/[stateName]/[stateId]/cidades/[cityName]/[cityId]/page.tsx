import { getStateAndCityData } from "@/app/[profileId]/page"
import Cards from "../../../../../../components/Card"
import Link from "next/link"

async function getProfilesByCity(cityId: string) {
	const response = await fetch(`http://localhost:3007/search/profiles/city/${cityId}`,
		{ cache: 'no-store' })
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
}


export default async function cityDetails({
	params,
}: {
	params: { cityId: string, cityName: string, stateName: string, stateId: string }
}) {


	const decodStateName = decodeURIComponent(params.stateName)
	const decodCityName = decodeURIComponent(params.cityName)

	const profiles = await getProfilesByCity(params.cityId)
	const listProfiles = profiles.profiles.map((profile: profileProps) => (
		<Cards key={profile.id} profile={profile} />
	))
	// console.log(listProfiles)
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
							<Link href={`/estados/${params.stateName}/${params.stateId}`} className="ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
								{decodStateName}
							</Link>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
							</svg>
							<a href="#" className="ms-1 text-md sm:text-sm font-medium text-blue-500 md:ms-2">{decodCityName}</a>
						</div>
					</li>
				</ol>
			</nav>

			<h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-balance mb-10 mt-4">
				Lavagens e estéticas automotivas em <span className="text-3xl sm:text-4xl font-extrabold text-blue-500">{decodCityName}, {decodStateName}</span>
			</h1>

			<div className="mb-10">
				{/* Adicionar 'ordenar e filtrar' */}
			</div>

			<div>
				{!listProfiles.length ?
					<div className="w-full text-center">
						<h2 className="text-1xl sm:text-2xl font-semibold text-gray-600 my-40">
							Nenhuma lavagem ou estética automotiva encontrada.
						</h2>
					</div>
					:
					<ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:mr-20 mb-10 ml-2 mr-4">
						{listProfiles}
					</ul>
				}
			</div>
		</div>
	)
}