'use client'
import { stateProps } from "../page"

import Link from "next/link"

function ItemState({ state }: { state: stateProps }) {

    return (
        <div className="max-w-sm bg-white border-none">
            <Link href={`estados/${state.name}/${state.id}`}>
                <p className="text-md text-gray-600 font-semibold underline underline-offset-1 h-12 sm:h-8">{state.name}</p>
            </Link>
        </div>
    )
}

export default ItemState
