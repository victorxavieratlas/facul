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
        setFocus("email")
    }, [])

    async function registerVerify(data: RegisterInput) {
        const userResponse = await fetch("http://localhost:3007/users", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: data.email, password: data.password, name: data.name })
        })

        // if (userResponse.status == 201) {
        //     const user = await userResponse.json()

        //     Cookies.set("user_login_id", user.userId)
        //     Cookies.set("x-access-token", user.token)
        //     Cookies.set("x-user-name", user.userName)

        //     console.log(user.userId, user.userName)
        //     //Erro aqui
        //     mudaLogin({userId: Number(user.userId), userName: user.userName})
        //     // console.log(typeof mudaLogin)
        //     router.push(`/painel/${user.userId}`)

        // } else {
        //     toast.error("Erro... Email ou senha incorretos.")
        //     setFocus("email")
        // }

        //login antes de criar o profile

        const profileResponse = await fetch("http://localhost:3007/profiles", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId: userResponse.id })
        })


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