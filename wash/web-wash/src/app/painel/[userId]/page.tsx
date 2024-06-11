'use client'
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"


export default async function Panel({
    params
}: {
    params: { userId: string },
}) {
    const router = useRouter()

    const profileId = Cookies.get("x-profile-id")

    useEffect(() => {
        if (!Cookies.get("x-access-token") && !Cookies.get("user_login_id") && !Cookies.get("x-profile-id")) {
            router.replace("/entrar")
        }
    }, [])

    async function getProfile(profileId: string | undefined) {
        const response = await fetch(`http://localhost:3007/profiles/${profileId}`,
            { cache: 'no-store' })
        const profile = await response.json()
        return profile
    }

    const profile = await getProfile(profileId)
    const profileData = profile.data

    return (
        <div className="sm:ml-48 sm:mr-48 mt-4">

            {profileData.phone != null ?
                <div className="max-w-full min-w-full">
                    <img className="object-cover h-96 w-full" src={profileData.images[0].url} alt="" />
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
                :
                <div className=" sm:mr-20 my-40 items-center justify-between w-full text-center">
                    <h1 className="text-1xl sm:text-3xl font-extrabold text-gray-800 text-balance">
						<span className="clear-left block mb-4">Clique no botão a baixo e</span> <span className="font-extrabold text-blue-500">Complete seu perfil!</span>
					</h1>
                    <button type="button" className="mt-10 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Completar perfil</button>
                </div>
            }
        </div>
    )
}
