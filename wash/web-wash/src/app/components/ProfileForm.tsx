'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import UploadImageInput from './UploadImageInput';

interface City {
    id: number;
    uf: string;
    name: string;
    stateId: number;
}

interface Neighborhood {
    id: number;
    name: string;
    cityId: number;
}

interface ProfilePanelInput {
    imageURL: string;
    bio: string;
    phone: string;
    startDay: string;
    finalDay: string;
    openHour: string;
    closeHour: string;
    minPrice: number;
    maxPrice: number;
    cityId: number;
    neighborhoodId: number;
    address: string;
    addressNumber: number;
    addressCEP: number;
    addressComplement: string;
    stateId: number;
}

interface ProfileIncomplete {
    id: number;
}


const ProfileForm = ({ profileIncomplete }: { profileIncomplete: ProfileIncomplete }) => {
    const { register, handleSubmit, setFocus } = useForm<ProfilePanelInput>();
    const router = useRouter();

    const [input, setInput] = useState('');
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
    const [results, setResults] = useState<City[]>([]);
    const [neighborhoodInput, setNeighborhoodInput] = useState('');
    const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<number | null>(null);
    const [neighborhoodResults, setNeighborhoodResults] = useState<Neighborhood[]>([]);

    const [showTooltipCity, setShowTooltipCity] = useState(false);
    const [showTooltipNeighborhood, setShowTooltipNeighborhood] = useState(false);
    const [showTooltipAddress, setShowTooltipAddress] = useState(false);
    const [showTooltipAddressNumber, setShowTooltipAddressNumber] = useState(false);
    const [showTooltipAddressCEP, setShowTooltipAddressCEP] = useState(false);
    const [showTooltipAddressComplement, setShowTooltipAddressComplement] = useState(false);
    const [showTooltipPhoneNumber, setShowTooltipPhoneNumber] = useState(false);
    const [showTooltipOpenHour, setShowTooltipOpenHour] = useState(false);
    const [showTooltipCloseHour, setShowTooltipCloseHour] = useState(false);
    const [showTooltipOpenDay, setShowTooltipOpenDay] = useState(false);
    const [showTooltipCloseDay, setShowTooltipCloseDay] = useState(false);
    const [showTooltipLowerPrice, setShowTooltipLowerPrice] = useState(false);
    const [showTooltipHighPrice, setShowTooltipHighPrice] = useState(false);
    const [showTooltipPresentation, setShowTooltipPresentation] = useState(false);
    const [showTooltipImage, setShowTooltipImage] = useState(false);
    // Adicione isso ao estado do componente ProfileForm
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

    // Adicione essa função no componente ProfileForm para enviar a imagem
    const uploadImage = async () => {
        if (!selectedImageFile) return null;

        const formData = new FormData();
        formData.append('image', selectedImageFile);

        try {
            const response = await fetch('http://localhost:3007/cover-image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                return data.imageUrl; // Retorne a URL da imagem
            } else {
                console.error(data.error);
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };



    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (input.length >= 3) {
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
                        setResults([]);
                    });
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(debounceTimeout);
    }, [input]);

    // Fetch neighborhoods as the user types, only if a city is selected
    useEffect(() => {
        if (!selectedCityId) {
            setNeighborhoodResults([]);
            return;
        }

        if (selectedNeighborhoodId) {
            // Neighborhood is already selected; do not fetch
            setNeighborhoodResults([]);
            return;
          }

        const debounceTimeout = setTimeout(() => {
            if (neighborhoodInput.length >= 1) {
                fetch(`http://localhost:3007/neighborhoods/search/${selectedCityId}/${encodeURIComponent(neighborhoodInput)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            setNeighborhoodResults(data);
                        } else {
                            setNeighborhoodResults([]);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching neighborhoods:', error);
                        setNeighborhoodResults([]);
                    });
            } else {
                setNeighborhoodResults([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [neighborhoodInput, selectedCityId]);

    const handleSelectCity = (city: City) => {
        setInput(`${city.name} - ${city.uf}`); // Set the visible input field to city name and UF
        setSelectedCityId(city.id); // Keep the city ID in state
        setSelectedStateId(city.stateId); // Keep the state ID
        setResults([]); // Clear results after selection

        // Clear neighborhood input when city changes
        setNeighborhoodInput('');
        setSelectedNeighborhoodId(null);
    };

    // Handle neighborhood selection
    const handleSelectNeighborhood = (neighborhood: Neighborhood) => {
        setNeighborhoodInput(neighborhood.name);
        setSelectedNeighborhoodId(neighborhood.id);
        setNeighborhoodResults([]);
    };

    // Clear neighborhood input if city input changes
    useEffect(() => {
        if (!selectedCityId) {
            setNeighborhoodInput('');
            setSelectedNeighborhoodId(null);
            setNeighborhoodResults([]);
        }
    }, [selectedCityId]);

    // Atualize handleFormSubmit para enviar a imagem antes do perfil
    const handleFormSubmit = async (data: ProfilePanelInput) => {
        console.log(selectedCityId)

        if (!selectedCityId || !selectedStateId) {
            toast.error("Por favor, selecione uma cidade válida.");
            return;
        }

        if (!selectedNeighborhoodId) {
            toast.error("Por favor, selecione um bairro válido.");
            return;
        }

        // Primeiro, envie a imagem e obtenha a URL
        const imageUrl = await uploadImage();

        if (!imageUrl) {
            toast.error("Erro ao enviar a imagem.");
            return;
        }

        // Se a imagem foi enviada com sucesso, inclua a URL da imagem nos dados do perfil
        const updatedProfile = { ...data, cityId: selectedCityId, neighborhoodId: selectedNeighborhoodId, imageURL: imageUrl, stateId: selectedStateId ? selectedStateId : 0 };
        EditProfile(updatedProfile);
    };

    async function EditProfile(data: ProfilePanelInput) {
        console.log(data.neighborhoodId)
        console.log(selectedNeighborhoodId)
        const response = await fetch(`http://localhost:3007/profiles/${profileIncomplete.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${Cookies.get("x-access-token")}`
            },
            body: JSON.stringify({
                imageURL: data.imageURL,
                bio: data.bio,
                phone: data.phone,
                startDay: data.startDay,
                finalDay: data.finalDay,
                openHour: data.openHour,
                closeHour: data.closeHour,
                minPrice: data.minPrice,
                maxPrice: data.maxPrice,
                cityId: data.cityId,
                neighborhoodId: data.neighborhoodId,
                address: data.address,
                addressNumber: data.addressNumber,
                addressCEP: data.addressCEP,
                addressComplement: data.addressComplement,
                stateId: data.stateId
            })
        });

        if (response.status === 200) {
            // console.log(response.status)
            // toast.success("Perfil atualizado com sucesso!");
            window.location.reload()
        } else {
            toast.error("Não foi possível editar ou salvar as informações.");
        }
    }

    return (
        <div className="lg:min-w-max max-w-full bg-white border-none mb-10">
            <div className="min-w-full w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-wrap mb-4">
                    <h5 className="text-xl font-medium text-gray-500 text-center mb-10">Completar perfil na <span className="text-2xl text-blue-500">CarWash</span></h5>
                    <p className="font-medium text-lg text-gray-500 mb-6">
                        <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                            <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        Informações de localização</p>
                    <div className='w-full'>
                        <div className="inline-flex justify-end float-right ml-30 z-40">
                            <span
                                className="ml-2 text-gray-500 cursor-pointer "
                                onMouseEnter={() => setShowTooltipCity(true)}
                                onMouseLeave={() => setShowTooltipCity(false)}
                            >
                                {/* Ícone de informação */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12" y2="8"></line>
                                </svg>
                            </span>
                            {/* Caixa com a explicação */}
                            {showTooltipCity && (
                                <div className="absolute mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-50 w-64">
                                    A cidade da localização do negócio, no formato de texto - São Paulo.
                                </div>
                            )}
                        </div>
                        <label htmlFor="cityId" className="w-full text-sm font-medium text-gray-500">
                            Digite sua cidade
                        </label>
                        <div className="relative w-full">
                        <input
                            type="search"
                            id="cityId"
                            className="block mt-2 p-3 w-full h-14 text-sm text-gray-500 bg-gray-50 rounded-lg border-gray-300 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            placeholder="São Paulo - SP"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setSelectedCityId(null);
                                setSelectedStateId(null);
                                setNeighborhoodInput('');
                                setSelectedNeighborhoodId(null);
                            }}
                            autoComplete="off"
                            required
                        />
                        {results.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-white shadow-lg max-h-60 overflow-auto z-30 rounded-lg">
                                {results.map((city) => (
                                    <li key={city.id} className="border-b-2 border-gray-200 p-3 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                                        onClick={() => handleSelectCity(city)}>
                                        {city.name} - {city.uf}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                    </div>
                    <div>
                        <div className='w-full'>
                            <div className="inline-flex justify-end float-right ml-30 z-40">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer z-60"
                                    onMouseEnter={() => setShowTooltipNeighborhood(true)}
                                    onMouseLeave={() => setShowTooltipNeighborhood(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipNeighborhood && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-50 w-64">
                                        O bairro da localização do negócio, no formato de texto - Centro.
                                    </div>
                                )}
                            </div>
                            <label htmlFor="neighborhood" className="w-full text-sm font-medium text-gray-500">
                                Digite seu bairro
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    id="neighborhood"
                                    className="block mt-2 p-3 w-full h-14 z-20 text-sm text-gray-500 bg-gray-50 rounded-lg border-gray-300 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    placeholder="Centro"
                                    value={neighborhoodInput}
                                    onChange={(e) => {
                                        setNeighborhoodInput(e.target.value);
                                        setSelectedNeighborhoodId(null);
                                      }}
                                    autoComplete="off"
                                    disabled={!selectedCityId}
                                    required
                                />
                                {neighborhoodResults.length > 0 && (
                                    <ul className="absolute left-0 right-0 bg-white shadow-lg max-h-60 overflow-auto z-30 rounded-lg">
                                        {neighborhoodResults.map((neighborhood) => (
                                            <li
                                                key={neighborhood.id}
                                                className="border-b-2 border-gray-200 p-3 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                                                onClick={() => handleSelectNeighborhood(neighborhood)}
                                            >
                                                {neighborhood.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipAddress(true)}
                                    onMouseLeave={() => setShowTooltipAddress(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipAddress && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Endereço no formato de texto com o nome da rua ou avenida - Avenida Paulista.
                                    </div>
                                )}
                            </div>
                        </div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-500">
                            Endereço
                        </label>
                        <input type="string" id="address" placeholder="Avenida Paulista" className="mt-2 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("address")} />
                    </div>

                    <div className="flex w-full">
                        <div className="w-1/2 pr-4">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipAddressNumber(true)}
                                    onMouseLeave={() => setShowTooltipAddressNumber(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipAddressNumber && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Número de endereço e localização na rua ou avenida - 1234.
                                    </div>
                                )}
                            </div>
                            <label htmlFor="addressNumber" className="block mb-2 text-sm font-medium text-gray-500">
                                Número
                            </label>
                            <input type="number" id="addressNumber" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="1234"
                                required {...register("addressNumber")} />
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipAddressCEP(true)}
                                    onMouseLeave={() => setShowTooltipAddressCEP(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipAddressCEP && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        CEP de endereço e localização na rua ou avenida - 96300000.
                                    </div>
                                )}
                            </div>
                            <label htmlFor="addressCEP" className="block mb-2 text-sm font-medium text-gray-500">
                                CEP
                            </label>
                            <input type="number" id="addressCEP" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="00000000"
                                required {...register("addressCEP")} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipAddressComplement(true)}
                                    onMouseLeave={() => setShowTooltipAddressComplement(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipAddressComplement && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Complemento de endereço ou localização - Loja vermelha, prédio de esquina.
                                    </div>
                                )}
                            </div>
                            <label htmlFor="addressComplement" className="block mb-2 text-sm font-medium text-gray-500">
                                Complemento
                            </label>
                        </div>
                        <input type="string" id="addressComplement" placeholder="Prédio azul de esquina" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("addressComplement")} />
                    </div>


                    <div>
                        <p className="font-medium text-lg text-gray-500 mb-6">
                            <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M18.5 6C18.4191 4.58055 18.197 3.67665 17.5877 3.02513C16.629 2 15.086 2 12 2C8.91399 2 7.37098 2 6.41229 3.02513C5.80298 3.67665 5.58092 4.58055 5.49999 6M18.5 18C18.4191 19.4194 18.197 20.3233 17.5877 20.9749C16.629 22 15.086 22 12 22C8.91399 22 7.37098 22 6.41229 20.9749C5.80298 20.3233 5.58092 19.4194 5.49999 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M8.99999 2L9.08899 2.53402C9.28187 3.69129 9.37831 4.26993 9.77518 4.62204C10.1892 4.98934 10.7761 5 12 5C13.2238 5 13.8108 4.98934 14.2248 4.62204C14.6217 4.26993 14.7181 3.69129 14.911 2.53402L15 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M11 19H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.99999 8.5C3.99999 8.5 4.99999 8.846 4.99999 9.8125C4.99999 10.779 3.99999 11.0335 3.99999 12C3.99999 12.9665 4.99999 13.221 4.99999 14.1875C4.99999 15.154 3.99999 15.5 3.99999 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 8.5C20 8.5 19 8.846 19 9.8125C19 10.779 20 11.0335 20 12C20 12.9665 19 13.221 19 14.1875C19 15.154 20 15.5 20 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Informações de contato
                        </p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipPhoneNumber(true)}
                                    onMouseLeave={() => setShowTooltipPhoneNumber(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipPhoneNumber && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Número WhatsApp onde Clientes podem entrar em contato, no formato somente números com DDD - 00988888888.
                                    </div>
                                )}
                            </div>
                        </div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">
                            Número WhatsApp
                        </label>
                        <input type="number" id="phone" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="00988888888"
                            required {...register("phone")} />
                    </div>


                    <div>
                        <p className="font-medium text-lg text-gray-500 mb-6">
                            <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M20.9427 16.8354C20.2864 12.8866 18.2432 9.94613 16.467 8.219C15.9501 7.71642 15.6917 7.46513 15.1208 7.23257C14.5499 7 14.0592 7 13.0778 7H10.9222C9.94081 7 9.4501 7 8.87922 7.23257C8.30834 7.46513 8.04991 7.71642 7.53304 8.219C5.75682 9.94613 3.71361 12.8866 3.05727 16.8354C2.56893 19.7734 5.27927 22 8.30832 22H15.6917C18.7207 22 21.4311 19.7734 20.9427 16.8354Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M13.6267 12.9186C13.4105 12.1205 12.3101 11.4003 10.9892 11.9391C9.66829 12.4778 9.45847 14.2113 11.4565 14.3955C12.3595 14.4787 12.9483 14.2989 13.4873 14.8076C14.0264 15.3162 14.1265 16.7308 12.7485 17.112C11.3705 17.4932 10.006 16.8976 9.85742 16.0517M11.8417 10.9927V11.7531M11.8417 17.2293V17.9927" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Informações de valores
                        </p>
                        <div className="flex w-full">
                            <div className="w-1/2 pr-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipLowerPrice(true)}
                                        onMouseLeave={() => setShowTooltipLowerPrice(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipLowerPrice && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Preço mais baixo de um serviço, no formato valor em Reais - 80.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="minPrice" className="block mb-2 text-sm font-medium text-gray-500">
                                    Preço mais baixo
                                </label>
                                <input type="number" id="minPrice" placeholder="min" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("minPrice")} />
                            </div>

                            <div className="w-1/2 pl-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipHighPrice(true)}
                                        onMouseLeave={() => setShowTooltipHighPrice(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipHighPrice && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Preço mais alto combinando possíveis serviços, no formato valor em Reais - 200.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium text-gray-500">
                                    Preço mais alto
                                </label>
                                <input type="number" id="maxPrice" placeholder="max" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("maxPrice")} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-0">
                        <p className="font-medium text-lg text-gray-500 mb-6">
                            <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M17 2V5M7 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.5 8.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9 15.5C9 15.5 10.5 16 11 17.5C11 17.5 13.1765 13.5 16 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Informações de expediente
                        </p>
                        <div className="w-full flex">
                            <div className="w-1/2 pr-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipOpenDay(true)}
                                        onMouseLeave={() => setShowTooltipOpenDay(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipOpenDay && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Dia em que o serviço começa a operar, no formato de nome do dia - Segunda.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="startDay" className="block mb-2 text-sm font-medium text-gray-500">
                                    Dia de abetura
                                </label>
                                <input type="string" id="startDay" placeholder="Segunda" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("startDay")} />
                            </div>

                            <div className="w-1/2 pl-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipCloseDay(true)}
                                        onMouseLeave={() => setShowTooltipCloseDay(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipCloseDay && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Dia em que o serviço para de operar, no formato de nome do dia - Sexta.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="finalDay" className="block mb-2 text-sm font-medium text-gray-500">
                                    Dia de fechamento
                                </label>
                                <input type="string" id="finalDay" placeholder="Sexta" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("finalDay")} />
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 pr-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipOpenHour(true)}
                                        onMouseLeave={() => setShowTooltipOpenHour(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipOpenHour && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Horário em que o serviço começa a operar, no formato 24 horas - HH:MM.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="openHour" className="block mb-2 text-sm font-medium text-gray-500">
                                    Horário de abertura
                                </label>
                                <input type="string" id="openHour" placeholder="09:00" className="mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("openHour")} />
                            </div>

                            <div className="w-1/2 pl-4">
                                <div className="inline-flex justify-end float-right ml-30">
                                    <span
                                        className="inline-block ml-2 text-gray-500 cursor-pointer"
                                        onMouseEnter={() => setShowTooltipCloseHour(true)}
                                        onMouseLeave={() => setShowTooltipCloseHour(false)}
                                    >
                                        {/* Ícone de informação */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12" y2="8"></line>
                                        </svg>
                                    </span>
                                    {/* Caixa com a explicação */}
                                    {showTooltipCloseHour && (
                                        <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                            Horário em que o serviço para de operar, no formato 24 horas - HH:MM.
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="closeHour" className="block mb-2 text-sm font-medium text-gray-500">
                                    Horário de fechamento
                                </label>
                                <input type="string" id="closeHour" placeholder="18:00" className="mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                    required {...register("closeHour")} />
                            </div>
                        </div>
                    </div>
                    <div className='break-words text-wrap'>
                        <p className="font-medium text-lg text-gray-500 mb-6">
                            <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M3 6H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M3 10H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M13.5 10L21 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M3 14H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M10 14H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M17 14H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M3 18H5.11765M8.29412 18H10.4118M13.5882 18H15.7059M18.8824 18H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Informações gerais
                        </p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipPresentation(true)}
                                    onMouseLeave={() => setShowTooltipPresentation(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipPresentation && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Conte sobre a história e os destaques do negócio, no formato de texto.
                                    </div>
                                )}
                            </div>
                        </div>
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-500">
                            Faça uma apresentação
                        </label>
                        <textarea id="bio" placeholder="Fundada em 2024 a Lavar Auto veio para revolucionar o mercado de Estéticas Automotivas..." className="mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-20 p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("bio")} />
                    </div>

                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30">
                                <span
                                    className="inline-block ml-2 text-gray-500 cursor-pointer"
                                    onMouseEnter={() => setShowTooltipImage(true)}
                                    onMouseLeave={() => setShowTooltipImage(false)}
                                >
                                    {/* Ícone de informação */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="8"></line>
                                    </svg>
                                </span>
                                {/* Caixa com a explicação */}
                                {showTooltipImage && (
                                    <div className="absolute ml-10 mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                        Uma imagem que represente o negócio ou que atraia clientes, no formato de imagem.
                                    </div>
                                )}
                            </div>
                        </div>
                        <label htmlFor="closeHour" className="block mb-2 text-sm font-medium text-gray-500">
                            Imagem de capa
                        </label>
                        <UploadImageInput setImageFile={setSelectedImageFile} />
                        {/* <input type="file" accept="image/*"  id="image" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="https://www..."
                            required {...register("image")} /> */}
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Completar</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;

