import CharacterList from '@/components/character/character_list'
import TextDemo from './text_demo'
import localFont from 'next/font/local'
import { API_URL } from '@/config'
import { CharacterWithSerieName } from '@/types'

const font = localFont({ src: './fonts/white-star.woff2' })


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
    <main className="grid grid-cols-1 lg:grid-cols-3-big-center gap-4 md:gap-8 lg:gap-12">
      <section className='order-2 lg:order-1 m-1'>
        <h1>heyy</h1>
      </section>
      <section className='flex flex-col items-center gap-2 order-1 lg:order-2 m-1'>
        <h1 className={`${font.className} rounded text-7xl text-white px-5 py-2 text-center m-3 mb-10 bg-azul-claro leading-loose`}>Magic Personality Matcher</h1>
        <h2 className='text-center mb-10 text-xl leading-loose'>Determina tu personalidad en base al texto que escribes</h2>
        <TextDemo />
      </section>
      <section className='flex flex-col gap-2 order-3 lg:justify-self-end m-2 lg:m-2 md:mx-5'>
        <CharacterList characters={await getCharacters()} />
      </section>
    </main>
  )
}
