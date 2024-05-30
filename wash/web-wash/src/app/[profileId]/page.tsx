import Profile from "../components/Profile"

async function getProfilesById(profileId: string) {
	const response = await fetch(`http://localhost:3007/search/profiles/city/${cityId}`,
		{ cache: 'no-store' })
	const data = await response.json()
	return data
}

export default async function profileDetails({
	params
}: {
	params: { profileId: string },
}) {

	// const profile = await Profile(params.profileId)
	return (
		<div>
			<p>profile {params.profileId}</p>
		</div>
	)
}

// fazer depois página de estados