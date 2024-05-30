'use client'
import { profileProps } from "../estados/[stateName]/[id]/cidades/[cityName]/[cityId]/page"

import Link from "next/link"
// import Image from "next/image"

export default function Profile({ profile }: { profile: profileProps }) {
    return (
        <div>
            <p>{profile.name}</p>
        </div>
    )
}
