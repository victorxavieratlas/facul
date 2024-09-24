import ProfileEditDetailsForm from "@/app/components/ProfileEditDetailsForm"
import { profile } from "console"

interface ProfileId {
    profileId: number;
}

export default async function editDetails({
	params,
}: {
	params: { profileId: ProfileId }
}) {

	return (
		<div className="sm:ml-48 sm:mr-48 mt-4">
			<ProfileEditDetailsForm profileId={params.profileId} /> :
		</div>
	)
}

// fazer depois página de estados