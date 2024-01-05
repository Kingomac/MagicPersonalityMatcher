import { STATIC_CONTENT_URL } from "@/config";
import { CharacterWithSerieName } from "@/types";
import Image from "next/image";

export default function CharacterSerieCard({ character }: { character: CharacterWithSerieName }) {
    return (
        <article className="grid grid-cols-[1fr_3fr] border border-gray-200 p-5 shadow-lg  bg-white bg-opacity-40">
            <Image className="rounded-full" width={50} height={50} src={`${STATIC_CONTENT_URL}${character.image}`} alt={character.name} />
            <div>
                <h3>{character.name}</h3>
                <p className="text-sm text-gray-500">{character.serie_name}</p>
            </div>
        </article>
    )
}