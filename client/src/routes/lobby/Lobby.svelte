<script>
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
    import MediaQuery from '../MediaQuery.svelte';
    import {socketioNetwork} from '../../manager/socketio.ts';

    const dispatch = createEventDispatcher();

    let lobbyRooms = [];

    let intervalId;

    onMount(() => {
        // Émettre immédiatement une première fois au montage du composant
        socketioNetwork.emit('getAllRoomData');

        console.log("ah sérieux?")

        // Puis émettre toutes les secondes
        intervalId = setInterval(() => {
            socketioNetwork.emit('getAllRoomData');
        }, 50);

        socketioNetwork.on('allRoomData', (rooms) => {
            //console.log('Données du network reçues:', rooms);
            lobbyRooms = rooms.data; // Mise à jour de l'état avec les données reçues
        });

        // Écouter les confirmations et les erreurs de connexion à une network
        socketioNetwork.on('roomJoined', () => {
            console.log('Successfully joined the network.');
            dispatch('RoomClick');
        });

        socketioNetwork.on('roomJoinedFailed', (errorMessage) => {
            console.error('Failed to join network:', errorMessage);
        });
    });

    onDestroy(() => {
        // Nettoyer pour éviter les fuites de mémoire
        clearInterval(intervalId);
        socketioNetwork.off('allRoomData');
        socketioNetwork.off('roomJoined');
        socketioNetwork.off('roomJoinedFailed');
    });

    function joinRoom(roomUuid) {
        socketioNetwork.emit('joinRoom', roomUuid);
    }

</script>


<!--# MOBILE #-->
<MediaQuery let:matches query="(max-width: 700px)">
    {#if matches}
        <section>
            <nav>
                <a id="login_button" on:click={() => dispatch('GoBackClick')}><span>Revenir en arrière</span></a>

            </nav>
            <article style="width: 100%;">
                <div id="score_categorie">
                    <p>Liste des parties</p>
                </div>

                <div class="score_joueur" style="width: 95%; font-size: 1em;">
                    <p>La partie de Seb</p>
                    <p>2 / 4 joueurs</p>
                    <p>Mode de jeu normal</p>
                    <a class="button" on:click={() => dispatch('RoomClick')}><span>rejoindre</span></a>
                </div>
                <div class="score_joueur" style="width: 95%; font-size: 1em;">
                    <p>La partie de Seb</p>
                    <p>2 / 4 joueurs</p>
                    <p>Mode de jeu normal</p>
                    <a class="button" on:click={() => dispatch('RoomClick')}><span>rejoindre</span></a>
                </div>
                <div class="score_joueur" style="width: 95%; font-size: 1em;">
                    <p>La partie de Seb</p>
                    <p>2 / 4 joueurs</p>
                    <p>Mode de jeu normal</p>
                    <a class="button" on:click={() => dispatch('RoomClick')}><span>rejoindre</span></a>
                </div>
                <!--<a class="test" href="/network">La partie de Seb</a>-->

            </article>
        </section>
    {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery let:matches query="(min-width: 701px)">
    {#if matches}
        <section>
            <nav>
                <button type="submit" class="button" on:click={() => dispatch("createClick")}><span>Créer une partie</span></button>
            </nav>
            <article>
                <div class="background-lobby">

                    <div id="score_categorie">
                        <p class="text-liste-des-parties" style="color: white;">Liste des parties</p>
                    </div>

                    {#each lobbyRooms as room}
                        <div class="score_joueur">
                            {#if room.name == ""}
                            <p>Pas de nom</p>
                            {:else}
                            <p>{room.name}</p>
                            {/if}
                            <p>{room.players.length} / 4 joueurs</p>
                            <!--<p>Mode de jeu : {room.status}</p>-->
                            {#if !room.isSpin}
                                <p>Mode de jeu : Classic'Un</p>
                            {:else if room.isSpin}
                                <p>Mode de jeu : Spin'Un</p>
                            {/if}
                            {#if room.algoGame == null}
                                <p>Status : <span style="color:green;">Salle d'attente</span></p>
                            {:else}
                            <p>Status : <span style="color:red;">Partie en cours</span></p>
                            {/if}
                            {#if room.algoGame != null || room.players.length >= 4}
                            <a style="width: 85px;"></a>
                            {:else}
                            <a class="button2" on:click={() => joinRoom(room.uuid)}><span>rejoindre</span></a>
                            {/if}
                        </div>
                    {/each}
                </div>
            </article>
        </section>
    {/if}
</MediaQuery>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap");

    .background-lobby {
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

    .text-liste-des-parties {
        color: #9BBEC8;
        padding: 10% 10%;
    }

    .join_button {
        height: 50%;
        align-self: center;
        border-radius: 10px;
        padding: 5px;
        color: white;
        background-color: #003366;
    }

    /********************************************/
    .button2 {
        display: inline-block;
        /*border-radius: 4px;*/

        background: #164863;
        box-shadow: 0px 4px 4px #000000;
        border-radius: 5px;

        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #9BBEC8;
        text-align: center;
        font-size: 20px; /** 28*/
        padding: 5px;
        /*default with : 200px*/
        /*width: 400px;*/
        transition: all 0.5s;
        cursor: pointer;
        align-self: center;

        height: 50%;

        font-family: "Hanken Grotesk";

        font-weight: bolder;
    }

    .button2 span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    .button2 span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }

    .button2:hover span {
        padding-right: 25px;
    }

    .button2:hover span:after {
        opacity: 1;
        right: 0;
    }

    /********************************************/

    #score_categorie {
        display: flex;
        justify-content: space-around;
        /*border-bottom: 1px dotted #003366;*/

        font-size: 3em;

        font-weight: bolder;

        color: #003366;

        font-family: "Hanken Grotesk";

        /*border-right: 1px solid #003366;*/

        margin-bottom: 30px;
    }

    .score_joueur {
        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #164863;
        font-family: "Hanken Grotesk";
        background-color: #9BBEC8;
        margin-top: 10px;
        border-radius: 5px;
        width: 85%;
    }

    #score_categorie p {
        padding: 0;
        margin: 10px;
    }

    nav {
        width: 95%;
        height: 10vh;
        display: flex;

        justify-content: flex-end;

        margin-bottom: 30px;
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

    /**/


    /***/

    section {

        width: 100%;
        height: 80vh;
        margin: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    article {
        width: 95%;
        height: 90vh;

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















    .button {
        display: inline-block;
        /*border-radius: 4px;*/

        background: #9BBEC8;
        box-shadow: 0px 4px 0px #FFF;
        border-radius: 5px;
        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #164863;
        text-align: center;
        font-size: 24px; /** 28*/
        padding: 10px;
        /*default with : 200px*/
        width: 300px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px 10px;

        height: 50px;

        font-family: "Hanken Grotesk";
        font-weight: bolder;

        box-shadow: 0px 3px #9BBEC8;
        background-color: #164863;
        color: #9BBEC8;
    }

    .button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    .button span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }

    .button:hover span {
        padding-right: 25px;
    }

    .button:hover span:after {
        opacity: 1;
        right: 0;
    }
</style>