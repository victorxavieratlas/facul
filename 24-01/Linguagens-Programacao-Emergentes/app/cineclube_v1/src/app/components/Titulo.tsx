import Link from "next/link"
import { FaRegCircleUser } from "react-icons/fa6"

function Titulo() {
  return (
    <nav className="border-orange-300 bg-orange-200 dark:bg-orange-800 dark:border-orange-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./pipoca.png" className="h-12" alt="Logo Cineclube" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CineClube Avenida
          </span>
        </Link>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-500 rounded-lg md:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-600" aria-controls="navbar-solid-bg" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-orange-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-orange-800 md:dark:bg-transparent dark:border-orange-700">
            <li>
              <Link href="/login" className="block py-2 px-3 md:p-0 text-orange-900 rounded hover:bg-orange-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-orange-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <FaRegCircleUser className="inline"/> Entrar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Titulo