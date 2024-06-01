'use client'
import { useEffect } from "react"
import Cookies from "js-cookie"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"



async function tokenVerify() {
    const router = useRouter()

    const token = Cookies.get("x-access-token")
    const userId = Cookies.get("user_login_id")
    const response = await fetch(`http://localhost:3007/profiles/${userId}`, {
        cache: 'no-store',
        headers: {
            "Content-type": "application/json",
            "x-access-token": String(token)
        }
    })

    // console.log(response
    if (response.status == 400) {

        router.push(`/entrar`)
        toast.error("Área restrita! Entre na sua conta para continuar.")
    } else if (response.status == 401) {
        router.push(`/entrar`)
        toast.error("Área restrita! Entre na sua conta para continuar.")
    } else if (response.status == 200) {
        console.log(response)
    }
}

export default async function Panel({
    params
}: {
    params: { userId: string },
}) {
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("x-access-token") && !Cookies.get("user_login_id")) {
            router.replace("/")
        } else {
            //Validar o token e puxar infos do perfil e user
            // const token = Cookies.get("x-access-token")
            // const userId = Cookies.get("user_login_id")
            // const response = await fetch(`http://localhost:3007/profiles/${userId}`, {
            //     cache: 'no-store',
            //     headers: {
            //         "Content-type": "application/json",
            //         "x-access-token": String(token)
            //     }
            // })

            // // console.log(response
            // if (response.status == 400) {

            //     router.push(`/entrar`)
            //     toast.error("Área restrita! Entre na sua conta para continuar.")
            // } else if (response.status == 401) {
            //     router.push(`/entrar`)
            //     toast.error("Área restrita! Entre na sua conta para continuar.")
            // } else if (response.status == 200) {
            //     console.log(response)
            // }
        }
    }, [])


    return (
        <div className="ml-48 mr-48 mt-20 mb-20 flex justify-center">
            <h1>painel do user {params.userId}</h1>
        </div>
    )
}

// fazer depois página de estados