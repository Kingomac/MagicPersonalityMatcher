"use client"

import { Badge, Divider, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import significadoLetras from "../../data/personality/letras.json"
import descripciones from "../../data/personality/descripciones.json"
import ListaSeries from "./lista_series";
import ListaPersonajes from "./lista_personajes";
import Link from "next/link";

export default function Personality({ params }: { params: { personality: string } }) {

    const significados = params.personality.split('').map((letra, i) => {
        const { text, color }: { text: string, color: string } = significadoLetras[letra as keyof typeof significadoLetras]
        return <Badge textAlign="center" padding={1} backgroundColor={color} key={i}>{text}</Badge>
    })
    const descripcion: { title: string, body: string } = descripciones[params.personality as keyof typeof descripciones]

    return (
        <main>
            <VStack margin={10}>
                <Heading as="h1" size="4xl" textAlign="center">Tu personalidad es {params.personality}</Heading>
                <Heading as="h2" size="md" textAlign="center">Esto es lo que dice de ti:</Heading>
                <SimpleGrid columns={2} spacing={4}>
                    {significados}
                </SimpleGrid>
                <Heading marginTop={10} as="h3">{descripcion.title}</Heading>
                <Text>{descripcion.body}</Text>
                <Divider margin={5} />
                <Heading as="h2" size="lg" textAlign="center">Estos son algunos personajes {params.personality}</Heading>
                <ListaPersonajes personalidad={params.personality} />
                <Divider margin={5} />
                <Heading as="h2" size="lg" textAlign="center">¿Quieres ver qué personajes {params.personality} hay en una serie específica?</Heading>
                <ListaSeries personality={params.personality} />
                <Link href="/">Volver a la página principal</Link>
            </VStack>
        </main>
    )
}