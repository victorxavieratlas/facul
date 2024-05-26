export default function cityDetails({
	params,
}: {
	params: {cityId: string, name: string}
}) {
	return (
		<div>
			<p>cidade {params.cityId}</p>
		</div>
	)
}