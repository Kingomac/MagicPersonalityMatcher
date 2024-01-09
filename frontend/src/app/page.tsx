import CharacterList from '@/components/character/character_list'
import TextDemo from './text_demo'
import localFont from 'next/font/local'
import { API_URL } from '@/config'
import { CharacterWithSerieName } from '@/types'
import ExampleList from './example_list'

const font = localFont({ src: './fonts/white-star.otf' })


async function getCharacters() {
  const url = new URL(`${API_URL}/characters/any`)
  url.searchParams.append('limit', '10')
  url.searchParams.append('include_serie_name', 'True')
  const resp = await fetch(url, { next: { revalidate: 60 } })
  const characters = await resp.json() as CharacterWithSerieName[]
  return characters
}

export default async function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3-big-center gap-4 md:gap-8 lg:gap-12 justify-items-center">
      <section className='order-2 lg:order-1 lg:justify-self-start m-1'>
        <ExampleList />
      </section>
      <section className='flex flex-col items-center gap-2 order-1 lg:order-2 m-1'>
        <h1 className={`${font.className} rounded text-7xl text-white px-5 py-2 text-center m-3 mb-10 bg-azul-claro leading-loose`}>Magic Personality Matcher</h1>
        <h2 className='text-center mb-10 text-xl leading-loose'>Determina tu personalidad en base al texto que escribes</h2>
        <TextDemo />
      </section>
      <section className='flex flex-col gap-2 order-3 lg:justify-self-end m-2'>
        <CharacterList characters={await getCharacters()} />
      </section>
    </main>
  )
}
