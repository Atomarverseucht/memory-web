import {createRoot} from "react-dom/client";
import {memSets} from "../../shared/exampleSets";
import {Board} from "./components/board";
import {PlayerBar} from "./components/playerBar";
import {Player} from "../../shared/Player";
import {NameSection} from "./components/nameSection";
import {UIProvider, useUIState} from "./state";
import {connectService, connService} from "./connService";
import {useEffect} from "react";

export function App(){
    return(
        <UIProvider>
            <AppContent />
        </UIProvider>
    );
}

function AppContent() {
    const ctx = useUIState()
    useEffect(() => {
        new connectService(+(new URLSearchParams(document.location.search).get("memID") ?? "0"))
        return () => {}
    }, [])
    connService.setChangeState(ctx.changeState)
    return (
        <main>
            <NameSection />
            <section className="content">
                <Board />
                <PlayerBar />
            </section>
        </main>
    );
}

createRoot(document.getElementById("app")!).render(<App/>);