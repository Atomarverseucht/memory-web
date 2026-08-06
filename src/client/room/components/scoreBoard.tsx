import {Player} from "../../../shared/Player";
import * as _useContext from "react";
import {useUIState} from "../state";
import {Link} from "react-router-dom";
export function ScoreBoard() {
    const {state} = useUIState()
    return (
        <section className="lbSection">
            <p id="leaderboard_p"></p>
            <section id='leaderboardID'>
                <section id='titleScores'> <section>Player</section>
                    <section>Score</section> </section>
                {state.users.map(u => {
                    const isSelf =  u.id === state.ownId
                    // @ts-ignore
                    return (<Link className= {`${u.type}-score` } to={u.accountId ? "/account?accountId=" + u.accountId : null}>
                        <section>{u.name} {(isSelf)?"(you)":""}</section>
                        <section>{u.score}</section>
                    </Link>)
                })}
            </section>
        </section>
    );
}
