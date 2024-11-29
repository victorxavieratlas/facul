
function Titulo() {
  return (
    <nav className="border-blue-200 bg-blue-300 dark:bg-blue-800 dark:border-blue-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo2.png" className="h-8" alt="Logo Cinema" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Admin: Cineclube Avenida
          </span>
        </a>
      </div>
    </nav>
  )
}

export default Titulo