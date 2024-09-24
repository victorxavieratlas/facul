"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileForm from "../components/ProfileForm";
import { ClienteContext } from "../context/ClienteContext";
import ServicesProfileAccordion from "../components/ServicesProfileAccordion";

interface ProfileData {
	id: number;
	phone?: string;
	images?: [{ url: string }];
	cities: [{ id: number, name: string, stateId: number, uf: string }];
	states: [{ id: number, name: string }];
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

export async function getStateAndCityData(stateId: string, stateName: string, cityId: string, cityName: string) {
	const stateAndCityData = {
		stateId,
		stateName,
		cityId,
		cityName
	}
	return stateAndCityData
}

export default function Panel({
	params
}: {
	params: { profileId: string }
}) {
	const router = useRouter();
	const [profileData, setProfileData] = useState<ProfileData | null>(null);
	const [stateData, setStateData] = useState<State | null>(null);
	const [services, setServices] = useState<Service[]>([]);
	const { mudaLogin } = useContext(ClienteContext);

	useEffect(() => {
		if (Cookies.get("x-access-token") || Cookies.get("user_login_id") || Cookies.get("x-profile-id")) {
			mudaLogin({ userId: Number(Cookies.get("user_login_id")) || 0, userName: Cookies.get("x-user-name") || "" });
		}

		getProfile(params.profileId)
		fetchServices(params.profileId)
	}, [router]);

	async function getProfile(profileId: string) {
		const response = await fetch(`http://localhost:3007/profiles/${profileId}`, { cache: 'no-store' });
		const data = await response.json();
		setProfileData(data.data);

		// Quando o profileData é obtido, buscamos as informações do estado
		if (data.data.cities && data.data.cities.length > 0) {
			getState(data.data.cities[0].stateId);
		}
	}

	async function fetchServices(profileId: string) {
		const response = await fetch(`http://localhost:3007/services/${profileId}`);
		const data = await response.json();
		setServices(data);
	}

	async function getState(stateId: number) {
		const response = await fetch(`http://localhost:3007/search/state/${stateId}`);
		const state = await response.json();
		setStateData(state);
	}
	if (!profileData || !stateData) {
		return <div className="m-96 p-96">Carregando...</div>;
	}



	const cityId = profileData.cities[0].id
	const cityName = profileData.cities[0].name
	const stateUf = profileData.cities[0].uf
	// const stateName = profileData.states[0].name


	//USAR OS DADOS DO ESTADO NO HTML A BAIXO

	return (
		<div className="sm:ml-48 sm:mr-48 mt-4">
			<div>
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
								<Link href={`/estados/${stateData.name}/${stateData.id}`} className="ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
									{stateData.name}
								</Link>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
								</svg>
								<Link href={`/estados/${stateData.name}/${stateData.id}/cidades/${cityName}/${cityId}`} className="ms-1 text-md sm:text-sm font-medium text-gray-700 hover:text-blue-500 md:ms-2">
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
				<h1 className="mb-2 p-4 pl-4 text-3xl font-extrabold text-balance text-gray-600">{profileData.name} em <span className="block lg:inline text-blue-500">{cityName} - {stateUf}</span></h1>
			</div>
			<div className="max-w-full min-w-full">
				{profileData.images && profileData.images[0] ?
					<img className="object-cover h-96 w-full rounded-t-lg" src={profileData.images[0].url} alt="" /> : <></>
				}
				<div className="p-5 mb-6 shadow rounded-b-lg">
					<h2 className="mb-2 text-2xl font-bold text-gray-600">{profileData.name}</h2>
					<p className="mt-6 mb-3 font-normal text-gray-700">
						<svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
							<path d="M14 2.22179C13.3538 2.09076 12.6849 2.02197 12 2.02197C6.47715 2.02197 2 6.49421 2 12.011C2 17.5277 6.47715 22 12 22C17.5228 22 22 17.5277 22 12.011C22 11.3269 21.9311 10.6587 21.8 10.0132" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M12 9.01428C10.8954 9.01428 10 9.68512 10 10.5126C10 11.3401 10.8954 12.011 12 12.011C13.1046 12.011 14 12.6819 14 13.5093C14 14.3368 13.1046 15.0077 12 15.0077M12 9.01428C12.8708 9.01428 13.6116 9.43123 13.8862 10.0132M12 9.01428V8.01538M12 15.0077C11.1292 15.0077 10.3884 14.5908 10.1138 14.0088M12 15.0077V16.0066" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M21.9951 2L17.8193 6.17362M16.9951 2.52119L17.1133 5.60928C17.1133 6.33713 17.5484 6.79062 18.3409 6.84782L21.465 6.99451" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						De R${profileData.minPrice} à R${profileData.maxPrice}
					</p>
					<p className="mb-3 font-normal text-gray-700">
						<svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
							<path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						De {profileData.startDay} à {profileData.finalDay}
					</p>
					<p className="mb-3 font-normal text-gray-700">
						<svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
							<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						Das {profileData.openHour}h às {profileData.closeHour}h
					</p>

					{/* <p className="mb-3 font-normal text-gray-700">
						<svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
							<path d="M18.5 6C18.4191 4.58055 18.197 3.67665 17.5877 3.02513C16.629 2 15.086 2 12 2C8.91399 2 7.37098 2 6.41229 3.02513C5.80298 3.67665 5.58092 4.58055 5.49999 6M18.5 18C18.4191 19.4194 18.197 20.3233 17.5877 20.9749C16.629 22 15.086 22 12 22C8.91399 22 7.37098 22 6.41229 20.9749C5.80298 20.3233 5.58092 19.4194 5.49999 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
							<path d="M8.99999 2L9.08899 2.53402C9.28187 3.69129 9.37831 4.26993 9.77518 4.62204C10.1892 4.98934 10.7761 5 12 5C13.2238 5 13.8108 4.98934 14.2248 4.62204C14.6217 4.26993 14.7181 3.69129 14.911 2.53402L15 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
							<path d="M11 19H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.99999 8.5C3.99999 8.5 4.99999 8.846 4.99999 9.8125C4.99999 10.779 3.99999 11.0335 3.99999 12C3.99999 12.9665 4.99999 13.221 4.99999 14.1875C4.99999 15.154 3.99999 15.5 3.99999 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M20 8.5C20 8.5 19 8.846 19 9.8125C19 10.779 20 11.0335 20 12C20 12.9665 19 13.221 19 14.1875C19 15.154 20 15.5 20 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						Contato: {profileData.phone ?
							profileData.phone
							:
							<></>
						}
					</p> */}
				</div>
				<ServicesProfileAccordion services={services} profileId={profileData.id} updateServices={fetchServices} />
				<div className=" w-full p-5 my-6 shadow rounded-lg">
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
