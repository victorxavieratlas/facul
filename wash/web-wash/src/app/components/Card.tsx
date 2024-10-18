'use client'

import { profileProps } from "../estados/[stateName]/[stateId]/cidades/[cityName]/[cityId]/page"
import Link from "next/link"

export default function ItemCard({ profile }: { profile: profileProps }) {
    return (
        <>
            <li className="mb-10">
                <div className="max-w-sm">
                    <Link href={`/${profile.id}`}>
                        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                            {/* Imagem do perfil */}
                            {profile.images[0] ? (
                                <img
                                    className="rounded-t-lg object-cover w-full h-48"
                                    src={profile.images[0].url}
                                    alt="Imagem de perfil da loja"
                                />
                            ) : (
                                // Imagem default
                                <div className="rounded-t-lg bg-gray-200 w-full h-48"></div>
                            )}

                            {/* Conteúdo do card */}
                            <div className="p-5 pt-3">
                                {/* Nome do perfil */}
                                <h5 className="text-xl font-semibold text-gray-900 mb-3">
                                    {profile.name}
                                </h5>

                                {/* Localização */}
                                {profile.profileLocation && (
                                    <p className="text-sm text-gray-600 flex items-center mb-1">
                                        <svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
                                            <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                        {profile.profileLocation[0].neighborhood.name}, {profile.profileLocation[0].address}, {profile.profileLocation[0].addressNumber}
                                    </p>
                                )}

                                {/* Dias e Horários de Funcionamento */}
                                <p className="text-sm text-gray-600 flex items-center mb-2">
                                    <svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {profile.startDay} - {profile.finalDay}, {profile.openHour}h - {profile.closeHour}h
                                </p>

                                {/* Preço */}
                                <p className="text-md text-gray-700 flex items-center my-4">
                                    <span className="font-semibold text-md mr-1">
                                        R${profile.minPrice} - R${profile.maxPrice} 
                                    </span>
                                    serviços
                                </p>

                                {/* Botão de ação */}
                                <div className="w-full flex justify-center mt-5">
                                    <button className="inline-flex items-center w-full p-3 text-sm font-medium justify-center text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300">
                                        <svg className="inline mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                            <path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                        Entrar em contato
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        </>
    )
}
