import { STATIC_CONTENT_URL } from "@/config";
import { Serie } from "@/types";
import Image from "next/image";
import { Fragment } from "react";

export default function SeriesList({ series }: { series: Serie[] }) {
    return (
        <Fragment>
            {
                series.map((serie) => (
                    <div key={serie.id} className="group">
                        <img key={serie.id} src={`${STATIC_CONTENT_URL}${serie.image}`} alt={serie.name} width={170} className="h-auto" />
                        <span className="absolute transform -translate-x-1/4 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-solid border-1 bg-white p-2 rounded bg-opacity-90">{serie.name}</span>
                    </div>
                ))
            }
        </Fragment>
    )
}