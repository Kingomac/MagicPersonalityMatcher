"use client"

import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { API_URL, STATIC_CONTENT_URL } from "../../../../config";
import { useEffect, useRef, useState } from "react";

type Serie = {
    id: number,
    name: string,
    image: string
}

export default function ListaSeries() {

    const [isLoading, setIsLoading] = useState(true)
    const [series, setSeries] = useState([] as Serie[])

    useEffect(() => {
        setIsLoading(true)
        const getSeries = async () => {
            const req = await fetch(`${API_URL}/series`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            const data = await req.json() as Serie[]
            return data
        }
        getSeries().then((resp) => {
            if (resp == undefined) console.log("RESP IS UNDEFINED")
            setSeries(resp)
            setIsLoading(false)
        })
    }, [])

    if (isLoading)
        return <Spinner />

    return (
        <SimpleGrid columns={2} spacing={4}>
            {
                series.map((serie, i) => (
                    <div key={i}>
                        <img src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} />
                    </div>
                ))
            }
        </SimpleGrid>
    )
}