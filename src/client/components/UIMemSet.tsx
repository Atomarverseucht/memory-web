import type {MemorySet} from "../../shared/MemorySet";
export type Props = {memSet: MemorySet[]};
export default function UIMemSet({ memSet }: Props) {
    return (
        <section className="select-memory" id="theme">
            { memSet.map((mem: MemorySet) => (
                <a className="memory-set" href="/room">
                    <img src={mem.titlePicture.picture} alt={mem.titlePicture.altText} />
                    <p>{mem.name}</p>
                </a>
            ))}
        </section>
    )
}