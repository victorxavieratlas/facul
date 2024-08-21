"use client"
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileForm from "../../components/ProfileForm";
import { ClienteContext } from "../../context/ClienteContext"

interface ProfileData {
    id: number;
    phone?: string;
    images?: [{ url: string }];
    name: string;
    startDay: string;
    finalDay: string;
    minPrice: number;
    maxPrice: number;
    bio: string;
}

export default function Panel() {
    const router = useRouter();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const { mudaLogin } = useContext(ClienteContext)

    useEffect(() => {
        if (!Cookies.get("x-access-token") || !Cookies.get("user_login_id") || !Cookies.get("x-profile-id")) {
            router.replace("/entrar");
            return;
        } else {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: Number(Cookies.get("user_login_id")) || 0, userName: Cookies.get("x-user-name") || "" })
        }

        async function getProfile(profileId: string) {
            const response = await fetch(`http://localhost:3007/profiles/${profileId}`, { cache: 'no-store' });
            const data = await response.json();
            setProfileData(data.data);
        }

        const profileId = Cookies.get("x-profile-id");
        if (profileId) {
            getProfile(profileId);
        }
    }, [router]);

    if (!profileData) {
        return <div className="m-96 p-96">Carregando...</div>;
    }

    return (
        <div className="sm:ml-48 sm:mr-48 mt-4">
            {!profileData.phone ?
                <div className="my-10 items-center justify-between w-full text-left">
                    <ProfileForm profileIncomplete={profileData}/>
                </div>
                :
                <div className="max-w-full min-w-full">
                    {profileData.images && profileData.images[0] ? 
                    <img className="object-cover h-96 w-full" src={profileData.images[0].url} alt="" />
                    :
                    // Imagem default
                    <></>
                    }
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{profileData.name}</h5>
                        <p className="mb-3 font-normal text-gray-700">De {profileData.startDay} à {profileData.finalDay}</p>
                        <p className="mb-3 font-normal text-gray-700">De R${profileData.minPrice} à R${profileData.maxPrice}</p>
                        <button className="inline-flex items-center min-w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <p className="w-full text-center">Ver telefone</p>
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        <h3 className="mt-4 sm:mt-10 ">Descrição de {profileData.name}</h3>
                        <p className="mb-3 font-normal text-gray-700">{profileData.bio}</p>
                    </div>
                    {/* Accordion aqui */}
                </div>
            }
        </div>
    );
}
