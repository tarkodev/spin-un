<script>
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import PlayerList from '../PlayerList.svelte';
    import {socketioNetwork} from '../../manager/socketio.ts';
    import {room, updateNetwork} from "../../manager/room.ts";
    import TchatInGame from "../game/TchatInGame.svelte";
    import BouttonRetour from "../BouttonRetour.svelte";
    import { CookieType, getCookie } from '../../manager/cookie';
    import User from '../account/User.svelte';

    const dispatch = createEventDispatcher();

    let intervalId;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    onMount(() => {
        updateNetwork();

        intervalId = setInterval(() => {
            updateNetwork();

            console.log("ROOOOOOOOOOOOOOOOOOOOOOOOm")

            /*if(!checkIsInGame()) {
                dispatch('StartGameClick');
            }*/
            checkSecond()

        }, 50);

    });

    onDestroy(() => {
        // Nettoyer pour éviter les fuites de mémoire
        clearInterval(intervalId);
    });

    async function checkSecond() {
        await delay(200);
        if(!checkIsInGame()) {
            clearInterval(intervalId);
            intervalId = null;
            dispatch('StartGameClick');
        }
    }

    function leaveRoom() {
        dispatch('GoBackClick')
        socketioNetwork.emit('leaveRoom', $room.data.uuid)
    }

    async function startGame(option) {

        if(option === null) {
            socketioNetwork.emit("sendActionData", { "uuid": $room.data.uuid, "test" : true });
        }
        else {
            socketioNetwork.emit("sendActionData", { "uuid": $room.data.uuid, "test" : "solo" });
        }
        await delay(200);
        clearInterval(intervalId);
        intervalId = null;
        dispatch('StartGameClick')
    }

    function checkIsInGame() {
        return $room.data.algoGame === null;
    }

    function setClassic() {
        socketioNetwork.emit("sendActionData", { "uuid": $room.data.uuid, "setMode" : true });
    }

    function setSpin() {
        socketioNetwork.emit("sendActionData", { "uuid": $room.data.uuid, "setMode" : "solo" });
    }

</script>

