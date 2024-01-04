import localFont from 'next/font/local'
import significadoLetras from '@/app/data/personality/letras.json'
import descripciones from '@/app/data/personality/descripciones.json'
import { API_URL } from '@/config'
import { CharacterWithSerieName, Serie } from '@/types'
import CharacterList from '@/components/character/character_list'
import SeriesList from '@/components/serie/series_list'

const whiteStar = localFont({ src: '../../fonts/white-star.woff2' })

async function fetchPersonajes(personalidad: string) {
    const resp = await fetch(`${API_URL}/series/any/characters/${personalidad}`)
    return await resp.json() as CharacterWithSerieName[]
}

async function fetchSeries() {
    const req = await fetch(`${API_URL}/series`)
    return await req.json() as Serie[]
}

export default async function Personality({ params }: { params: { personality: string } }) {
    const [personajes, series] = await Promise.all([fetchPersonajes(params.personality), fetchSeries()])

    return (
        <main className='bg-gradient-to-b from-azul-claro from-10% via-azul-claro via-40% to-stone-200 to-80% h-full flex flex-col justify-center items-center gap-5'>
            <section className='w-full mb-10 px-5 flex flex-col md:gap-10 items-center'>
                <h1 className={`${whiteStar.className} text-white p-2 text-4xl md:text-6xl md:mt-10 text-center`}>Tu personalidad es</h1>
                <h2 className={`${whiteStar.className} text-azul-claro hover:bg-opacity-90 duration-300 bg-white rounded p-14 text-center text-6xl md:text-8xl`}>{params.personality}</h2>
                <div className='grid grid-cols-2 md:flex md:flex-cols md:flex-wrap w-fit-content grid-rows-2 justify-center gap-2 mt-5'>
                    {
                        params.personality.split('').map((letra, i) => {
                            const { text, color }: { text: string, color: string } = significadoLetras[letra as keyof typeof significadoLetras]
                            return <div className='text-center rounded p-1 text-white hover:bg-white hover:text-azul-claro duration-300 border-solid border-2 border-white' key={i}>{text}</div>
                        })
                    }
                </div>
            </section>
            <section className='bg-white flex flex-col mx-2 flex-wrap p-2 rounded bg-opacity-50 gap-5 shadow-lg'>
                <section className='grid grid-cols-2 gap-2'>
                    <article className='mx-2 lg:mx-0 px-4 flex flex-col gap-4 bg-gray-100 bg-opacity-50 rounded py-5 shadow-lg'>
                        <h2 className={`${whiteStar.className} p-4 bg-white bg-opacity-40 rounded text-4xl text-center`}>{descripciones[params.personality as keyof typeof descripciones].title}</h2>
                        {descripciones[params.personality as keyof typeof descripciones].body.split('\n').map((p, i) => <p className='text-justify bg-white bg-opacity-40 p-2 rounded' key={i}>{p}</p>)}
                    </article>
                    <article className='h-min mx-2 lg:mx-0 px-4 flex flex-col gap-4 bg-gray-100 bg-opacity-50 rounded py-5 shadow-lg'>
                        <h2 className={`${whiteStar.className} p-4 bg-white bg-opacity-40 rounded text-4xl text-center`}>Personajes con esta personalidad</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <CharacterList characters={personajes} />
                        </div>
                    </article>
                </section>
                <section>
                    <article className='mx-2 px-4 flex flex-col gap-4 bg-gray-100 bg-opacity-50 rounded py-5 shadow-lg'>
                        <h2 className={`${whiteStar.className} p-4 bg-white bg-opacity-40 rounded text-4xl text-center`}>¿Quieres ver que personaje serías de una serie concreta?</h2>
                        <div className='gap-4 columns-2 md:columns-4 lg:columns-8 [&>div:not(:first-child)]:mt-8 bg-white bg-opacity-40 p-4 rounded'>
                            {/*<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-2'>*/}
                            <SeriesList series={series} />
                        </div>
                    </article>
                </section>
            </section>

        </main>
    )
}