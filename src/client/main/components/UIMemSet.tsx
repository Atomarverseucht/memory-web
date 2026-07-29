import * as _type_MemorySet from "../../../shared/MemorySet";
import type {startPayload} from "../../../shared/Payload";
import {Link} from "react-router-dom";
import {randomString} from "../../room/connService";
export type Props = {memSet: startPayload};
export default function UIMemSet({ memSet }: Props) {
    return (
        <section className="select-memory" id="themeId">
            { memSet.sets.map((set , indx) => (
                <Link className="memory-set" to={`/room/?roomID=${randomString()}&memID=${indx}`}>
                    <img src={set.titlePicture.picture} alt={set.titlePicture.altText} />
                    <p>{set.name}</p>
                </Link>
            ))}
        </section>
    )
}
