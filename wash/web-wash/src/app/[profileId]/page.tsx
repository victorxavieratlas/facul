import Link from "next/link"
import Image from "next/image"
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ServicesProfileAccordion from "../components/ServicesProfileAccordion";
import { slugify } from "../utils/slugify";
import Skeleton from '../components/Skeleton';
import ContactButton from "../components/ContactButton";
import ContactButton2 from "../components/ContactButton2";
import ClientImage from "../components/ClientImage";
import ProfileInfo from "../components/ProfileInfo";

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
		return <Skeleton />;
	}

	const cityId = cityData.id;
	const cityName = cityData.name;
	const stateUf = cityData.uf;
	const stateSlug = slugify(stateData.name);
	const citySlug = slugify(cityData.name);

	return (
		<div className="sm:mx-20 lg:mx-64 mt-4">
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
				{profileData.images && profileData.images[0] ? (
					<ClientImage
						src={profileData.images[0].url}
						alt={`Imagem de perfil de ${profileData.name}` || 'Profile Image'}
					/>
				) : (
					// <div className="h-96 w-full rounded-t-lg bg-gray-200"></div>
					<></>
				)}
				<div className="p-5 pt-4 mb-6 shadow rounded-b-lg">

					<ProfileInfo profileData={profileData} />

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
