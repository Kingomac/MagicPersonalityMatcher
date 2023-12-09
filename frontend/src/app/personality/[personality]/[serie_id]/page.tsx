"use client"
import { Character, Serie } from "@/app/types";
import { Avatar, Box, Card, CardBody, CardHeader, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { use, useEffect, useRef, useState } from "react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../../config";
import Link from "next/link";

export default function CharactersWithPersonality({ params }: { params: { serie_id: number, personality: string } }) {

    const [personajes, setPersonajes] = useState([] as Character[]);
    const [serie, setSerie] = useState({} as Serie);

    const fetchPersonajes = async () => {
        const url = new URL(`${API_URL}/series/${params.serie_id}/characters/${params.personality}`)
        const resp = await fetch(url)
        const data = await resp.json() as Character[]
        setPersonajes(data)
    }

    const fetchDatosSerie = async () => {
        const url = new URL(`${API_URL}/series/${params.serie_id}`)
        const resp = await fetch(url)
        const data = await resp.json() as Serie
        setSerie(data)
    }

    useEffect(() => {
        fetchDatosSerie()
        fetchPersonajes()
    }, [])

    return (
        <VStack margin={10}>
            <Heading as="h1" size="4xl" textAlign="center">Personajes de {serie.name} con personalidad {params.personality}</Heading>
            <HStack wrap="wrap" justifyContent="center">
                {
                    personajes.map((pers, i) => (
                        <Card key={i} direction="row" width={400} height={100} alignContent="center" justifyContent="center" display="grid" gridTemplateColumns="25% 75%">
                            <CardHeader gridRow={1} gridColumn={1}>
                                <Avatar src={`${STATIC_CONTENT_URL}${pers.image}`} name={pers.name} />
                            </CardHeader>
                            <CardBody gridRow={1} gridColumn={2}>
                                <Text>{pers.name}</Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </HStack>
            <Link href="/">Volver a la página principal</Link>
        </VStack>
    )
}