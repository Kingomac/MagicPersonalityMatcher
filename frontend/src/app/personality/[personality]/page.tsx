import localFont from 'next/font/local'
import significadoLetras from '@/app/data/personality/letras.json'
import descripciones from '@/app/data/personality/descripciones.json'

const whiteStar = localFont({ src: '../../fonts/white-star.woff2' })

export default function Personality({ params }: { params: { personality: string } }) {

    return (
        <main>
            <section className='bg-azul-claro w-full min-h-[70vh] p-5 flex items-center justify-center flex-col mb-5'>
                <h1 className={`${whiteStar.className} text-white p-2 mt-20 text-6xl text-center leading-loose`}>Tu personalidad es</h1>
                <h2 className={`${whiteStar.className} text-white p-2 text-center text-8xl leading-loose`}>{params.personality}</h2>
                <div className='flex gap-2 mt-20'>
                    {
                        params.personality.split('').map((letra, i) => {
                            const { text, color }: { text: string, color: string } = significadoLetras[letra as keyof typeof significadoLetras]
                            const dynclass = ``
                            return <div className='text-center rounded p-1 bg-white border-solid border-2 border-white' key={i}>{text}</div>
                        })
                    }
                </div>
            </section>
            <article className='max-w-3xl mx-auto px-4 flex flex-col gap-4'>
                <h1 className='text-4xl text-center'>{descripciones[params.personality as keyof typeof descripciones].title}</h1>
                {descripciones[params.personality as keyof typeof descripciones].body.split('\n').map((p, i) => <p className='text-justify' key={i}>{p}</p>)}
            </article>
        </main>
    )
}