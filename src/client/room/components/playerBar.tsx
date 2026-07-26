import {Player} from "../../../shared/Player";
import * as _useContext from "react";
import {useUIState} from "../state";
export type PlayerBarProps = {p: Player[]}
export function PlayerBar() {
    const {state} = useUIState()
    return (
        <section className="lbSection">
            <p id="leaderboard_p"></p>
            <table id='leaderboardID'>
                <tr><td>Player</td><td>Score</td></tr>
                {state.users.map(u => {
                    return (<tr><td>{u.name}</td><td>{u.score}</td></tr>)
                })}
            </table>
        </section>
    );
}
