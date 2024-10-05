'use client'
import { useContext, useState, useEffect } from "react"
import { RxExit } from "react-icons/rx"
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import Swal from "sweetalert2"
import Cookies from 'js-cookie'

import { ClienteContext } from "../context/ClienteContext"
import Link from "next/link"
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { profile } from "console";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ['latin'],
})


export default function Header() {
    const { idClienteLogado, nomeClienteLogado, mudaLogin } = useContext(ClienteContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Fechar o menu sempre que a rota mudar ou o cliente logado mudar
        setIsMenuOpen(false);
    }, [pathname, idClienteLogado]);

    useEffect(() => {
        setIsMenuOpen(false)
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function logout() {
        Swal.fire({
            title: "Deseja sair da conta?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#6b7280",
            cancelButtonColor: "#2563EB",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
        }).then((result) => {
            if (result.isConfirmed) {
                mudaLogin({ userId: null, userName: "" });
                Cookies.remove("user_login_id");
                Cookies.remove("x-access-token");
                Cookies.remove("x-user-name");
                Cookies.remove("x-profile-id");
                router.refresh();
                window.location.reload();
            }
        });
    }

    return (
        <nav className="bg-gray-200 border-gray-400 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:mx-auto p-4">
                <Link href="/" passHref>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse lg:ml-12 pb-1">
                        <Image src="/logo2.svg" width={30} height={30} alt="Logotipo da CarWash em azul claro" />
                        <span className={`self-center ml-6 text-2xl font-bold tracking-wide text-balance whitespace-nowrap text-blue-500 align-top ${fredoka.className}`}>lavar auto</span>
                    </div>
                </Link>
                <div className="flex items-center justify-end">
                    {(isMobile || idClienteLogado) && (
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 sm:mr-24 hover:bg-gray-100 rounded-md">
                            {isMenuOpen ? <IoMdClose className="w-6 h-6" /> : <IoIosMenu className="w-6 h-6" />}
                        </button>
                    )}
                    {isMenuOpen && (
                        <div className="min-h-screen h-screen absolute right-0 top-full pb-1 w-48 bg-gray-200 shadow-lg z-50 sm:min-w-72 divide-y">
                            {idClienteLogado ? (
                                <>
                                    <p className="block px-4 py-4 text-md font-bold text-gray-700 border-solid border-b-2 border-gray-300">{nomeClienteLogado}</p>
                                    <Link href={`/painel/${Cookies.get("user_login_id")}`}>
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#374151" fill="none">
                                                <path d="M18 2V10M22 6L14 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2C7.40013 2 8.1002 2 8.63498 2.27248C9.10538 2.51217 9.48783 2.89462 9.72752 3.36502C10 3.8998 10 4.59987 10 6C10 7.40013 10 8.1002 9.72752 8.63498C9.48783 9.10538 9.10538 9.48783 8.63498 9.72752C8.1002 10 7.40013 10 6 10C4.59987 10 3.8998 10 3.36502 9.72752C2.89462 9.48783 2.51217 9.10538 2.27248 8.63498C2 8.1002 2 7.40013 2 6Z" stroke="currentColor" stroke-width="1.5" />
                                                <path d="M2 18C2 16.5999 2 15.8998 2.27248 15.365C2.51217 14.8946 2.89462 14.5122 3.36502 14.2725C3.8998 14 4.59987 14 6 14C7.40013 14 8.1002 14 8.63498 14.2725C9.10538 14.5122 9.48783 14.8946 9.72752 15.365C10 15.8998 10 16.5999 10 18C10 19.4001 10 20.1002 9.72752 20.635C9.48783 21.1054 9.10538 21.4878 8.63498 21.7275C8.1002 22 7.40013 22 6 22C4.59987 22 3.8998 22 3.36502 21.7275C2.89462 21.4878 2.51217 21.1054 2.27248 20.635C2 20.1002 2 19.4001 2 18Z" stroke="currentColor" stroke-width="1.5" />
                                                <path d="M14 18C14 16.5999 14 15.8998 14.2725 15.365C14.5122 14.8946 14.8946 14.5122 15.365 14.2725C15.8998 14 16.5999 14 18 14C19.4001 14 20.1002 14 20.635 14.2725C21.1054 14.5122 21.4878 14.8946 21.7275 15.365C22 15.8998 22 16.5999 22 18C22 19.4001 22 20.1002 21.7275 20.635C21.4878 21.1054 21.1054 21.4878 20.635 21.7275C20.1002 22 19.4001 22 18 22C16.5999 22 15.8998 22 15.365 21.7275C14.8946 21.4878 14.5122 21.1054 14.2725 20.635C14 20.1002 14 19.4001 14 18Z" stroke="currentColor" stroke-width="1.5" />
                                            </svg>
                                            Ver painel
                                        </p>
                                    </Link>
                                    <Link href={`/${Cookies.get("x-profile-id")}`}>
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#374151" fill="none">
                                                <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                                <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                                            </svg>
                                            Ver perfil
                                        </p>
                                    </Link>
                                    <Link href={`/${Cookies.get("x-profile-id")}/editar`}>
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#374151" fill="none">
                                                <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                            Editar perfil
                                        </p>
                                    </Link>
                                    <Link href="/edit">
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#374151" fill="none">
                                                <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.89936 2 4.3752 4.46819 2.83209 8M2 4.5L2.5 8.5L6.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.7257 10.0603C14.6268 9.29765 13.7528 8.06543 12.1812 8.0654C10.3551 8.06537 9.58672 9.07867 9.43081 9.58532C9.18758 10.263 9.23622 11.6563 11.3766 11.8082C14.0522 11.9982 15.124 12.3146 14.9877 13.9552C14.8513 15.5957 13.3599 15.9502 12.1812 15.9121C11.0024 15.8742 9.07398 15.3317 8.99915 13.8725M11.9941 6.49921V8.06902M11.9941 15.9023V17.4992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                            Comprar planos
                                        </p>
                                    </Link>
                                    <p onClick={logout} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-solid border-b-2 border-gray-300">
                                        <svg className="inline mr-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Sair
                                    </p>

                                </>
                            ) : (
                                <>
                                    <Link href="/cadastrar"><p className="block px-4 py-4 text-sm font-medium rounded md:bg-transparen text-blue-500 hover:bg-gray-300">CADASTRE-SE GRÁTIS</p></Link>
                                    <Link href="/entrar"><p className="block px-4 py-4 text-sm font-medium text-gray-700 hover:bg-gray-300">ENTRAR</p></Link>
                                </>
                            )}
                        </div>
                    )}
                    {!isMobile && !idClienteLogado && (
                        <ul className="flex flex-col p-4 md:p-0 mt-4 mr-12 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-200">
                            <li className="block py-2 px-3 text-white hover:bg-gray-300 rounded-lg">
                                <Link href="/cadastrar" className="block py-2 px-3 bg-blue-500 rounded md:bg-transparent md:text-blue-500 md:p-0 text-blue-500" aria-current="page">
                                    CADASTRE-SE GRÁTIS
                                </Link>
                            </li>
                            <li className="block py-2 px-3 text-white hover:bg-gray-300 rounded-lg">
                                <Link href="/entrar" className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-700">
                                    ENTRAR
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
