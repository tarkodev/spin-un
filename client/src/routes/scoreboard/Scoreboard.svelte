<script>
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();
    let scores = []; // Reactive variable to hold the scores data

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    console.log(serverUrl);

    async function fetchScores() {
        try {
            const response = await fetch(`${serverUrl}/user/score-board`);
            if (!response.ok) throw new Error('Failed to fetch scores');
            return await response.json();
        } catch (error) {
            console.error('Error fetching scores:', error);
            return null;
        }
    }

    onMount(async () => {
        const fetchedScores = await fetchScores();
        scores = fetchedScores.scoreBoard
    });
</script>

<section>
    <nav>
    </nav>
    <article>
        <div class="background-classement">
            <div id="score_categorie">
                <p class="text-tableau-des-scores" style="color: white;">Classement - <span style="color: white;">TOP 10</span></p>
            </div>
            {#each scores as {login, score}, index}
                <div class="score_joueur">
                    <div>
                        <p>{index+1}.</p>
                    </div>
                    <div>
                        {#if index+1 == 1}
                            <p>🥇 {login} 🥇</p>
                        {:else if index+1 == 2}
                            <p>🥈 {login} 🥈</p>
                        {:else if index+1 == 3}
                            <p>🥉 {login} 🥉</p>
                        {:else}
                            <p>{login}</p>
                        {/if}
                    </div>
                    <div>
                        <p>{score} 🏆</p>
                    </div>
                </div>
            {/each}
        </div>
    </article>
</section>


<style>
    @import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap");

    .background-classement {
        border-radius: 5px;
        background-color: #164863;
        height: fit-content;
        width: 75%;
        align-content: center;
        display: flex;
        flex-direction: column;
        padding-bottom: 5%;
        align-items: center;
    }

    #score_categorie {
        display: flex;
        justify-content: space-around;
        font-size: 3em;
        font-weight: bolder;
        color: #003366;
        font-family: "Hanken Grotesk";
        margin-bottom: 30px;
    }

    .text-tableau-des-scores {
        color: #9BBEC8;
        padding: 10% 10%;
    }

    .score_joueur {
        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #003366;
        font-family: "Hanken Grotesk";
        background-color: #9BBEC8;
        margin-top: 10px;
        border-radius: 5px;
        width: 70%;
    }

    .score_joueur div:nth-child(1) {
        width: 30%;
        display: flex;
        justify-content: center;
    }

    .score_joueur div:nth-child(2) {
        width: 35%;
        display: flex;
        justify-content: center;
    }

    .score_joueur div:nth-child(3) {
        width: 35%;
        display: flex;
        justify-content: center;
    }

    #score_categorie p {
        padding: 0;
        margin: 10px;
    }

    nav {
        width: 95%;
        height: 10vh;
        display: flex;
    }

    nav a {
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        width: 120px;
        border-radius: 30px;
        font-size: 1em;
        background-color: #f4511e;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
    }

    /**/


    /***/

    section {
        width: 100%;
        /*height: 80vh;*/
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    article {
        width: 95%;
        /*height: 90vh;*/
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        text-decoration: none;
        text-align: center;
        font-weight: bolder;
    }
</style>