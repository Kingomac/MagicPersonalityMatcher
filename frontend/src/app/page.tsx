import AnyCharacter from './any_character'
import TextDemo from './text_demo'
import localFont from 'next/font/local'

const font = localFont({ src: './fonts/white-star.woff2' })

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-2">
      <h1 className={`${font.className} text-6xl text-white px-10 py-5 text-center m-3 bg-azul-claro leading-loose`}>Magic Personality Matcher</h1>
      <div className='grid grid-cols-1 md:grid-cols-3-big-center gap-4 md:gap-8 lg:gap-12'>
        <section className='order-2 md:order-1'>
          <h1>heyy</h1>
        </section>
        <section className='flex flex-col items-center gap-2 order-1 md:order-2'>
          <TextDemo />
        </section>
        <section className='flex flex-col gap-2 order-3'>
          <AnyCharacter />
        </section>
      </div>
    </main>
  )
}
