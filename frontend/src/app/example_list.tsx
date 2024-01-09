import { API_URL } from "@/config";
import { Fragment } from "react";

export default async function ExampleList() {
    const req = await fetch(`${API_URL}/examples/7`, { next: { revalidate: 60 } });
    const examples = await req.json() as { n: { 0: string, 1: string } };

    return (
        <ul className="flex flex-col gap-2">
            {Object.values(examples).map((example, i) => (
                <li key={i} className="border border-gray-200 p-5 shadow-lg flex flex-col justify-content-center items-center gap-2">
                    <span>
                        {example[1]}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-azul-claro text-white">{example[0]}
                    </span>
                </li>
            ))}
        </ul>
    )
}