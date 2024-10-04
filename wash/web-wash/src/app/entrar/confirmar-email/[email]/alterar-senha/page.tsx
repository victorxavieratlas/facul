'use client'
import { useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../../../../context/ClienteContext"
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
    subsets: ['latin'],
})

interface changePassword {
    email: string,
    password: string
}

export default function Login({
    params,
}: {
    params: { email: string }
}) {

    console.log(params.email)
    const { register, handleSubmit, setFocus } = useForm<changePassword>()
    const { mudaLogin } = useContext(ClienteContext)
    const router = useRouter()

    useEffect(() => {
        if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: Number(Cookies.get("user_login_id")) || 0, userName: Cookies.get("x-user-name") || "" })
        } else {
            setFocus("password")
        }
    }, [])

    async function changePassword(data: changePassword) {
        const response = await fetch("http://localhost:3007/users/validate-code/email", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: decodeURIComponent(params.email), code: data.password })
        })

        console.log(response.status)
        if (response.status == 200) {
            const user = await response.json()
            console.log(user)
            // Cookies.set("user_login_id", user.userId)
            // Cookies.set("x-access-token", user.token)
            // Cookies.set("x-user-name", user.userName)
            // Cookies.set("x-profile-id", user.profileId)

            // mudaLogin({ userId: Number(user.userId), userName: user.userName })
            // // console.log(typeof mudaLogin)
            router.replace(`/entrar`)

        } else {
            toast.error("Erro... AQUI")
            setFocus("password")
        }
    }

    return (
        <div className="sm:mx-48 mt-20 flex justify-center min-w-96 mb-96">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(changePassword)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Digite o código recebido por email</h5>
                    <div className="mb-10">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Sua nova senha</label>
                        <input type="number" id="password" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="********"
                            required {...register("password")} />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirmar nova senha</label>
                        <input type="number" id="confirm-password" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="********"
                            required {...register("password")} />
                    </div>
                    <button type="submit" className="w-full mt-12 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Alterar senha</button>
                </form>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}