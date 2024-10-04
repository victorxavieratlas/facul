'use client'
import { useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../../context/ClienteContext"
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
	subsets: ['latin'],
})

interface loginInput {
    email: string
    password: string
}

export default function Login({
	params,
}: {
	params: { email: string }
}) {
    const { register, handleSubmit, setFocus } = useForm<loginInput>()
    const { mudaLogin } = useContext(ClienteContext)
    const router = useRouter()

    useEffect(() => {
        if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: Number(Cookies.get("user_login_id")) || 0, userName: Cookies.get("x-user-name") || "" })
        } else {
            setFocus("email")
        }
    }, [])

    async function emailVerify(data: loginInput) {
        const response = await fetch("http://localhost:3007/users/generate-code/email", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: data.email })
        })
        const user = await response.json()
        console.log(user.data.email)
        if (response.status == 200) {
            // const user = await response.json()
            // console.log(user)

            router.push(`confirmar-email/${user.data.email}`)
        } else {
            toast.error("Erro... aqui")
            setFocus("email")
        }
    }

    return (
        <div className="sm:mx-48 mt-20 flex justify-center min-w-96 mb-96">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(emailVerify)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Digite o email cadastrado</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu email</label>
                        <input type="email" id="email" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="email@email.com"
                            required {...register("email")} />
                    </div>
                    <p>Um código será enviado ao seu email.</p>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enviar</button>
                </form>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}