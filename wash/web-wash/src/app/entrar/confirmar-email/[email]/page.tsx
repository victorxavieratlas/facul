'use client'
import { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ClienteContext } from "../../../context/ClienteContext"
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
    subsets: ['latin'],
})

interface codeVerify {
    email: string,
    code: number
}

export default function ConfirmCode({
    params,
}: {
    params: { email: string }
}) {
    const { register, handleSubmit, setFocus } = useForm<codeVerify>()
    const { mudaLogin } = useContext(ClienteContext)
    const router = useRouter()

    const [timer, setTimer] = useState(30)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (!Cookies.get("x-email-user")) {
            router.replace(`/`)
        }
        if (Cookies.get("x-access-token") && Cookies.get("user_login_id")) {
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
            mudaLogin({ userId: Number(Cookies.get("user_login_id")) || 0, userName: Cookies.get("x-user-name") || "" })
        } else {
            setFocus("code")
        }

        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev === 1) {
                    clearInterval(countdown)
                    setIsDisabled(false)
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(countdown)
    }, [])

    async function codeVerify(data: codeVerify) {
        const response = await fetch("http://localhost:3007/users/validate-code/email", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: decodeURIComponent(params.email), code: data.code })
        })

        if (response.status == 200) {
            router.push(`${decodeURIComponent(params.email)}/alterar-senha`)
        } else {
            toast.error("Erro... AQUI")
            setFocus("code")
        }
    }

    async function generateNewCode() {
        const response = await fetch("http://localhost:3007/users/generate-code/email", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: decodeURIComponent(params.email) })
        })

        if (response.status == 200) {
            setIsDisabled(true)
            setTimer(30)
            const countdown = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(countdown)
                        setIsDisabled(false)
                    }
                    return prev - 1
                })
            }, 1000)
            toast.info("Novo código enviado!")
        } else {
            toast.error("Erro... aqui")
            setFocus("code")
        }
    }

    return (
        <div className="sm:mx-48 mt-20 flex justify-center min-w-96 mb-96">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6"
                    onSubmit={handleSubmit(codeVerify)}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Digite o código recebido por email</h5>
                    <div className="mb-10">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900">Seu código</label>
                        <input type="number" id="code" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="000000"
                            required {...register("code")} />
                    </div>
                    <button type="submit" className="w-full mt-10 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirmar</button>
                </form>
                <button
                    onClick={generateNewCode}
                    type="button"
                    className={`w-full mt-6 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'}`}
                    disabled={isDisabled}>
                    {isDisabled ? `Reenviar código ${timer}s` : 'Reenviar código'}
                </button>
            </div>
            <Toaster richColors position='top-right' />
        </div>
    )
}