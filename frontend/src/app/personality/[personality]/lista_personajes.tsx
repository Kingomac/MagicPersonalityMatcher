import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../config";
import { CharacterWithSerieName } from "@/app/types";


export default function ListaPersonajes({ personalidad }: { personalidad: string }) {

    const [personajes, setPersonajes] = useState([] as CharacterWithSerieName[])
    const [isLoading, setIsLoading] = useState(true)

    const fetchPersonajes = async () => {
        setIsLoading(true)
        const resp = await fetch(`${API_URL}/series/any/characters/${personalidad}`)
        const data = await resp.json() as CharacterWithSerieName[]
        setPersonajes(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchPersonajes()
    }, [])

    if (isLoading)
        return <Spinner />

    return (
        <HStack wrap="wrap" justifyContent="center">
            {
                personajes.map((p, i) => (
                    <Card key={i} direction="row" width={400} height={100} alignContent="center" justifyContent="center" display="grid" gridTemplateColumns="25% 75%">
                        <CardHeader gridRow={1} gridColumn={1}>
                            <Avatar src={`${STATIC_CONTENT_URL}${p.image}`} name={p.name} />
                        </CardHeader>
                        <CardBody gridRow={1} gridColumn={2}>
                            <Text>{p.name}</Text>
                            <Text fontSize="smaller" textColor="GrayText">{p.serie_name}</Text>
                        </CardBody>
                    </Card>
                ))
            }
        </HStack>
    )
}