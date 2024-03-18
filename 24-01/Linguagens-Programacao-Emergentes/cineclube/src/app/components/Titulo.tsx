import Link from "next/link"
import { FaCircleUser } from "react-icons/fa6";
import Pesquisa from "./Pesquisa";

function Titulo() {
    return (
        <nav className=" bg-gray-900 border-solid border-b-2 border-gray-400">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-12" alt="Logo Cineclube" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap"></span>
                </Link>
                <div className="w-1/2">
                    <Pesquisa />
                </div>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link href="/" className="block py-2 px-3 md:p-0 text-white bg-purple-400 rounded md:bg-transparent md:text-purple-500 md:dark:text-purple-500 dark:bg-purple-600 md:dark:bg-transparent" aria-current="page">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link href="/register" className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-600">
                                Cadastrar
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-600">
                                Entrar <FaCircleUser className="inline"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Titulo
