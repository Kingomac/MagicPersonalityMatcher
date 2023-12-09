"use client"

import { Box, Card, CardBody, CardHeader, Image, Img, SimpleGrid, Spinner, Tooltip } from "@chakra-ui/react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../config";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Serie } from "@/app/types";

export default function ListaSeries({ personality }: { personality?: string }) {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const boxRef = useRef<HTMLDivElement>(null)
    const offset = useRef(0)

    const [isLoading, setIsLoading] = useState(true)
    const [series, setSeries] = useState([] as Serie[])

    const fetchSeries = async (offset: number) => {
        setIsLoading(true)
        const url = new URL(`${API_URL}/series`)
        url.searchParams.append('offset', offset.toString())
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
        fetchSeries(offset.current).then((resp) => {
            if (resp == undefined) console.log("RESP IS UNDEFINED")
            setSeries(resp)
            setIsLoading(false)
            offset.current += 10
        })
    }, [])

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (entries[0].isIntersecting) {
                fetchSeries(offset.current).then((resp) => {
                    if (resp == undefined || resp.length === 0) {
                        observer.disconnect()
                    }
                    setSeries((prevSeries) => [...prevSeries, ...resp])
                    setIsLoading(false)
                    offset.current += 10
                })
            }
        }
        const observer = new IntersectionObserver(observerCallback, observerOptions)
        if (boxRef.current) {
            observer.observe(boxRef.current)
        }
    }, [boxRef.current])

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
                <Box width="100%" height={50} ref={boxRef}></Box>
                {isLoading && <Spinner size="xl" />}
            </SimpleGrid>
        )
    return (
        <SimpleGrid columns={{ "base": 2, "sm": 3, "md": 4, "lg": 5 }} spacing={4} placeItems="center">
            {
                series.map((serie) => (
                    <Tooltip key={serie.id} label={serie.name} aria-label={serie.name}>
                        <Link href={`/personality/${personality}/${serie.id}`}>
                            <Image src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} width={200} fit="scale-down" />
                        </Link>
                    </Tooltip>
                ))
            }
            <Box width="100%" height={50} ref={boxRef}></Box>
            {isLoading && <Spinner size="xl" />}
        </SimpleGrid>
    )
}