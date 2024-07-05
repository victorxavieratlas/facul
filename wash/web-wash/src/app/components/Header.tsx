'use client'
import { useContext, useState, useEffect } from "react"
import { RxExit } from "react-icons/rx"
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import Swal from "sweetalert2"
import Cookies from 'js-cookie'

import { ClienteContext } from "../context/ClienteContext"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
    const { idClienteLogado, nomeClienteLogado, mudaLogin } = useContext(ClienteContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function logout() {
        Swal.fire({
            title: "Confirma saída do sistema?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
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
            }
        });
    }

    return (
        <nav className="bg-gray-200 border-gray-400 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:mx-auto p-4">
                <Link href="/" passHref>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse lg:ml-12">
                        <Image src="../logo2.svg" width={30} height={30} alt="Logotipo da CarWash em azul claro" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-500">CarWash</span>
                    </div>
                </Link>
                <div className="flex items-center justify-end">
                    {(isMobile || idClienteLogado) && (
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 sm:mr-24 hover:bg-gray-100 rounded-md">
                            {isMenuOpen ? <IoMdClose className="w-6 h-6" /> : <IoIosMenu className="w-6 h-6" />}
                        </button>
                    )}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full pb-1 w-48 bg-gray-200 shadow-lg z-50 sm:min-w-72 divide-y">
                            {idClienteLogado ? (
                                <>
                                    <p className="block px-4 py-4 text-md font-bold text-gray-700 border-solid border-b-2 border-gray-300">{nomeClienteLogado}</p>
                                    <Link href="/perfil">
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Ver painel
                                        </p>
                                    </Link>
                                    <Link href="/perfil">
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 0117.804 5.12M9 15a3 3 0 100-6 3 3 0 000 6zm3 6v-2a6 6 0 00-6-6H3" />
                                            </svg>
                                            Ver perfil
                                        </p>
                                    </Link>
                                    <Link href="/edit">
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L12 21h-6v-6L16.732 5.232z" />
                                            </svg>
                                            Editar perfil
                                        </p>
                                    </Link>
                                    <Link href="/edit">
                                        <p className="block px-4 py-3 font-medium text-md text-gray-700 hover:bg-gray-100 border-solid border-b-2 border-gray-300">
                                            <svg className="inline mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                            Comprar planos
                                        </p>
                                    </Link>
                                    <p onClick={logout} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-solid border-b-2 border-gray-300">
                                        <svg className="inline mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Sair
                                    </p>

                                </>
                            ) : (
                                <>
                                    <Link href="/cadastrar"><p className="block px-4 py-2 text-sm rounded md:bg-transparen text-blue-500">CADASTRE-SE GRÁTIS</p></Link>
                                    <Link href="/entrar"><p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ENTRAR</p></Link>
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
