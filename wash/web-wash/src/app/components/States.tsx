'use client'
import { stateProps } from "../page"

import Link from "next/link"

function ItemState({ state }: { state: stateProps }) {

    return (
        <div className="max-w-sm bg-white border border-gray-200">
            <Link href={`estados/${state.name}/${state.id}`}>
                <p>{state.name}</p>
            </Link>
        </div>
    )
}

export default ItemState
