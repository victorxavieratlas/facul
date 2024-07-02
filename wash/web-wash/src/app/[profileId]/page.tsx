// import Profile from "../components/Profile"

import Profile from "../components/Profile"

async function getProfileById(profileId: string) {
	const response = await fetch(`http://localhost:3007/profiles/${profileId}`,
		{ cache: 'no-store' })
	const data = await response.json()
	return data
}

export async function getStateAndCityData(stateId: string, stateName: string, cityId: string, cityName: string) {
	const stateAndCityData = {
		stateId,
		stateName,
		cityId,
		cityName
	}
	return stateAndCityData
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
	images: [{
		url: string
		published: boolean
	}]
}

export default async function profileDetails({
	params
}: {
	params: { profileId: string },
}) {


	// const decodStateName = decodeURIComponent(params.stateName)
	// const decodCityName = decodeURIComponent(params.cityName)

	const profile = await getProfileById(params.profileId)
	const profileData = profile.data

	// console.log(profile)
	return (
		<div className="sm:ml-48 sm:mr-48 mt-4">

			<div className="max-w-full min-w-full">
				{profileData.images[0] ?
					<img className="object-cover h-96 w-full" src={profileData.images[0].url} alt="" />
					:
					// Imagem default
					<></>
				}
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{profileData.name}</h5>
					<p className="mb-3 font-normal text-gray-700">De {profileData.startDay} à {profileData.finalDay}</p>
					<p className="mb-3 font-normal text-gray-700">De R${profileData.minPrice} à R${profileData.maxPrice}</p>
					<a href="#" className="inline-flex items-center min-w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
						<p className="w-full text-center">Ver telefone</p>
						<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
						</svg>
					</a>
					<h3 className="mt-4 sm:mt-10 ">Descrição de {profileData.name}</h3>
					<p className="mb-3 font-normal text-gray-700">{profileData.bio}</p>
				</div>
			</div>
		</div>
	)
}

// fazer depois página de estados