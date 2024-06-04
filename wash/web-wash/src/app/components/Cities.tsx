'use client'
import { stateProps, cityProps } from "../estados/[stateName]/[stateId]/page"

import Link from "next/link"

function ItemCity({ state, city }: { city: cityProps, state: stateProps }) {
    return (
        <div className="text-center max-w-sm bg-white border-none">
            <Link href={`/estados/${state.stateName}/${state.id}/cidades/${city.name}/${city.id}`}>
                <p className="text-md text-gray-600 font-semibold underline underline-offset-1 h-16 sm:h-8">{city.name}</p>
            </Link>
        </div>
    )
}

export default ItemCity
