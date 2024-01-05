import { STATIC_CONTENT_URL } from "@/config";
import { Character } from "@/types";
import Image from "next/image";

export default function CharacterPersonalityCard({ character }: { character: Character }) {

    return (
        <article className="grid grid-cols-[1fr_3fr] border border-gray-200 p-5 shadow-lg">
            <Image className="rounded-full" width={50} height={50} src={`${STATIC_CONTENT_URL}${character.image}`} alt={character.name} />
            <div>
                <h3>{character.name}</h3>
                <p>{character.personality}</p>
            </div>
        </article>
    )
}