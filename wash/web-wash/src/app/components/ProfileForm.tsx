'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { stateProps } from "../page"
import { Toaster, toast } from 'sonner'

import Link from "next/link"

interface ProfilePanelInput {
    id: number
    bio: string
    phone: string
    startDay: string
    finalDay: string
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


    async function EditProfile(profile: ProfilePanelInput) {
        const profileUpdated = await fetch(`http://localhost:3007/profiles/${profileIncomplete.id}`, {
            cache: 'no-store',
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    bio: profile.bio, 
                    phone: profile.phone,
                    startDay:  profile.startDay,
                    finalDay:  profile.finalDay,
                    minPrice:  profile.minPrice,
                    maxPrice:  profile.maxPrice,
                    cityId: profile.cityId
                })
        })

        // console.log(response)
        if (profileUpdated.status == 200) {
            const profile = await profileUpdated.json()

            console.log(profile)

            router.push(`/painel/${profile.userId}`)
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
                        <label htmlFor="cityId" className="block mb-2 text-sm font-medium text-gray-900">Escolha a sua cidade</label>
                        <input type="string" id="cityId" placeholder="1100114" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("cityId")} />
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Completar</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileForm
