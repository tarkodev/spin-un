<script lang="ts">
    import BouttonRetourScroll from "../BouttonRetourScroll.svelte";
    import { CookieType, getCookie } from "../../manager/cookie";
    import { onMount } from "svelte";

    const gameHistory = [
        {
            game: {
                beganAt: "2024-05-15T08:30:00.000Z",
                finishedAt: "2024-05-15T08:30:00.000Z",
            },
            player: [
                {
                    userLogin: "baris",
                    score: 10,
                    rankInGame: 3,
                },
                {
                    userLogin: "hadi",
                    score: 5,
                    rankInGame: 4,
                },
                {
                    userLogin: "nader",
                    score: 20,
                    rankInGame: 1,
                },
                {
                    userLogin: "seb",
                    score: 15,
                    rankInGame: 2,
                },
            ],
        },
        {
            game: {
                beganAt: "2024-05-15T08:30:00.000Z",
                finishedAt: "2024-05-15T08:30:00.000Z",
            },
            player: [
                {
                    userLogin: "baris",
                    score: 15,
                    rankInGame: 2,
                },
                {
                    userLogin: "hadi",
                    score: 20,
                    rankInGame: 1,
                },
                {
                    userLogin: "nader",
                    score: 10,
                    rankInGame: 3,
                },
                {
                    userLogin: "seb",
                    score: 5,
                    rankInGame: 4,
                },
            ],
        },
    ];

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    async function historyGet() {
        let login = getCookie(CookieType.Login);
        let response = await fetch(`${serverUrl}/game/history/${login}`, {
            method: "GET",
        });
        let json = await response.json();
        if (json.status === 200) {
            //gameHistory = json.gameHistory;
        }
    }

    onMount(() => {
        //historyGet();
    });

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString();
    }
</script>

<BouttonRetourScroll on:GoBackClick />

<section>
    <h1>Historique des Parties</h1>
    <div class="history-container">
        {#each gameHistory as gameEntry}
            <div class="game-entry">
                <div class="game-info">
                    Date de début: {formatDate(gameEntry.game.beganAt)} | Date de
                    fin: {formatDate(gameEntry.game.finishedAt)}
                </div>
                {#each gameEntry.player as player}
                    <div class="player-info">
                        <div>{player.userLogin}</div>
                        <div>Score: {player.score}</div>
                        <div>Rang: {player.rankInGame}</div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</section>

<style>
    .history-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    h1 {
        text-align: center;
        color: #333;
    }

    .game-history {
        margin-top: 20px;
    }

    .game-entry {
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 15px;
        background-color: #f9f9f9;
    }

    .game-info {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .player-info {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }

    .player-info:nth-child(even) {
        background-color: #e9e9e9;
    }

    .player-info div {
        flex: 1;
        text-align: center;
    }
</style>
