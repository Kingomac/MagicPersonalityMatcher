"use client"
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import loadingTexts from "./data/loadingTexts.json";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

export default function TextDemo() {

    const [texto, setTexto] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)])
    }, [loading])

    const router = useRouter()

    const handleTextareaInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTexto(e.target.value)
    }

    const handleTransformButtonClick = async () => {
        setLoading(true)
        const resp = await fetch(`${API_URL}/personality`, {
            method: 'POST',
            body: JSON.stringify({ text: texto }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json() as { personality: string }
        setTimeout(() => {
            router.push(`/personality/${data.personality}`)
        }, Math.random() * 3000 + 1000);
    }

    return (
        <Fragment>
            <textarea onInput={handleTextareaInputChange} className="w-full h-96 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <button className="bg-azul-claro text-white px-5 py-3 rounded font-bold hover:bg-azul-claro-hover" onClick={handleTransformButtonClick}>Transformar</button>
            <dialog open={loading}>
                <span>{loadingText}</span>
                <progress></progress>
            </dialog>
        </Fragment>
    )
}