import { API_URL } from "@/config"
import { Character, Serie } from "@/types"
import localFont from "next/font/local"

const whiteStar = localFont({ src: '../../../fonts/white-star.otf' })

async function fetchPersonajes(serie_id: number, personality: string) {
    const resp = await fetch(`${API_URL}/series/${serie_id}/characters/${personality}`)
    return await resp.json() as Character[]
}

async function fetchDatosSerie(serie_id: number) {
    const resp = await fetch(`${API_URL}/series/${serie_id}`)
    return await resp.json() as Serie
}

export default async function SeriePersonality({ params }: { params: { personality: string, serie_id: number } }) {

    const [personajes, serie] = await Promise.all([fetchPersonajes(params.serie_id, params.personality), fetchDatosSerie(params.serie_id)])

    return (
        <main>
            <h1 className={`${whiteStar.className} text-4xl`}>{serie.name}</h1>
        </main>
    )

}

/**
 * 
 * export default function CharactersWithPersonality({ params }: { params: { serie_id: number, personality: string } }) {

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
 */