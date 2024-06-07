'use client'
import { ReactNode, createContext, useState } from "react"

interface ClienteProps {
  userId: number | null
  userName: string
}

type ClienteContextData = {
  idClienteLogado: number | null
  nomeClienteLogado: string
  mudaLogin: ({ userId, userName }: ClienteProps) => void
}

// cria um contexto
export const ClienteContext = createContext({} as ClienteContextData)

function ClienteProvider({ children }: { children: ReactNode } ) {
  const [idClienteLogado, setIdClienteLogado] = useState<number|null>(null)
  const [nomeClienteLogado, setNomeClienteLogado] = useState<string>("")

  function mudaLogin({userId, userName}: ClienteProps) {
    setIdClienteLogado(userId)
    setNomeClienteLogado(userName)
  }

  return (
    <ClienteContext.Provider value={{idClienteLogado, nomeClienteLogado, mudaLogin}}>
      {children}
    </ClienteContext.Provider>
  )

}

export default ClienteProvider