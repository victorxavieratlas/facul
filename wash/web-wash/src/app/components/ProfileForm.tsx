'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import Cookies from 'js-cookie'

interface City {
    id: number;
    uf: string;
    name: string;
    stateId: number;
}

interface ProfilePanelInput {
    image: string;
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

interface ProfileIncomplete {
    id: number;
}

const ProfileForm = ({ profileIncomplete }: { profileIncomplete: ProfileIncomplete }) => {
    const { register, handleSubmit, setFocus } = useForm<ProfilePanelInput>();
    const router = useRouter();

    const [input, setInput] = useState('');
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [results, setResults] = useState<City[]>([]);

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

    const handleSelectCity = (city: City) => {
        setInput(`${city.name} - ${city.uf}`); // Set the visible input field to city name and UF
        setSelectedCityId(city.id); // Keep the city ID in state
        setResults([]); // Clear results after selection
    };

    const handleFormSubmit = (data: ProfilePanelInput) => {
        if (selectedCityId) {
            const updatedProfile = { ...data, cityId: selectedCityId };
            EditProfile(updatedProfile);
        } else {
            toast.error("Por favor, selecione uma cidade válida.");
        }
    };

    async function EditProfile(data: ProfilePanelInput) {
        const response = await fetch(`http://localhost:3007/profiles/${profileIncomplete.id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `${Cookies.get("x-access-token")}`
             },
            body: JSON.stringify({
                imageURL: data.image,
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
            console.log(response.status)
            // toast.success("Perfil atualizado com sucesso!");
            window.location.reload();
        } else {
            toast.error("Não foi possível editar ou salvar as informações.");
        }
    }

    return (
        <div className="max-w bg-white border-none">
            <div className="min-w-full w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 text-center">Complete seu perfil na <span className="text-2xl text-blue-500">CarWash</span></h5>
                    
                    <label htmlFor="cityId" className="block mb-1 text-sm font-medium text-gray-900">Escolha a sua cidade</label>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="cityId"
                            className="block p-3 w-full h-14 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                            placeholder="Selecionar cidade"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoComplete="off"
                            required
                        />
                        {results.length > 0 && (
                            <ul className="absolute w-full max-w-lg bg-white shadow-lg max-h-60 overflow-auto z-50 rounded-lg">
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
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">URL da imagem</label>
                        <input type="string" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://www..."
                            required {...register("image")} />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Seu telefone WhatsApp</label>
                        <input type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="53999999999"
                            required {...register("phone")} />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900">Adicione uma descrição</label>
                        <input type="string" id="bio" placeholder="Conte sobre o seu negócio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-20 p-2.5"
                            required {...register("bio")} />
                    </div>

                    <div>
                        <label htmlFor="minPrice" className="block mb-2 text-sm font-medium text-gray-900">Seu menor preço</label>
                        <input type="decimal" id="minPrice" placeholder="O menor valor dos seus serviços" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("minPrice")} />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium text-gray-900">Seu maior preço</label>
                        <input type="decimal" id="maxPrice" placeholder="O maior valor dos seus serviços" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("maxPrice")} />
                    </div>

                    <div>
                        <label htmlFor="startDay" className="block mb-2 text-sm font-medium text-gray-900">Dia de abetura</label>
                        <input type="string" id="startDay" placeholder="Segunda" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("startDay")} />
                    </div>
                    <div>
                        <label htmlFor="finalDay" className="block mb-2 text-sm font-medium text-gray-900">Dia de fechamento</label>
                        <input type="string" id="finalDay" placeholder="Sexta" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("finalDay")} />
                    </div>

                    <div>
                        <label htmlFor="openHour" className="block mb-2 text-sm font-medium text-gray-900">Horário de abertura</label>
                        <input type="string" id="openHour" placeholder="09:00" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("openHour")} />
                    </div>
                    <div>
                        <label htmlFor="closeHour" className="block mb-2 text-sm font-medium text-gray-900">Horário de fechamento</label>
                        <input type="string" id="closeHour" placeholder="18:00" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required {...register("closeHour")} />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Completar</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;

