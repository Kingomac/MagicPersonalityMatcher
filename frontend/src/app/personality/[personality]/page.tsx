"use client"

import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import significadoLetras from "../../data/personality/letras.json"
import descripciones from "../../data/personality/descripciones.json"

export default function Personality({ params }: { params: { personality: string } }) {

    const significados = params.personality.split('').map((letra, i) => <Text key={i}>{significadoLetras[letra as keyof typeof significadoLetras]}</Text>)
    const descripcion: { title: string, body: string } = descripciones[params.personality as keyof typeof descripciones]

    return (
        <main>
            <VStack margin={10}>
                <Heading as="h1" size="4xl" textAlign="center">Tu personalidad es {params.personality}</Heading>
                <Heading as="h2" size="md" textAlign="center">Esto es lo que dice de ti:</Heading>
                <SimpleGrid columns={2} spacing={10}>
                    {significados}
                </SimpleGrid>
                <Heading marginTop={10} as="h3">{descripcion.title}</Heading>
                <Text>{descripcion.body}</Text>
            </VStack>
        </main>
    )
}