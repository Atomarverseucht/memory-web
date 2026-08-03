import {Player} from "../../../shared/Player";
import {useContext} from "react";
import {useUIState} from "../state";
export type PlayerBarProps = {p: Player[]}
export function PlayerBar() {
    const {state} = useUIState()
    return (
        <section className="lbSection">
            <p id="leaderboard_p"></p>
            <section id='leaderboardID'>
                <section id='titleScores'> <section>Player</section>
                    <section>Score</section> </section>
                {state.users.map(u => {
                    const isSelf =  u.id === state.ownId
                    return (<section className= {`${u.type}-score`}>
                        <section>{u.name} {(isSelf)?"(you)":""}</section>
                        <section>{u.score}</section> </section>)
                })}
            </section>
        </section>
    );
}