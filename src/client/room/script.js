let tb_player = new Map();
let g_pl = "";
let oldInnerHTML = "";

function initLeaderboard() {
  let tblStart = "<table id='leaderboardID'>";
  let tblEnd = "</table>";
  let lb = tblStart + "<tr><td>Player</td><td>Score</td></tr>"
      + "<tr><td>Player1</td><td>0</td></tr>"
      + "<tr><td>LongExamplePlayerName</td><td>10000000000</td></tr>" + tblEnd;
  let leader_id = document.getElementById("leaderboard_p");
  leader_id.innerHTML = lb;
  oldInnerHTML = leader_id.getHTML()
}

function uptLeaderboard() {
  function playerAsTB(v, key) {
    g_pl += "<tr id='new-player-id' ><td id='player-name' >" + key + "</td><td id='player-score' >" + v + "</td></tr>";
  }
  tb_player.forEach(playerAsTB);
  let leader_id = document.getElementById("leaderboard_p");
  leader_id.innerHTML = oldInnerHTML.replace("</table>", "") + g_pl + "</table>";
  g_pl = "";
}

function addPlayer() {
  let name = document.getElementById("name-input").value;
  if (name !== "") {
    tb_player.set(name, 0);
  }
  uptLeaderboard();
}
