'use client'
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

function Principal() {

  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get("admin_logado_id")) {
      router.replace("/")
    }
  }, [])

  return (
    <h1>Página Principal</h1>
  )
}

export default Principal