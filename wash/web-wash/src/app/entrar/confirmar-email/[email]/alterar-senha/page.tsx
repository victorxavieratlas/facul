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
    preload: true
})

interface changePassword {
    email: string,
    password: string,
    confirmPassword: string
}

export default function ChangePassword({
    params,
}: {
    params: { email: string }
}) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URLL;
    const { register, handleSubmit, setFocus, watch } = useForm<changePassword>()
    const { mudaLogin } = useContext(ClienteContext)
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("x-email-user")) {
            router.replace(`/`)
        }
        if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" })
        } else {
            setFocus("password")
        }
    }, [])

    async function changePassword(data: changePassword) {
        if (data.password !== data.confirmPassword) {
            toast.error("As senhas não coincidem!")
            return
        }
        if (!hasMinLength) {
            toast.error("A senha deve ter no mínimo 8 caracteres!")
            return
        }
        if (!hasLowerCase) {
            toast.error("A senha deve conter letra(s) minúscula(s)!")
            return
        }
        if (!hasUpperCase) {
            toast.error("A senha deve conter letra(s) maiúscula(s)!")
            return
        }
        if (!hasNumber) {
            toast.error("A senha deve conter número(s)!")
            return
        }
        if (!hasSymbol) {
            toast.error("A senha deve conter símbolo(s)!")
            return
        }
        const response = await fetch(`${apiBaseUrl}/users/change/user/password`, {
            cache: 'no-store',
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: decodeURIComponent(params.email), password: data.password })
        })

        if (response.status == 200) {
            Cookies.remove("x-email-user")
            router.replace(`/entrar`)
        } else {
            toast.error("Erro... Ao alterar a senha!")
            setFocus("password")
        }
    }

    const password = watch("password")
    const confirmPassword = watch("confirmPassword")

    const hasMinLength = password?.length >= 8
    const hasLowerCase = /[a-z]/.test(password || '')
    const hasUpperCase = /[A-Z]/.test(password || '')
    const hasNumber = /[0-9]/.test(password || '')
    const hasSymbol = /[.!?#$]/.test(password || '')

    return (
        <div className="sm:mx-48 mt-20 flex justify-center min-w-96 mb-96">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(changePassword)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Digite o código recebido por email</h5>
                    <div className="mb-8">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Sua nova senha</label>
                        <input type="password" id="password" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="********"
                            required {...register("password")} />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirmar nova senha</label>
                        <input type="password" id="confirm-password" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="********"
                            required {...register("confirmPassword")} />
                        <ul className="ml-4 mt-5 space-y-1 font-semibold">
                            <li className={`text-sm ${password || confirmPassword ? (password === confirmPassword ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - As senhas devem ser iguais
                            </li>
                            <li className={`text-sm ${password ? (hasMinLength ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - Mínimo 8 caracteres
                            </li>
                            <li className={`text-sm ${password ? (hasLowerCase ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - Letra(s) minúscula(s): a-z
                            </li>
                            <li className={`text-sm ${password ? (hasUpperCase ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - Letra(s) maiúscula(s): A-Z
                            </li>
                            <li className={`text-sm ${password ? (hasNumber ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - Número(s): 0-9
                            </li>
                            <li className={`text-sm ${password ? (hasSymbol ? 'text-green-500' : 'text-red-500') : 'text-gray-400'}`}>
                                - Símbolo(s): .!?#$
                            </li>
                        </ul>
                    </div>
                    <button type="submit" className="w-full mt-12 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Alterar senha</button>
                </form>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}