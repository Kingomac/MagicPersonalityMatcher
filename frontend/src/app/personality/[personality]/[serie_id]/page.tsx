"use client"
import { Character, Serie } from "@/app/types";
import { Avatar, Box, Card, CardBody, CardHeader, Center, HStack, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { use, useEffect, useRef, useState } from "react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../../config";
import Link from "next/link";

export default function CharactersWithPersonality({ params }: { params: { serie_id: number, personality: string } }) {

    const [personajes, setPersonajes] = useState([] as Character[]);
    const [serie, setSerie] = useState({} as Serie);

    const [loading, setLoading] = useState(0)

    const fetchPersonajes = async () => {
        const url = new URL(`${API_URL}/series/${params.serie_id}/characters/${params.personality}`)
        const resp = await fetch(url)
        const data = await resp.json() as Character[]
        setPersonajes(data)
        setLoading((prev) => prev + 1)
    }

    const fetchDatosSerie = async () => {
        const url = new URL(`${API_URL}/series/${params.serie_id}`)
        const resp = await fetch(url)
        const data = await resp.json() as Serie
        setSerie(data)
        setLoading((prev) => prev + 1)
    }

    useEffect(() => {
        fetchDatosSerie()
        fetchPersonajes()
    }, [])

    if (loading < 2) return (
        <Center height="100vh">
            <Spinner size="xl" />
        </Center>
    )

    return (
        <VStack margin={10}>
            <Heading as="h1" size="xl" textAlign="center">Personajes de</Heading>{/* {serie.name}<br />con personalidad<br />{params.personality}</Heading>-- */}
            <Heading as="h2" size="2xl" textAlign="center">{serie.name}</Heading>
            <Image src={`${STATIC_CONTENT_URL}${serie.image}`} width={400} height={400} alt={serie.name} />
            <Heading as="h3" size="xl" textAlign="center">con personalidad</Heading>
            <Heading as="h4" size="2xl" textAlign="center">{params.personality}</Heading>
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