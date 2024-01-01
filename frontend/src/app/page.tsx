import AnyCharacter from './any_character'
import TextDemo from './text_demo'
import localFont from 'next/font/local'

const font = localFont({ src: './fonts/white-star.woff2' })

export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3-big-center gap-4 md:gap-8 lg:gap-12 justify-self-start">
      <section className='order-2 lg:order-1 m-1'>
        <h1>heyy</h1>
      </section>
      <section className='flex flex-col items-center gap-2 order-1 lg:order-2 m-1'>
        <h1 className={`${font.className} rounded text-7xl text-white px-5 py-2 text-center m-3 mt-20 mb-10 bg-azul-claro leading-loose`}>Magic Personality Matcher</h1>
        <h2 className='text-center mb-10 text-xl leading-loose'>Determina tu personalidad en base al texto que escribes</h2>
        <TextDemo />
      </section>
      <section className='flex flex-col gap-2 order-3 justify-self-end m-1'>
        <AnyCharacter />
      </section>
    </main>
  )
}
