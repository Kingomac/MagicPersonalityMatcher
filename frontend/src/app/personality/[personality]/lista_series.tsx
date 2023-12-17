"use client"

import { Box, Card, CardBody, CardHeader, Center, Image, Img, SimpleGrid, Spinner, Tooltip } from "@chakra-ui/react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../config";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Serie } from "@/app/types";

export default function ListaSeries({ personality }: { personality?: string }) {

    const [isLoading, setIsLoading] = useState(true)
    const [series, setSeries] = useState([] as Serie[])

    const fetchSeries = async () => {
        setIsLoading(true)
        const url = new URL(`${API_URL}/series`)
        console.log("fetching:", url.toString())
        const req = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const data = await req.json() as Serie[]
        setIsLoading(false)
        return data
    }
    useEffect(() => {
        setIsLoading(true)
        fetchSeries().then((resp) => {
            if (resp == undefined) console.log("RESP IS UNDEFINED")
            setSeries(resp)
            setIsLoading(false)
        })
    }, [])

    if (isLoading)
        return (
            <Center>
                <Spinner size="xl" />
            </Center>
        )

    if (personality == undefined)
        return (
            <SimpleGrid columns={{ "base": 2, "sm": 3, "md": 4, "lg": 5 }} spacing={4} placeItems="center">
                {
                    series.map((serie) => (
                        <Tooltip key={serie.id} label={serie.name} aria-label={serie.name}>
                            <Image src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} width={200} fit="scale-down" />
                        </Tooltip>
                    ))
                }
            </SimpleGrid>
        )
    return (
        <SimpleGrid columns={{ "base": 2, "sm": 3, "md": 4, "lg": 5 }} spacing={4} placeItems="center">
            {
                series.map((serie, i) => (
                    <Tooltip key={i} label={serie.name} aria-label={serie.name}>
                        <Link href={`/personality/${personality}/${serie.id}`}>
                            <Image src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} width={200} fit="scale-down" />
                        </Link>
                    </Tooltip>
                ))
            }
        </SimpleGrid>
    )
}