import {Player} from "../../../shared/Player";
export type PlayerBarProps = {p: Player[]}
export function PlayerBar({p}: PlayerBarProps) {
    return (
        <section className="lbSection">
            <p id="leaderboard_p"></p>
            <table id='leaderboardID'>
                <tr><td>Player</td><td>Score</td></tr>
                <tr><td>Player1</td><td>0</td></tr>
                <tr><td>LongExamplePlayerName</td><td>10000000000</td></tr>
            </table>
        </section>
    );
}