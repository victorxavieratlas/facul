'use client'
import { stateProps, cityProps } from "../estados/[stateName]/[id]/page"

import Link from "next/link"

function ItemCity({ state, city }: { city: cityProps, state: stateProps }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200">
            <Link href={`/estados/${state.stateName}/${state.id}/cidades/${city.name}/${city.id}`}>
                <p>{city.name}</p>
            </Link>
        </div>
    )
}

export default ItemCity
