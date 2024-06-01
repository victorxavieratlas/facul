'use client'
import { profileProps } from "../estados/[stateName]/[stateId]/cidades/[cityName]/[cityId]/page"

import Link from "next/link"

export default function Profile({ profile }: { profile: profileProps }) {

    // Profile({profile})
    return (
        <h1 className="text-5xl font-extrabold text-gray-800 text-balance">
        <span className="clear-left block mb-4">Encontre</span> <span className="clear-left block mb-4">lavagens e estéticas automotivas</span> na <span className="text-5xl font-extrabold text-blue-500">{profile.name}</span>
    </h1>
    )
}
