import { STATIC_CONTENT_URL } from "@/config";
import { Serie } from "@/types";
import Link from "next/link";
import { Fragment } from "react";

export default function SeriesList({ series, personality }: { series: Serie[], personality: string }) {
    return (
        <Fragment>
            {
                series.map((serie) => (
                    <div className="group">
                        <Link key={serie.id} href={`/personality/${personality}/${serie.id}`}>
                            <img src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} width={170} className="h-auto" />
                            <span className="absolute transform -translate-x-1/4 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-solid border-1 bg-white p-2 rounded bg-opacity-90">{serie.name}</span>
                        </Link>
                    </div>
                ))
            }
        </Fragment>
    )
}