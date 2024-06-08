'use client'
import { useEffect } from "react"
import Cookies from "js-cookie"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"


export default async function Panel({
    params
}: {
    params: { userId: string },
}) {
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("x-access-token") && !Cookies.get("user_login_id")) {
            router.replace("/")
        }
    }, [])

    return (
        <div className="ml-48 mr-48 mt-20 mb-20 flex justify-center">
            <h1>painel do user {params.userId}</h1>
        </div>
    )
}

// fazer depois página de estados