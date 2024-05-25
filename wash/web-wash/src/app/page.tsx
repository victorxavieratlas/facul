export default function Home() {
	return (
		<div>
			<div className="w-full sm:w-[88%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-10 mb-10">
				<div className="flex flex-col gap-4 ">
					<h1 className="text-5xl font-extrabold text-gray-800 text-balance">
						<span className="clear-left block mb-4">Encontre</span> <span className="clear-left block mb-4">lavagens e estéticas automotivas</span> na <span className="text-5xl font-extrabold text-blue-500">CarWash</span>
					</h1>
				</div>
			</div>

			<form className="max-w-lg mx-auto">
				<div className="flex">
					<div className="relative w-full drop-shadow-lg mt-10 mb-10">
						<input type="search" id="search-dropdown" className="block p-2.5 w-full h-14 rounded-lg z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder=" Selenionar cidade" required />
						<button type="submit" className="absolute top-0 end-0 p-2.5 w-14 text-sm font-medium h-full text-white bg-blue-500 rounded-e-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
							<svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</div>
				</div>
			</form>

		</div>
	)
}
