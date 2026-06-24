import type {MemorySet} from "../../shared/MemorySet";
import type {startPayload} from "../../shared/Payload";
export type Props = {memSet: startPayload};
export default function UIMemSet({ memSet }: Props) {
    return (
        <section className="select-memory" id="theme">
            { memSet.sets.map((set , indx) => (
                <a className="memory-set" href={`/room/?memID=${indx}`}>
                    <img src={set.titlePicture.picture} alt={set.titlePicture.altText} />
                    <p>{set.name}</p>
                </a>
            ))}
        </section>
    )
}