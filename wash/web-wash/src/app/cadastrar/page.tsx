'use client'
import { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../context/ClienteContext"
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
    subsets: ['latin'],
    preload: true
})

interface RegisterInput {
    email: string
    password: string
    confirmPassword: string
    name: string
}

export default function Login() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { register, handleSubmit, setFocus, watch } = useForm<RegisterInput>()
    const { mudaLogin } = useContext(ClienteContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" })
        } else {
            setFocus("email")
        }
    }, [])

    useEffect(() => {
        if (loading) {
            window.scrollTo(0, 0);
        }
    }, [loading]);

    async function registerVerify(data: RegisterInput) {
        setLoading(true)
        try {
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

                const createUserResponse = await fetch(`${apiBaseUrl}/users`, {
                    cache: 'no-store',
                    method: "POST",
                    headers: { 
                        "Content-type": "application/json"
                     },
                    body: JSON.stringify({ email: data.email, password: data.password, name: data.name })
                })

                if (createUserResponse.status == 201) {
                    const user = await createUserResponse.json()
                    const createProfileResponse = await fetch(`${apiBaseUrl}/profiles`, {
                        cache: 'no-store',
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            userId: user.data.userId,
                            name: user.data.userName
                        })
                    })
                    if (createProfileResponse.status == 201) {
                        const profile = await createProfileResponse.json()
                        Cookies.set("x-profile-id", profile.data.id)

                        const createSessionResponse = await fetch(`${apiBaseUrl}/login`, {
                            cache: 'no-store',
                            method: "POST",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ email: data.email, password: data.password })
                        })

                        if (createSessionResponse.status == 201) {
                            const userSession = await createSessionResponse.json()
                            Cookies.set("user_login_id", userSession.userId)
                            Cookies.set("x-access-token", userSession.token)
                            Cookies.set("x-user-name", userSession.userName)

                            mudaLogin({ userId: String(user.data.userId), userName: user.data.userName })
                            router.push(`/painel/${user.data.userId}`)
                        } else {
                            const deleteUserResponse = await fetch(`${apiBaseUrl}/users/${user.id}`, {
                                cache: 'no-store',
                                method: "DELETE",
                                headers: { "Content-type": "application/json" }
                            })

                            if (deleteUserResponse.status == 200) {

                                const deleteProfileResponse = await fetch(`${apiBaseUrl}/profiles/${profile.data.id}`, {
                                    cache: 'no-store',
                                    method: "DELETE",
                                    headers: { "Content-type": "application/json" }
                                })

                                if (deleteProfileResponse.status == 200) {
                                    setLoading(false)
                                    toast.error("Ocorreu um erro! Cadastre novamente")
                                    setFocus("email")
                                } else {
                                    setLoading(false)
                                    toast.error("Ocorreu um erro! Entre em contato com o suporte. Erro: 4243")
                                    setFocus("email")
                                }
                            } else {
                                setLoading(false)
                                toast.error("Ocorreu um erro! Entre em contato com o suporte. Erro: 4242")
                                setFocus("email")
                            }
                        }
                    } else {
                        const deleteUserResponse = await fetch(`${apiBaseUrl}/users`, {
                            cache: 'no-store',
                            method: "DELETE",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ id: user.id })
                        })

                        if (deleteUserResponse.status == 200) {
                            toast.error("Ocorreu um erro! Cadastre novamente")
                            setFocus("email")
                        }
                        setLoading(false)
                        Cookies.remove("user_login_id")
                        Cookies.remove("x-access-token")
                        Cookies.remove("x-user-name")
                        Cookies.remove("x-profile-id")
                    }
                } else {
                    setLoading(false)
                    toast.error("E-mail já existe ou digite um email válido.")
                    setFocus("email")
                }
        } catch (error) {
            console.error("Erro ao registrar:", error)
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
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <p className="mt-4 text-lg font-semibold">Enviando informações...</p>
                    </div>
                </div>
            ) : (
                <div className="sm:mx-48 mt-20 mb-20 flex justify-center min-w-96">
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                        <form className="space-y-6"
                            onSubmit={handleSubmit(registerVerify)}>
                            <h5 className="text-xl font-medium text-gray-900 text-center">Cadastre-se grátis na <span className={`text-2xl font-bold tracking-wide text-balance whitespace-nowrap text-blue-500 ${fredoka.className}`}> lavar auto</span></h5>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Digite seu e-mail</label>
                                <input type="email" id="email" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="email@email.com"
                                    required {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Digite sua senha</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("password")} />
                            </div>

                            <div className="mb-10">
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirme sua senha</label>
                                <input type="password" id="confirm-password" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="********"
                                    required {...register("confirmPassword")} />
                                <ul className="ml-4 mt-3 space-y-1 font-semibold">
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

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Digite o nome da estética automotiva</label>
                                <input type="string" id="name" placeholder="Lavar Auto..." className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("name")} />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cadastrar</button>
                            <div className="text-sm font-medium text-gray-500">
                                Já tem conta? <a href="/entrar" className="text-blue-500 hover:underline">Entrar na conta</a>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Toaster richColors position='top-right' />
        </div>
    )
}
