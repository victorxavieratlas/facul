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
	const cities = await getCitiesByState(params.id)

	const listCities = cities.data.map((city: cityProps) => (
		<Cities key={city.id} city={city} state={state} />
	))

	return (
		<div>
			<p>lista das cidades</p>
			{listCities}
		</div>
	)
}