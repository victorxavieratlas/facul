'use client'
import { stateProps, cityProps } from "../estados/[stateSlug]/[stateId]/page"
import { slugify } from '../utils/slugify';

import Link from "next/link"

function ItemCity({ state, city }: { city: cityProps, state: stateProps }) {
    const stateSlug = slugify(state.name);
    const citySlug = slugify(city.name);

    return (
        <div className="text-center max-w-sm bg-white border-none">
            <Link href={`/estados/${stateSlug}/${state.id}/cidades/${citySlug}/${city.id}`}>
                <p className="text-md text-gray-600 font-semibold underline underline-offset-1 h-16 sm:h-8">{city.name}</p>
            </Link>
        </div>
    )
}

export default ItemCity
