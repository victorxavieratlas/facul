import { useState, useEffect } from 'react';
import Link from 'next/link';

interface City {
    id: number;
    uf: string;
    name: string;
    stateId: number;
}

interface State {
    id: number;
    name: string;
}

interface SearchProps {
    states: State[];
}

const Search = ({ states }: SearchProps) => {
    const [input, setInput] = useState<string>('');
    const [results, setResults] = useState<City[]>([]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (input.length >= 3) {
                // console.log(input)
                fetch(`http://localhost:3007/cities/search/${encodeURIComponent(input)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            setResults(data);
                        } else {
                            setResults([]);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching cities:', error);
                        setResults([]); // Limpa os resultados em caso de erro
                    });
            } else {
                setResults([]); // Limpar resultados se o input for menor que 3 caracteres
            }
        }, 300); // Debounce time in milliseconds

        return () => clearTimeout(debounceTimeout);
    }, [input]);

    return (
        <form className="max-w-sm sm:max-w-lg mx-auto">
            <div className="flex">
                <div className="relative w-full mt-10">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-3 w-full h-14 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                        placeholder="Selecionar cidade"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <button type="submit" className="absolute top-0 right-0 p-3 w-14 text-sm font-medium h-full text-white bg-blue-500 rounded-r-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>

                    {Array.isArray(results) && results.length > 0 && (
                        <ul className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 absolute w-full max-w-lg bg-white shadow-lg max-h-60 overflow-auto z-50 rounded-lg mr-20 pr-20">
                            {results.map((city) => {
                                const state = states.find(state => state.id === city.stateId);
                                const stateName = state ? state.name : 'Unknown';
                                return (
                                    <Link href={`/estados/${stateName}/${city.stateId}/cidades/${city.name}/${city.id}`} className="hover:bg-gray-400 transition duration-200 ease-in-out">
                                        <li key={city.id} className="border-b-2 border-gray-200 p-3 cursor-pointer transition duration-200 ease-in-out">
                                            <p className="block text-gray-800 hover:text-blue-500">{city.name} - {city.uf}</p>
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </form>
    );
};

export default Search;
