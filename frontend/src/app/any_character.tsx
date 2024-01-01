import { API_URL, STATIC_CONTENT_URL } from "@/config";
import { CharacterWithSerieName } from "@/types";
import Image from "next/image";
import { Fragment } from "react";


async function getCharacters() {
    const url = new URL(`${API_URL}/characters/any`)
    url.searchParams.append('limit', '10')
    url.searchParams.append('include_serie_name', 'True')
    const resp = await fetch(url, { next: { revalidate: 60 } })
    const characters = await resp.json() as CharacterWithSerieName[]
    return characters
}

export default async function AnyCharacter() {

    const characters = await getCharacters()

    return (
        <Fragment>
            {characters.map((char, i) => (
                <article key={i} className="grid grid-cols-[1fr_3fr] border border-gray-200 p-4 shadow-lg">
                    <Image className="rounded-full" width={50} height={50} src={STATIC_CONTENT_URL + char.image} alt={char.name} />
                    <div>
                        <h3>{char.name}</h3>
                        <p>{char.personality}</p>
                    </div>
                </article>
            ))}
        </Fragment>
    )
}