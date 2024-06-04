import States from "./components/States";

async function getState() {
	const response = await fetch("http://localhost:3007/search/state", 
		  { cache: 'no-store' })
	const data = await response.json()
	return data
  }
  
  export interface stateProps {
	id: number
	name: string
}

export default async function Home() {

	const states = await getState()

	const listStates = states.map((state: stateProps) => (
	  <States key={state.id} state={state} />
	))

	return (
		<div>
			<div className="w-full sm:w-[100%] max-w-[1180px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 relative lg:flex lg:flex-wrap mt-10 mb-10">
				<div className="ml-4 sm:ml-0 flex flex-col gap-4">
					<h1 className="text-2xl sm:text-5xl font-extrabold text-gray-800 text-balance">
						<span className="clear-left block mb-4">Encontre</span> <span className="clear-left block mb-4">lavagens e estéticas automotivas</span> na <span className="font-extrabold text-blue-500">CarWash</span>
					</h1>
				</div>
			</div>

			<form className="max-w-sm sm:max-w-lg mx-auto">
				<div className="flex">
					<div className="relative w-full drop-shadow-lg mt-10 mb-10">
						<input type="search" id="search-dropdown" className="block p-2.5 w-full h-14 rounded-lg z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none" placeholder=" Selenionar cidade" required />
						<button type="submit" className="absolute top-0 end-0 p-2.5 w-14 text-sm font-medium h-full text-white bg-blue-500 rounded-e-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
							<svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</div>
				</div>
			</form>

			<div className="text-center grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3 sm:mx-20 mx-2 mb-10">
        		{listStates}
      		</div>

		</div>
	)
}
