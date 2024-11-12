"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileForm from "../../components/ProfileForm";
import { ClienteContext } from "../../context/ClienteContext";
import ServicesAccordion from "../../components/ServicesAccordion";

interface ProfileData {
    id: string;
    phone?: string;
    images?: [{ url: string }];
    profileLocation: [{
        profileId: string,
        cityId: number,
        stateId: number,
        neighborhoodsId: number,
        zone: {
            id: number;
            name: string;
        }
        address: string,
        addressNumber: string,
        addressCEP: string,
        addressComplement: string
    }];
    name: string;
    startDay: string;
    finalDay: string;
    minPrice: number;
    maxPrice: number;
    bio: string;
    openHour: string;
    closeHour: string;
    verified: boolean;
}

interface Service {
    id: number;
    title: string;
    description: string;
    value: string;
    time: string;
}

export default function Panel() {
    const router = useRouter();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const { mudaLogin } = useContext(ClienteContext);

    async function tokenVerify() {
        try {
            const response = await fetch(`http://localhost:3007/token/verify`, {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get("x-access-token")}`
                }
            });

            console.log(response.ok)

            if (response.ok) {
                console.log('Verified token!');
                router.replace(`/painel/${Cookies.get("user_login_id")}`);
                mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" });
            } else {
                Cookies.remove("user_login_id");
                Cookies.remove("x-access-token");
                Cookies.remove("x-user-name");
                Cookies.remove("x-profile-id");
                mudaLogin({ userId: null, userName: "" });
                router.replace("/")

                console.warn('Error verifying token:', response.statusText);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }

    useEffect(() => {
        if (!Cookies.get("x-access-token") || !Cookies.get("user_login_id") || !Cookies.get("x-profile-id")) {
            router.replace("/entrar");
            return;
        } else if (Cookies.get("x-access-token")) {
            tokenVerify()
        }

        if (Cookies.get("x-profile-id")) {
            const profileId = String(Cookies.get("x-profile-id"));
            getProfile(profileId);
            fetchServices(profileId);
        }
    }, [router]);

    // useEffect(() => {
    //     const profileId = Cookies.get("x-profile-id");
    //     console.log(profileId)
    //     if (profileId) {
    //         getProfile(profileId);
    //         fetchServices(profileId);
    //     }
    // }, [router]);

    async function getProfile(profileId: string) {
        try {
            const response = await fetch(`http://localhost:3007/profiles/${profileId}`, { cache: 'no-store' });
            const data = await response.json();
            console.log('API response:', data);

            if (!response.ok) {
                console.log('Error fetching profile:', data.error || response.statusText);
                // Handle the error as needed, e.g., show a message to the user
                return;
            }

            // Ensure data.data exists
            if (data && data.data) {
                setProfileData(data.data);
            } else {
                console.log('No data received from API');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Handle the error as needed
        }
    }

    async function fetchServices(profileId: string) {
        const response = await fetch(`http://localhost:3007/services/${profileId}`);
        const data = await response.json();
        setServices(data);
    }

    if (!profileData) {
        return <div className="m-96 p-96">Carregando...</div>;
    }

    return (
        <div className="mt-4 w-full lg:flex lg:justify-center">
            <div className="mt-4 w-full max-w-2xl">
                {!profileData.phone ?
                    <ProfileForm profileIncomplete={profileData} />
                    :
                    <div className="max-w-full min-w-full">
                        {profileData.verified == false ?
                            <div className="max-w-full min-w-full p-4 mb-4 bg-blue-100 border-2 rounded-lg border-blue-300">
                                <p className="font-bold text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                    Confirmação de e-mail
                                </p>
                                <p className="mx-6 mt-2 font-semibold text-gray-600">
                                    Seja bem-vindo(a) a Lavar Auto!
                                </p>
                                <p className="mx-6 mt-2 font-semibold text-gray-600">
                                    Acesse seu e-mail e clique no link do e-mail enviado pela Lavar Auto. É necessário ter o e-mail confirmado para receber contato de clientes.
                                </p>
                            </div>
                            :
                            <></>
                        }
                        {profileData.images && profileData.images[0] ?
                            <img className="object-cover h-96 w-full rounded-t-lg" src={profileData.images[0].url} alt="" /> : <></>
                        }
                        <div className="p-5 mb-6 shadow rounded-b-lg">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{profileData.name}</h5>
                            <Link href={`/${Cookies.get("x-profile-id")}/editar`}>
                                <button className="float-right px-2 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                                    <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    Editar perfil
                                </button>
                            </Link>
                            <p className="mt-6 mb-3 font-normal text-gray-700">
                                <svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
                                    <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                Zona {profileData.profileLocation[0].zone.name}, {profileData.profileLocation[0].address}, {profileData.profileLocation[0].addressNumber}
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
                            <p className="mb-3 font-normal text-gray-700">
                                <svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
                                    <path d="M14 2.22179C13.3538 2.09076 12.6849 2.02197 12 2.02197C6.47715 2.02197 2 6.49421 2 12.011C2 17.5277 6.47715 22 12 22C17.5228 22 22 17.5277 22 12.011C22 11.3269 21.9311 10.6587 21.8 10.0132" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12 9.01428C10.8954 9.01428 10 9.68512 10 10.5126C10 11.3401 10.8954 12.011 12 12.011C13.1046 12.011 14 12.6819 14 13.5093C14 14.3368 13.1046 15.0077 12 15.0077M12 9.01428C12.8708 9.01428 13.6116 9.43123 13.8862 10.0132M12 9.01428V8.01538M12 15.0077C11.1292 15.0077 10.3884 14.5908 10.1138 14.0088M12 15.0077V16.0066" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M21.9951 2L17.8193 6.17362M16.9951 2.52119L17.1133 5.60928C17.1133 6.33713 17.5484 6.79062 18.3409 6.84782L21.465 6.99451" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                De R${profileData.minPrice} à R${profileData.maxPrice}
                            </p>
                            <p className="mb-3 font-normal text-gray-700">
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
                            </p>
                        </div>
                        <ServicesAccordion services={services} profileId={profileData.id} updateServices={fetchServices} />
                        <div className=" w-full p-5 my-6 shadow rounded-lg mb-20 sm:mb-8">
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
                            <div className="flex items-start w-full px-12">
                                <p className="my-6 font-normal text-gray-700">{profileData.bio}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
