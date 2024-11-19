import Link from "next/link"
import Image from "next/image"
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ServicesProfileAccordion from "../components/ServicesProfileAccordion";
import { slugify } from "../utils/slugify";
import Skeleton from '../components/Skeleton';
import ContactButton from "../components/ContactButton";
import ContactButton2 from "../components/ContactButton2";

export interface ProfileData {
	id: number;
	phone?: string;
	images?: [{ url: string }];
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
	name: string;
	startDay: string;
	finalDay: string;
	minPrice: number;
	maxPrice: number;
	bio: string;
	openHour: string;
	closeHour: string;
}

interface Service {
	id: number;
	title: string;
	description: string;
	value: string;
	time: string;
}

interface State {
	id: number;
	name: string;
}

interface City {
	id: number;
	name: string;
	stateId: number;
	uf: string;
}

export default async function Panel({ params }: { params: { profileId: string } }) {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	// Fetch profile data
	const profileResponse = await fetch(`${apiBaseUrl}/profiles/${params.profileId}`, { cache: 'no-store' });
	const profileJson = await profileResponse.json();
	const profileData: ProfileData = profileJson.data;

	// Check for missing fields and redirect
	const missingFields =
		!profileData.name ||
		!profileData.bio ||
		!profileData.profileLocation;

	if (missingFields) {
		const userId = cookies().get('user_login_id')?.value;
		redirect(`/painel/${userId}`);
	}

	// Fetch services
	const servicesResponse = await fetch(`${apiBaseUrl}/services/${params.profileId}`);
	const services: Service[] = await servicesResponse.json();

	// Fetch state and city data
	let stateData: State | null = null;
	let cityData: City | null = null;

	if (profileData.profileLocation && profileData.profileLocation.length > 0) {
		const stateId = profileData.profileLocation[0].stateId;
		const cityId = profileData.profileLocation[0].cityId;

		const stateResponse = await fetch(`${apiBaseUrl}/search/state/${stateId}`);
		stateData = await stateResponse.json();

		const cityResponse = await fetch(`${apiBaseUrl}/search/city/${cityId}`);
		cityData = await cityResponse.json();
	}

	if (!profileData || !stateData || !cityData) {
		return <Skeleton />; // Replace with your Skeleton component
	}

	const cityId = cityData.id;
	const cityName = cityData.name;
	const stateUf = cityData.uf;
	const stateSlug = slugify(stateData.name);
	const citySlug = slugify(cityData.name);

	return (
		<div className="sm:ml-64 sm:mr-64 mt-4">
			<div className="w-full">
				<nav className="pl-3 lg:mb-1 mt-4 flex" aria-label="Breadcrumb">
					<ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
						<li className="inline-flex items-center ml-1">
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
								<Link href={`/estados/${stateSlug}/${stateData.id}`} className="ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
									{stateData.name}
								</Link>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
								</svg>
								<Link href={`/estados/${stateSlug}/${stateData.id}/cidades/${citySlug}/${cityId}`} className="ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
									{cityName}
								</Link>
							</div>
						</li>
						<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
						</svg>
						<li className="inline-block ml-0">
							<div className="flex items-center">
								<p className="lg:ms-1 text-md sm:text-sm font-medium text-blue-500 md:ms-2">Lavagens e estéticas automotivas</p>
							</div>
						</li>
					</ol>
				</nav>
				<h1 className="w-full mb-2 p-4 pl-4 text-3xl font-extrabold text-gray-700">{profileData.name}<span className="block lg:inline text-blue-500"> <span className="text-gray-700">em</span> {cityName} - {stateUf}</span></h1>
			</div>
			<div className="max-w-full min-w-full">
				{profileData.images && profileData.images[0] ?
					<Image className="object-cover h-96 w-full rounded-t-lg" src={profileData.images[0].url} alt="" width={800} height={600} /> : <></>
				}
				<div className="p-5 pt-4 mb-6 shadow rounded-b-lg">
					<h2 className="mb-3 text-2xl font-semibold text-gray-600">{profileData.name}</h2>
					{/* Localização */}
					{profileData.profileLocation && (
						<p className="text-sm text-gray-600 flex items-center mb-1.5">
							<svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
								<path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
								<path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
							</svg>
							Zona {profileData.profileLocation[0].zone.name}, {profileData.profileLocation[0].neighborhood.name} - {profileData.profileLocation[0].address}, {profileData.profileLocation[0].addressNumber}
						</p>
					)}

					{/* Dias e Horários de Funcionamento */}
					<p className="text-sm text-gray-600 flex items-center mb-1.5">
						<svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
							<path d="M17 2V5M7 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.5 8.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M9 15.5C9 15.5 10.5 16 11 17.5C11 17.5 13.1765 13.5 16 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						{profileData.startDay} - {profileData.finalDay}
					</p>
					<p className="text-sm text-gray-600 flex items-center mb-3">
						<svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
							<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						{profileData.openHour}h - {profileData.closeHour}h
					</p>

					{/* Preço */}
					<p className="text-md text-gray-700 flex items-center my-4">
						<span className="font-semibold text-md mr-1">
							R${profileData.minPrice} - R${profileData.maxPrice}
						</span>
						serviços
					</p>

					{/* Botão de ação */}
					<div className="w-full flex justify-center mt-5">
						<ContactButton phone={String(profileData.phone)} />
					</div>
				</div>
				<ServicesProfileAccordion initialServices={services} profileId={profileData.id} />

				<div className="w-full flex justify-center my-5">
					<ContactButton2 phone={String(profileData.phone)} />
				</div>
				<div className=" w-full p-5 mb-6 shadow rounded-lg">
					<h3 className="font-semibold text-gray-500">
						<svg className="inline pb-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
							<path d="M3 6H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M3 10H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M13.5 10L21 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M3 14H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M10 14H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M17 14H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M3 18H5.11765M8.29412 18H10.4118M13.5882 18H15.7059M18.8824 18H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
						</svg>
						Apresentação de <p className="inline font-bold text-blue-500">{profileData.name}
						</p>
					</h3>
					<div className="flex items-start w-full px-10">
						<p className="my-6 font-normal text-gray-700">{profileData.bio}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
