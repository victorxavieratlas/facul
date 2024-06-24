'use client'
import { useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../context/ClienteContext"

interface RegisterInput {
    email: string
    password: string
    name: string
}

export default function Login() {
    const { register, handleSubmit, setFocus } = useForm<RegisterInput>()
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

    async function registerVerify(data: RegisterInput) {
        const createUserResponse = await fetch("http://localhost:3007/users", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: data.email, password: data.password, name: data.name })
        })

        if (createUserResponse.status == 201) {
            const user = await createUserResponse.json()

            const createSessionResponse = await fetch("http://localhost:3007/login", {
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

                const createProfileResponse = await fetch("http://localhost:3007/profiles", {
                    cache: 'no-store',
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ userId: userSession.userId })
                })

                if (createProfileResponse.status == 201) {
                    const profile = await createProfileResponse.json()

                    Cookies.set("x-profile-id", profile.data.id)

                    console.log( Number(userSession.userId))
                    mudaLogin({ userId: Number(userSession.userId), userName: userSession.userName })

                    router.push(`/painel/${userSession.userId}`)
                } else {
                    const deleteUserResponse = await fetch("http://localhost:3007/users", {
                        cache: 'no-store',
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ id: user.id })
                    }) //melhorar o deleteUser

                    if (deleteUserResponse.status == 200) {
                        toast.error("Ocorreu um erro! Cadastre novamente")
                        setFocus("email")
                    }

                    Cookies.remove("user_login_id")
                    Cookies.remove("x-access-token")
                    Cookies.remove("x-user-name")
                }

            } else {

                const deleteUserResponse = await fetch("http://localhost:3007/users", {
                    cache: 'no-store',
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ id: user.id })
                }) //melhorar o deleteUser

                if (deleteUserResponse.status == 200) {
                    toast.error("Ocorreu um erro! Cadastre novamente")
                    setFocus("email")
                }
            }

        } else {
            toast.error("Email cadastrado já existe ou digite um email válido.")
            setFocus("email")
        }
    }

    return (
        <div className="ml-48 mr-48 mt-20 mb-20 flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(registerVerify)}>
                    <h5 className="text-xl font-medium text-gray-900">Cadastre-se grátis na <span className="text-2xl text-blue-500">CarWash</span></h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Seu email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com"
                            required {...register("email")} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Sua senha</label>
                        <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("password")} />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome da loja</label>
                        <input type="string" id="name" placeholder="A Melhor Loja" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("name")} />
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cadastrar</button>
                    <div className="text-sm font-medium text-gray-500">
                        Já tem conta? <a href="/entrar" className="text-blue-500 hover:underline">Entrar na conta</a>
                    </div>
                </form>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}