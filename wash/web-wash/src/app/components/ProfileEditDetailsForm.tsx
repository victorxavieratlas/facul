'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'
import UploadImageDetailsFormInput from './UploadImageDetailsFormInput';

interface City {
    id: number;
    uf: string;
    name: string;
    stateId: number;
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
}

interface ProfileData {
    id: number;
    phone?: string;
    images?: [{ url: string }];
    cities: [{ id: number, name: string, stateId: number, uf: string }];
    states: [{ id: number, name: string }];
    name: string;
    startDay: string;
    finalDay: string;
    minPrice: number;
    maxPrice: number;
    bio: string;
    openHour: string;
    closeHour: string;
}

interface ProfileId {
    profileId: number;
}

const ProfileEditDetailsForm = ({ profileId }: { profileId: ProfileId }) => {
    const { register, handleSubmit, setFocus } = useForm<ProfilePanelInput>();
    const router = useRouter();

    const [inputCity, setInputCity] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputMinPrice, setInputMinPrice] = useState('');
    const [inputMaxPrice, setInputMaxPrice] = useState('');
    const [inputOpenDay, setInputOpenDay] = useState('');
    const [inputCloseDay, setInputCloseDay] = useState('');
    const [inputOpenHour, setInputOpenHour] = useState('');
    const [inputCloseHour, setInputCloseHour] = useState('');
    const [inputPresentation, setInputPresentation] = useState('');
    const [inputImage, setInputImage] = useState('');
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [results, setResults] = useState<City[]>([]);
    const [showTooltipCity, setShowTooltipCity] = useState(false);
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
    const [initialImageURL, setInitialImageURL] = useState<string | null>(null);
    const [isFocusedCityInput, setIsFocusedCityInput] = useState(false);
    const [isFocusedPhoneInput, setIsFocusedPhoneInput] = useState(false);
    const [isFocusedMinPriceInput, setIsFocusedMinPriceInput] = useState(false);
    const [isFocusedMaxPriceInput, setIsFocusedMaxPriceInput] = useState(false);
    const [isFocusedOpenDayInput, setIsFocusedOpenDayInput] = useState(false);
    const [isFocusedCloseDayInput, setIsFocusedCloseDayInput] = useState(false);
    const [isFocusedOpenHourInput, setIsFocusedOpenHourInput] = useState(false);
    const [isFocusedCloseHourInput, setIsFocusedCloseHourInput] = useState(false);
    const [isFocusedPresentationInput, setIsFocusedPresentationInput] = useState(false);
    const [isFocusedImageInput, setIsFocusedImageInput] = useState(false);

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
        getProfile(profileId);
        if (profileData?.cities[0].name && !isFocusedCityInput) {
            setInputCity(`${profileData.cities[0].name} - ${profileData.cities[0].uf}`);
            setInitialImageURL(profileData.images?.[0]?.url || null); // Define a imagem inicial
        }
        if (profileData?.phone && !isFocusedPhoneInput) {
            setInputPhone(`${profileData.phone}`);
        }
        if (profileData?.minPrice && !isFocusedMinPriceInput) {
            setInputMinPrice(`${profileData.minPrice}`);
        }
        if (profileData?.maxPrice && !isFocusedMaxPriceInput) {
            setInputMaxPrice(`${profileData.maxPrice}`);
        }
        if (profileData?.startDay && !isFocusedOpenDayInput) {
            setInputOpenDay(`${profileData.startDay}`);
        }
        if (profileData?.openHour && !isFocusedOpenHourInput) {
            setInputOpenHour(`${profileData.openHour}`);
        }
        if (profileData?.closeHour && !isFocusedCloseHourInput) {
            setInputCloseHour(`${profileData.closeHour}`);
        }
        if (profileData?.bio && !isFocusedPresentationInput) {
            setInputPresentation(`${profileData.bio}`);
        }
        // if (profileData?.images[0].url && !isFocusedImageInput) {
        //     setInputImage(`${profileData.images[0].url}`);
        // }
    }, [
        profileData, 
        isFocusedCityInput, 
        isFocusedPhoneInput, 
        isFocusedMinPriceInput, 
        isFocusedMaxPriceInput,
        isFocusedOpenDayInput,
        isFocusedCloseDayInput,
        isFocusedOpenHourInput,
        isFocusedCloseHourInput,
        isFocusedPresentationInput,
    ]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (inputCity.length >= 3) {
                fetch(`http://localhost:3007/cities/search/${encodeURIComponent(inputCity)}`)
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

    }, [inputCity]);

    const handleSelectCity = (city: City) => {
        setInputCity(`${city.name} - ${city.uf}`); // Set the visible input field to city name and UF
        setSelectedCityId(city.id); // Keep the city ID in state
        setResults([]); // Clear results after selection
    };

    // Atualize handleFormSubmit para enviar a imagem antes do perfil
    const handleFormSubmit = async (data: ProfilePanelInput) => {
        if (!selectedCityId) {
            toast.error("Por favor, selecione uma cidade válida.");
            return;
        }

        // Primeiro, envie a imagem e obtenha a URL
        const imageUrl = await uploadImage();

        if (!imageUrl) {
            toast.error("Erro ao enviar a imagem.");
            return;
        }

        // Se a imagem foi enviada com sucesso, inclua a URL da imagem nos dados do perfil
        const updatedProfile = { ...data, cityId: selectedCityId, imageURL: imageUrl };
        EditProfile(updatedProfile);
    };

    async function getProfile(profileId: ProfileId) {
        const response = await fetch(`http://localhost:3007/profiles/${profileId}`, { cache: 'no-store' });
        const data = await response.json();
        setProfileData(data.data);
    }

    async function EditProfile(data: ProfilePanelInput) {

        const response = await fetch(`http://localhost:3007/profiles/${profileId}`, {
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
            })
        });

        if (response.status === 200) {
            // console.log(response.status)
            // toast.success("Perfil atualizado com sucesso!");
            window.location.reload();
        } else {
            toast.error("Não foi possível editar ou salvar as informações.");
        }
    }

    const handleFocusCityInput = () => {
        if (!isFocusedCityInput) {
            setInputCity(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedCityInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusPhoneInput = () => {
        if (!isFocusedPhoneInput) {
            setInputPhone(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedPhoneInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusMinPriceInput = () => {
        if (!isFocusedMinPriceInput) {
            setInputMinPrice(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedMinPriceInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusMaxPriceInput = () => {
        if (!isFocusedMaxPriceInput) {
            setInputMaxPrice(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedMaxPriceInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusOpenDayInput = () => {
        if (!isFocusedOpenDayInput) {
            setInputOpenDay(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedOpenDayInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusCloseDayInput = () => {
        if (!isFocusedCloseDayInput) {
            setInputCloseDay(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedCloseDayInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusOpenHourInput = () => {
        if (!isFocusedOpenHourInput) {
            setInputOpenHour(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedOpenHourInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusCloseHourInput = () => {
        if (!isFocusedCloseHourInput) {
            setInputCloseHour(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedCloseHourInput(true); // Marca como focado para não limpar novamente
        }
    };

    const handleFocusPresentationInput = () => {
        if (!isFocusedPresentationInput) {
            setInputPresentation(''); // Limpa o input ao focar pela primeira vez
            setIsFocusedPresentationInput(true); // Marca como focado para não limpar novamente
        }
    };

    // console.log(profileData)

    return (
        <div className="lg:min-w-max max-w-full bg-white border-none mb-10">
            <div className="min-w-full w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-wrap mb-4">
                    <h5 className="text-xl font-medium text-gray-500 text-center mb-10">Editar perfil na <span className="text-2xl text-blue-500">CarWash</span></h5>
                    <p className="font-medium text-gray-500 underline underline-offset-8 mb-6">Informações de localidade</p>
                    <div className='w-full'>
                        <div className="inline-flex justify-end float-right ml-30">
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
                                <div className="absolute mt-6 bg-gray-100 text-gray-700 text-xs rounded-lg p-3 shadow-lg z-10 w-64">
                                    A cidade da localização do negócio, no formato de texto - São Paulo.
                                </div>
                            )}
                        </div>
                        <label htmlFor="cityId" className="w-full text-sm font-medium text-gray-500">
                            <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                            Digite sua cidade
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="cityId"
                            className="block p-3 w-full h-14 z-20 text-sm text-gray-500 bg-gray-50 rounded-lg border-gray-300 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            placeholder="São Paulo - SP"
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                            onFocus={handleFocusCityInput}
                            autoComplete="off"
                            required
                        />
                        {results.length > 0 && (
                            <ul className="absolute w-full bg-white shadow-lg max-h-60 overflow-auto z-50 rounded-lg">
                                {results.map((city) => (
                                    <li key={city.id} className="border-b-2 border-gray-200 p-3 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                                        onClick={() => handleSelectCity(city)}>
                                        {city.name} - {city.uf}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <p className="font-medium text-gray-500 underline underline-offset-8 mb-6">Informações de contato</p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">
                                <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                Número WhatsApp

                            </label>
                        </div>
                        <input type="phone" id="phone" value={inputPhone} onFocus={handleFocusPhoneInput}  className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="00988888888"
                            required {...register("phone")} />
                    </div>


                    <div>
                        <p className="font-medium text-gray-500 underline underline-offset-8 mb-6">Informações de valores</p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <ellipse cx="15.5" cy="11" rx="6.5" ry="2" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11" stroke="currentColor" stroke-width="1.5" />
                                    <ellipse cx="8.5" cy="4" rx="6.5" ry="2" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15 6V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                Preço mais baixo

                            </label>
                        </div>
                        <input type="decimal" id="minPrice" value={inputMinPrice} onFocus={handleFocusMinPriceInput} placeholder="80" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("minPrice")} />
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M20.9427 16.8354C20.2864 12.8866 18.2432 9.94613 16.467 8.219C15.9501 7.71642 15.6917 7.46513 15.1208 7.23257C14.5499 7 14.0592 7 13.0778 7H10.9222C9.94081 7 9.4501 7 8.87922 7.23257C8.30834 7.46513 8.04991 7.71642 7.53304 8.219C5.75682 9.94613 3.71361 12.8866 3.05727 16.8354C2.56893 19.7734 5.27927 22 8.30832 22H15.6917C18.7207 22 21.4311 19.7734 20.9427 16.8354Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M13.6267 12.9186C13.4105 12.1205 12.3101 11.4003 10.9892 11.9391C9.66829 12.4778 9.45847 14.2113 11.4565 14.3955C12.3595 14.4787 12.9483 14.2989 13.4873 14.8076C14.0264 15.3162 14.1265 16.7308 12.7485 17.112C11.3705 17.4932 10.006 16.8976 9.85742 16.0517M11.8417 10.9927V11.7531M11.8417 17.2293V17.9927" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Preço mais alto

                            </label>
                        </div>
                        <input type="decimal" id="maxPrice" value={inputMaxPrice} onFocus={handleFocusMaxPriceInput} placeholder="200" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("maxPrice")} />
                    </div>

                    <div>
                        <p className="font-medium text-gray-500 underline underline-offset-8 mb-6">Informações de expediente</p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M17 2V5M7 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.5 8.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 15.5C9 15.5 10.5 16 11 17.5C11 17.5 13.1765 13.5 16 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Dia de abetura

                            </label>
                        </div>
                        <input type="string" id="startDay" value={inputOpenDay} onFocus={handleFocusOpenDayInput} placeholder="Segunda" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("startDay")} />
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M15 9L9 14.9996M15 15L9 9.00039" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                Dia de fechamento

                            </label>
                        </div>
                        <input type="string" id="finalDay" value={inputCloseDay} onFocus={handleFocusCloseDayInput} placeholder="Sexta" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("finalDay")} />
                    </div>

                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Horário de abertura

                            </label>
                        </div>
                        <input type="string" id="openHour" value={inputOpenHour} onFocus={handleFocusOpenHourInput} placeholder="09:00" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("openHour")} />
                    </div>
                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M12 22C6.47715 22 2.00004 17.5228 2.00004 12C2.00004 6.47715 6.47719 2 12 2C16.4777 2 20.2257 4.94289 21.5 9H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21.9551 13C21.9848 12.6709 22 12.3373 22 12M15 22C15.3416 21.8876 15.6753 21.7564 16 21.6078M20.7906 17C20.9835 16.6284 21.1555 16.2433 21.305 15.8462M18.1925 20.2292C18.5369 19.9441 18.8631 19.6358 19.1688 19.3065" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Horário de fechamento

                            </label>
                        </div>
                        <input type="string" id="closeHour" value={inputCloseHour} onFocus={handleFocusCloseHourInput} placeholder="18:00" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("closeHour")} />
                    </div>
                    <div className='break-words text-wrap'>
                        <p className="font-medium text-gray-500 underline underline-offset-8 mb-6">Informações gerais</p>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-500">
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M3 6H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 10H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M13.5 10L21 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 14H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M10 14H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M17 14H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 18H5.11765M8.29412 18H10.4118M13.5882 18H15.7059M18.8824 18H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                Faça uma apresentação

                            </label>
                        </div>
                        <input type="string" id="bio" value={inputPresentation} onFocus={handleFocusPresentationInput} placeholder="Fundada em 2024 a CarWah veio para revolucionar o mercado de Lavagens e Estéticas Automotivas..." className="mb-4 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-20 p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            required {...register("bio")} />
                    </div>

                    <div>
                        <div className="w-full">
                            <div className="inline-flex justify-end float-right ml-30 mb-4">
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
                            <label htmlFor="closeHour" className="block mb-2 text-sm font-medium text-gray-500">
                                <svg className="inline pb-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                    <path d="M11.5085 2.9903C7.02567 2.9903 4.78428 2.9903 3.39164 4.38238C1.99902 5.77447 1.99902 8.015 1.99902 12.4961C1.99902 16.9771 1.99902 19.2176 3.39164 20.6098C4.78428 22.0018 7.02567 22.0018 11.5085 22.0018C15.9912 22.0018 18.2326 22.0018 19.6253 20.6098C21.0179 19.2176 21.0179 16.9771 21.0179 12.4961V11.9958" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M4.99902 20.9898C9.209 16.2385 13.9402 9.93727 20.999 14.6632" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M17.9958 1.99829V10.0064M22.0014 5.97728L13.9902 5.99217" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Imagem de capa

                            </label>
                        </div>
                        <UploadImageDetailsFormInput setImageFile={setSelectedImageFile} initialImageURL={initialImageURL} />
                        {/* <input type="file" accept="image/*"  id="image" className="mb-10 bg-gray-50 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-2 hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out" placeholder="https://www..."
                            required {...register("image")} /> */}
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditDetailsForm;

