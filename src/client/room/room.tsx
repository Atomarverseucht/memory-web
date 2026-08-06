import * as _createRoot from "react-dom/client";
import * as _memSets from "../../shared/exampleSets";
import {Board} from "./components/board";
import {ScoreBoard} from "./components/scoreBoard";
import * as _Player from "../../shared/Player";
import {NameSection} from "./components/nameSection";
import {UIProvider, useUIState} from "./state";
import {connectService, connService} from "./connService";
import {useEffect} from "react";
import {ErrorPopup} from "./components/ErrorPopup";

export function Room(){
    return(
        <UIProvider>
            <AppContent />
        </UIProvider>
    );
}

function AppContent() {
    const ctx = useUIState()
    useEffect(() => {
        const url = new URLSearchParams(document.location.search)
        new connectService(+(url.get("memID") ?? "0"), url.get("roomID") ?? undefined)
        connService.setChangeState(ctx.changeState)
        return () => {}
    }, [])
    return (
        <main>
            <NameSection />
            <section className="content">
                <ErrorPopup />
                <Board />
                <ScoreBoard />
            </section>
        </main>
    );
}
