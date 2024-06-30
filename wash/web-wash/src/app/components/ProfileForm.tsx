'use client'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { stateProps } from "../page"
import { Toaster, toast } from 'sonner'

import Link from "next/link"

interface City {
    id: number;
    uf: string;
    name: string;
    stateId: number;
}

interface ProfilePanelInput {
    id: number
    bio: string
    phone: string
    startDay: string
    finalDay: string
    openHour: string
    closeHour: string
    minPrice: number
    maxPrice: number
    cityId: number
}

interface ProfileIncomplete {
    id: number
}

function ProfileForm({ profileIncomplete }: { profileIncomplete: ProfileIncomplete }) {
    const { register, handleSubmit, setFocus } = useForm<ProfilePanelInput>()
    const router = useRouter()

    const [input, setInput] = useState<string>('');
    const [results, setResults] = useState<City[]>([]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (input.length >= 3) {
                console.log(input)
                fetch(`http://localhost:3007/cities/search/${encodeURIComponent(input)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            setResults(data);
                        } else {
                            setResults([]);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching cities:', error);
                        setResults([]); // Limpa os resultados em caso de erro
                    });
            } else {
                setResults([]); // Limpar resultados se o input for menor que 3 caracteres
            }
        }, 300); // Debounce time in milliseconds

        return () => clearTimeout(debounceTimeout);
    }, [input]);


    async function EditProfile(profile: ProfilePanelInput) {
        const profileUpdated = await fetch(`http://localhost:3007/profiles/${profileIncomplete.id}`, {
            cache: 'no-store',
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    bio: profile.bio,
                    phone: profile.phone,
                    startDay: profile.startDay,
                    finalDay: profile.finalDay,
                    openHour: profile.openHour,
                    closeHour: profile.closeHour,
                    minPrice: profile.minPrice,
                    maxPrice: profile.maxPrice,
                    cityId: profile.cityId
                })
        })

        console.log(profileUpdated)
        // console.log(response)
        if (profileUpdated.status == 200) {
            const profile = await profileUpdated.json()

            console.log(profile.data.userId)

            router.refresh()
            // router.replace(`/painel/${profile.data.userId}`)
        } else {
            toast.error("Não foi possível editar ou salvar as informações.")
            setFocus("phone")
        }
    }


    return (
        <div className="max-w bg-white border-none">
            <div className="min-w-full w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(EditProfile)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Complete seu perfil na <span className="text-2xl text-blue-500">CarWash</span></h5>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Seu telefone WhatsApp</label>
                        <input type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="53999999999"
                            required {...register("phone")} />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900">Adicione uma descrição</label>
                        <input type="string" id="bio" placeholder="Conte sobre o seu negócio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-20 p-2.5"
                            required {...register("bio")} />
                    </div>

                    <div>
                        <label htmlFor="minPrice" className="block mb-2 text-sm font-medium text-gray-900">Seu menor preço</label>
                        <input type="decimal" id="minPrice" placeholder="O menor valor dos seus serviços" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("minPrice")} />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium text-gray-900">Seu maior preço</label>
                        <input type="decimal" id="maxPrice" placeholder="O maior valor dos seus serviços" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("maxPrice")} />
                    </div>

                    <div>
                        <label htmlFor="startDay" className="block mb-2 text-sm font-medium text-gray-900">Dia de abetura</label>
                        <input type="string" id="startDay" placeholder="Segunda" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("startDay")} />
                    </div>
                    <div>
                        <label htmlFor="finalDay" className="block mb-2 text-sm font-medium text-gray-900">Dia de fechamento</label>
                        <input type="string" id="finalDay" placeholder="Sexta" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("finalDay")} />
                    </div>

                    <div>
                        <label htmlFor="openHour" className="block mb-2 text-sm font-medium text-gray-900">Horário de abertura</label>
                        <input type="string" id="openHour" placeholder="09:00" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("openHour")} />
                    </div>
                    <div>
                        <label htmlFor="closeHour" className="block mb-2 text-sm font-medium text-gray-900">Horário de fechamento</label>
                        <input type="string" id="closeHour" placeholder="18:00" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("closeHour")} />
                    </div>

                    <div className="flex">
                        <div className="relative w-full mt-10">
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-3 w-full h-14 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                                placeholder="Selecionar cidade"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                required
                                autoComplete="off"
                            />
                            <button type="submit" className="absolute top-0 right-0 p-3 w-14 text-sm font-medium h-full text-white bg-blue-500 rounded-r-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                <svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                    {Array.isArray(results) && results.length > 0 && (
                        <ul className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 absolute w-full max-w-lg bg-white shadow-lg max-h-60 overflow-auto z-50 rounded-lg mr-20 pr-20">
                            {results.map((city) => {
                                return (
                                    <li key={city.id} className="border-b-2 border-gray-200 p-3 cursor-pointer transition duration-200 ease-in-out">
                                        <p 
                                            className="block text-gray-800 hover:text-blue-500">
                                                {city.name} - {city.uf}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {/* 
                    <div>
                        <label htmlFor="cityId" className="block mb-2 text-sm font-medium text-gray-900">Escolha a sua cidade</label>
                        <input type="string" id="cityId" placeholder="1100114" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("cityId")} />
                    </div> */}

                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Completar</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileForm
