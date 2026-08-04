import {useUIState} from "../state";

export function ErrorPopup() {
    const error = useUIState().state.error;
    return (
        error ? <section className="error-popup"> <h2>Error {error.code}: {error.type}</h2>
            <p> {error.message} </p></section> : null
    )
}