<section>
    {#if $room.error}
        <h1>{$room.error.message}</h1>
    {:else if $room.data}
        <nav>
            <div id="bouttonHautGauche" on:click={() => leaveRoom()}>
                <p>Quitter la partie</p>
            </div>
        </nav>

        <article id="article_Page">
            <div id="score_categorie">
                {#if $room.data.name == ""}
                <p style="color: white;">Partie : " <span style="color: white;">Pas de nom</span> "</p>
                {:else}
                <p style="color: white;">Partie : " <span style="color: white;">{$room.data.name}</span> "</p>
                {/if}
            </div>
            <!--<button on:click={() => createRoom()}>Test</button>-->

            <div id="panneau_config">
                <PlayerList/>
                <div class="score_joueur">
                    <div class="note_info">
                        <p>Note : vous pouvez jouer de 1 à 4 joueurs</p>
                        <p>Si vous êtes moins de 4, des IA complètent la partie</p>
                        <p>Gagnez un maximum de 🏆</p>
                    </div>
                    <!--<p>Mode de jeu : {$room.data.status}</p>-->

                    {#if $room.data.gameMaster === getCookie(CookieType.Login)}
                    <div id="gamemaster_container">
                    <p style="margin-bottom: 0;">Vous êtes le <span style="color: red;">GameMaster</span></p>
                    <div class="note_info note_select">
                        <p>Choissisez le mode de jeu :</p>
                        <p>* Classic'Un sans la roue</p>
                        <p>* Spin'Un avec la roue</p>
                    </div>
                    <form>
                        <input type="radio" id="classic" name="gamemode" value="CLASSIC" checked="checked" on:click={setClassic}>
                        <label for="classic">Classic'Un</label><br>
                        <input type="radio" id="spin" name="gamemode" value="SPIN" on:click={setSpin}>
                        <label for="spin">Spin'Un</label><br>
                    </form>
                    </div>
                    {:else}
                    <div id="normalplayer_container">
                    <p style="margin-bottom: 10px;">Le <span style="color: red;">GameMaster</span> choisi le mode de jeu</p>
                    <form>
                        {#if $room.data.isSpin}
                        <input type="radio" id="classic" name="gamemode" value="CLASSIC" disabled>
                        <label for="classic" style="color: grey">Classic'Un</label><br>
                        <input type="radio" id="spin" name="gamemode" value="SPIN" checked="checked" disabled>
                        <label for="spin" style="color: grey">Spin'Un</label><br>
                        {:else}
                        <input type="radio" id="classic" name="gamemode" value="CLASSIC" checked="checked" disabled>
                        <label for="classic" style="color: grey">Classic'Un</label><br>
                        <input type="radio" id="spin" name="gamemode" value="SPIN" disabled>
                        <label for="spin" style="color: grey">Spin'Un</label><br>
                        {/if}
                    </form>
                    </div>
                    {/if}


                    <!--<button id="start_game" on:click={() => startGame("solo")}>Jouer en solo</button>-->

                    {#if $room.data.gameMaster === getCookie(CookieType.Login)}
                        <button id="start_game" on:click={() => startGame(null)}>Lancer la partie</button>
                    {:else}
                        <p style="color: red;">Attendez que le GameMaster lance la partie</p>
                    {/if}
                    <!--<button id="start_game" on:click={() => dispatch('StartGameClick')}>Debug 1 à 4 joueurs</button>-->
                    <!--<button id="start_game" on:click={() => startGame("solo")}>Test Spin</button>-->

                </div>
                <article id="chat">
                    <p>Tchat</p>
                    <TchatInGame />
                </article>
            </div>

        </article>
    {:else}
        <h1>Chargement des informations de la salle...</h1>
    {/if}
</section>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap");

    /*
    article {
        margin: 1%;
    }
    */

    .note_info {
        border: 2px dashed white;
        width: 95%;
        height: auto;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .note_info p {
        padding: 0;
        margin: 0;
    }

    .note_select {
        width: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #gamemaster_container {
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #normalplayer_container {
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #bouttonHautGauche {
        width: 150px;
        height: 50%;
        border-radius: 5px;
        box-shadow: 0px 3px #9BBEC8;
        background-color: #164863;
        margin-left: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: auto;
        margin-bottom: auto;
    }

    #bouttonHautGauche p {
        color: #9BBEC8;
        font-family: "Hanken Grotesk";
    }

    #bouttonHautGauche:hover {
        cursor: pointer;
    }

    #chat {
        width: 20%;
        height: 97%;
        /*border: 1px solid black;*/

        margin-left: 10px;
        margin-right: 10px;

        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #003366;
        font-family: "Hanken Grotesk";
        background-color: #D9D9D9;
        /*margin-top: 10px;*/
        border-radius: 5px;

        font-size: 1.2em;
        font-weight: bold;
        color: #164863;
        font-family: "Hanken Grotesk";
        background-color: #9BBEC8;
    }

    #panneau_config {
        width: 100%;
        height: 57vh;
        display: flex;
        justify-content: center;
        border-radius: 5px;
    }

    #score_categorie {
        display: flex;
        justify-content: space-around;
        /*border-bottom: 1px dotted #003366;*/

        font-size: 3em;

        font-weight: bolder;

        color: #9BBEC8;

        font-family: "Hanken Grotesk";

        /*border-right: 1px solid #003366;*/

        /*margin-bottom: 30px;*/
        margin-left: 10px;
        margin-right: 10px;

        justify-self: center;
        align-self: center;
        margin: auto;
    }

    #start_game {
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        /*background-color: #82b74b;*/
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;
        height: 50px;
        cursor: pointer;
        background: #3C8224;
        align-self: center;
    }

    #start_game:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        /*box-shadow: 0 2px 0 #000000;*/
        transform: translateY(3px);
    } 

    .score_joueur {
        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #164863;
        font-family: "Hanken Grotesk";
        background-color: #9BBEC8;
        /*margin-top: 10px;*/
        border-radius: 5px;
        width: 50%;
        height: 97%;

        flex-direction: column;
        align-items: center;
    }

    #score_categorie p {
        padding: 0;
        margin: 10px;
    }

    nav {
        width: 95%;
        height: 10vh;
        display: flex;

        justify-content: flex-start;

        /*border: 1px solid white;*/
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
        /*border: 2px solid #f4511e;*/
        border: none;

        cursor: pointer;
    }


    #article_Page{
        background-color: #164863;
        color: #9BBEC8;
        height: fit-content;
        border-radius: 5px;
        width: 90%;
    }

    /**/


    /***/

    section {

        width: 100%;
        height: 80vh;
        margin: auto;


        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        /*border: 1px solid white;*/
    }

    article {
        width: 100%;
        height: 70vh;

        display: flex;
        flex-direction: column;

        align-items: center;

        /*border: 5px solid black;*/
        /*
        border-width: 7px;
        border-style: solid;
        border-image: linear-gradient(#ff6666, #ff4d4d) 30;


        border-radius: 40px;
        */
        /*
        background: 
        linear-gradient(white 0 0) padding-box, /*this is your grey background
        linear-gradient(to right, #ff6666, #ff4d4d) border-box;
        color: #313149;
        padding: 10px;
        /*border: 5px solid transparent;
        border-radius: 15px;
        display: inline-block;
        margin: 75px 0;*/
    }

    #login_button {

        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        background-color: #82b74b;
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;

        height: 70%;

        cursor: pointer;


        background: #3C8224;
        box-shadow: 0px 4px 4px #000000;
        border-radius: 30px;

    }

    #login_button:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    a {
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }
</style>