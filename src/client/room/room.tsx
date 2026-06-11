import {createRoot} from "react-dom/client";
import {memSets} from "../../shared/exampleSets";
import {Board} from "./components/board";
import {PlayerBar} from "./components/playerBar";
import {Player} from "../../shared/Player";
import {NameSection} from "./components/nameSection";
import {UIProvider, useUIState} from "./state";
import {connectService, connService} from "./connService";
import {connect} from "node:net";

export function App(){
    return(
        <UIProvider>
            <AppContent />
        </UIProvider>
    );
}

function AppContent() {
    const ctx = useUIState()
    if(connService.roomID === "start") {new connectService()}
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
const players = [new Player("Player1"), new Player("LongExamplePlayerName", 10000000000)]

createRoot(document.getElementById("app")!).render(<App/>);