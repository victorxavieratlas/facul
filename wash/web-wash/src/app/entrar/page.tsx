'use client'
import { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../context/ClienteContext"
import { Fredoka } from "next/font/google";
import Link from 'next/link'

const fredoka = Fredoka({
    subsets: ['latin'],
    preload: true
})

interface loginInput {
    email: string
    password: string
}

export default function Login() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { register, handleSubmit, setFocus } = useForm<loginInput>()
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

    async function loginVerify(data: loginInput) {
        setLoading(true)
        try {
            if (!data.email) {
                toast.error("E-mail é obrigatório!")
                return
            }

            if (!data.password) {
                toast.error("Senha é obrigatória!")
                return
            }

            const response = await fetch(`${apiBaseUrl}/login`, {
                cache: 'no-store',
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password })
            })

            if (response.status == 201) {
                const user = await response.json()
                Cookies.set("user_login_id", user.userId)
                Cookies.set("x-access-token", user.token)
                Cookies.set("x-user-name", user.userName)
                Cookies.set("x-profile-id", user.profileId)

                mudaLogin({ userId: String(user.userId), userName: user.userName })
                // console.log(typeof mudaLogin)
                router.push(`/painel/${user.userId}`)

            } else {
                toast.error("Erro... Email ou senha incorretos.")
                setFocus("email")
            }

        } catch (error) {
            console.error("Erro ao registrar:", error)
        }
    }

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <p className="mt-4 text-lg font-semibold">Validando informações...</p>
                    </div>
                </div>
            ) : (
                <div className="sm:mx-48 mt-20 mb-20 flex justify-center min-w-96">
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                        <form className="space-y-6"
                            onSubmit={handleSubmit(loginVerify)}>
                            <h5 className="text-xl font-medium text-gray-900 text-center">Acessar conta na <span className={`text-2xl text-blue-500 ${fredoka.className}`}> lavar auto</span></h5>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu email</label>
                                <input type="email" id="email" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="email@email.com"
                                    required {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Sua senha</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("password")} />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                                    </div>
                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Lembrar-me</label>
                                </div>
                                <Link href={`/entrar/confirmar-email`} className="ms-auto text-sm text-blue-500 hover:underline">Esqueci minha senha</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                            <div className="text-sm font-medium text-gray-500">
                                Não tem conta? <a href="/cadastrar" className="text-blue-500 hover:underline">Criar nova conta</a>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Toaster richColors position='top-right' />
        </div>
    )
}
