'use client'
import Processor from "postcss/lib/processor"
import { profileProps } from "../estados/[stateName]/[stateId]/cidades/[cityName]/[cityId]/page"

import Link from "next/link"
import Profile from "./Profile"
// import Image from "next/image"

export default function ItemCard({ profile }: { profile: profileProps }) {

    Profile({ profile })
    return (
        <li className="mb-10">
            <div className="max-w-sm">
                <Link href={`/${profile.id}`}>
                    <div>
                        <div className="max-w-sm min-h-max max-h-max bg-gray-100 rounded-lg shadow">
                            <img
                                className="rounded-t-lg object-cover w-full min-h-60 max-h-60"
                                src={profile.images[0].url}
                                alt="Imagem de perfil da loja"
                            />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{profile.name}</h5>
                                <p className="mb-3 min-h-20 font-normal text-gray-700">{profile.bio}</p>
                                <p className="mb-3 h-10 font-normal text-gray-700">Aberto de {profile.startDay} à {profile.finalDay}</p>
                                <div className="w-full flex justify-end">
                                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg">
                                        Serviços  de  R${profile.minPrice}  à  R${profile.maxPrice}
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </li>
    )
}
