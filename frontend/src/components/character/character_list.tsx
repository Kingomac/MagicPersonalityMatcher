import { Character, CharacterWithSerieName } from "@/types";
import CharacterSerieCard from "./character_serie_card";
import CharacterPersonalityCard from "./character_personality_card";
import { Fragment } from "react";

export default function CharacterList({ characters }: { characters: (Character | CharacterWithSerieName)[] }) {

    return (
        <Fragment>
            {characters.map((char, i) => {
                if ('serie_name' in char) {
                    return <CharacterSerieCard key={i} character={char} />
                }
                return <CharacterPersonalityCard key={i} character={char} />
            })}
        </Fragment>
    )
}