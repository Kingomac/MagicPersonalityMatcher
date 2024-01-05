import CharacterList from "@/components/character/character_list"
import { API_URL, STATIC_CONTENT_URL } from "@/config"
import { Character, Serie } from "@/types"
import localFont from "next/font/local"
import Image from "next/image"

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
        <main className="bg-gradient-to-b min-h-[100vh] from-azul-claro from-10% via-azul-claro via-40% to-stone-200 to-80% h-full flex flex-col items-center gap-5">
            <div className="border-solid border-white border-2 rounded flex flex-col items-center border-opacity-50 bg-white bg-opacity-20 m-2">
                <h1 className={`${whiteStar.className} text-white text-6xl p-10`}>Personajes {params.personality} de</h1>
                <h1 className={`${whiteStar.className} text-white text-6xl p-10 bg text-center leading-loose`}>{serie.name}</h1>
            </div>
            <section className="flex flex-row flex-wrap gap-5 justify-center m-5 bg-white bg-opacity-30 p-5 rounded shadow-lg md:max-w-3xl">
                {personajes.map((pers, i) => (
                    <article className="flex flex-col items-center gap-2 bg-white bg-opacity-50 p-2 rounded shadow-lg w-[200px]" key={i}>
                        <Image className="rounded-full shadow-lg" width={100} height={100} src={`${STATIC_CONTENT_URL}${pers.image}`} alt={pers.name} />
                        <h2 className={`${whiteStar.className} text-gray-500 text-2xl p-3 bg-white rounded bg-opacity-20`}>{pers.name}</h2>
                    </article>
                ))}
            </section>
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