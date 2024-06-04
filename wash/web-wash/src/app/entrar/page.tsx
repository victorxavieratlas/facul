'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface loginInput {
    email: string
    password: string
}

export default async function Login({
    params
}: {
    params: { userId: string },
}) {
    const { register, handleSubmit, setFocus } = useForm<loginInput>()

    const router = useRouter()

    useEffect(() => {
        setFocus("email")
    }, [])

    async function loginVerify(data: loginInput) {
        const response = await fetch("http://localhost:3007/login", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: data.email, password: data.password })
        })

        console.log(response)
        if (response.status == 201) {
            const user = await response.json()

            Cookies.set("user_login_id", user.userId)
            Cookies.set("x-access-token", user.token)

            router.push(`/painel/${user.userId}`)

        } else {
            toast.error("Erro... Email ou senha incorretos.")
            setFocus("email")
        }
    }

    return (
        <div className="ml-48 mr-48 mt-20 mb-20 flex justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(loginVerify)}>
                    <h5 className="text-xl font-medium text-gray-900">Acessar conta na <span className="text-2xl text-blue-500">CarWash</span></h5>
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
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Lembrar-me</label>
                        </div>
                        <a href="#" className="ms-auto text-sm text-blue-500 hover:underline">Esqueci minha senha</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                    <div className="text-sm font-medium text-gray-500">
                        Não tem conta? <a href="#" className="text-blue-500 hover:underline">Criar nova conta</a>
                    </div>
                </form>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}