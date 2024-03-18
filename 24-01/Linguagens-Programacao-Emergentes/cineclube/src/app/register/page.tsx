export default function Register() {
    return (
        <div className="">
            <div className="max-w-sm mx-auto h-96 mt-44 py-20 absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
            <form className="relative max-w-sm mx-auto h-96 mt-20 w-full bg-gray-900 rounded-lg px-20 pb-20 pt-8 border border-gray-200">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
                        Nome:
                    </label>
                    <input type="text" id="name" className="bg-gray-800 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                        Email:
                    </label>
                    <input type="email" id="email" className="bg-gray-800 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="seu@email.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                        Senha:
                    </label>
                    <input type="password" id="password" className="bg-gray-800 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <p className="text-center">
                    <button type="submit" className="text-gray-200 bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 mt-2 text-center">
                        Cadastrar
                    </button>
                </p>
            </form>
        </div>
    )
}
