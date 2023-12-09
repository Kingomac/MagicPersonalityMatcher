"use client"

import { Avatar, Card, CardBody, CardFooter, CardHeader, Tooltip, VStack } from "@chakra-ui/react"
import { Character, CharacterWithSerieName } from "./types"
import { useEffect, useState } from "react"
import { API_URL, STATIC_CONTENT_URL } from "../../config"

export default function AnyCharacterList({ limit }: { limit: number }) {

    const [characters, setCharacters] = useState([] as CharacterWithSerieName[])

    const fetchCharacters = async () => {
        const url = new URL(`${API_URL}/characters/any`)
        url.searchParams.append('limit', limit.toString())
        url.searchParams.append('include_serie_name', 'True')
        const resp = await fetch(url)
        const data = await resp.json() as CharacterWithSerieName[]
        console.log(data)
        setCharacters(data)
    }

    useEffect(() => {
        fetchCharacters()
    }, [])

    return (
        <VStack>
            {
                characters.map((char, i) => (
                    <Card key={i} direction="row" width={400} height={100} alignContent="center" justifyContent="center" display="grid" gridTemplateColumns="25% 75%">
                        <CardHeader>
                            <Avatar width={75} height={75} src={`${STATIC_CONTENT_URL}${char.image}`} name={char.name} />
                        </CardHeader>
                        <CardBody>
                            <Tooltip label={char.serie_name} aria-label={char.serie_name}>
                                {char.name}
                            </Tooltip>
                            <CardFooter>
                                {char.personality}
                            </CardFooter>
                        </CardBody>
                    </Card>
                ))
            }
        </VStack>
    )
}