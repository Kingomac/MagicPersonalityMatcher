export type Serie = {
    id: number,
    name: string,
    image: string
}

export type CharacterWithSerieName = {
    id: number,
    image: string,
    name: string,
    personality: string,
    serie_name: string
}

export type Character = {
    id: number,
    image: string,
    name: string,
    personality: string
}

