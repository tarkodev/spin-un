<script>
    import { createEventDispatcher } from 'svelte';
    import { getCookie, CookieType } from '../manager/cookie';

    let logo1 = 'assets/logoAlternatif2.png'
    let logo2 = 'assets/logo2.png'

const dispatch = createEventDispatcher();

import {onDestroy, onMount} from 'svelte';
    import PlayerList from './PlayerList.svelte';
    import {socketioNetwork} from '../manager/socketio.ts';
    import {room, updateNetwork} from "../manager/room.ts";
    import TchatInGame from "./game/TchatInGame.svelte";


function leaveRoom() {
        dispatch('GoBackClick')
        socketioNetwork.emit('leaveRoom', $room.data.uuid)
    }

    let playerLogin = getCookie(CookieType.Login)
    let playerScore = undefined
    let playerPic = undefined

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    async function getPlayerScoreAndProfilPic() {
        try {
            const response = await fetch(`${serverUrl}/user/profile/` + playerLogin, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + getCookie(CookieType.Token)
                }
            });

            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data)

            if (status == 404) {
                    console.log("errreur 404 couzin");
                    error = true;
                    throw new Error('Failed to fetch scores');
            }
            if(data.status == 200) {
                playerPic = data.userProfile.profilePicture
                playerScore = data.userProfile.score
            } 
        } catch (error) {
            console.error('Error fetching scores:', error);
            console.log(error);
        }
    }

    getPlayerScoreAndProfilPic();
</script>

<nav>
    <!--<img src="{logo1}" alt="SpinUn Logo" id="logo">
    <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">-->
    <div id="info_chat">

        <div class="player_info">
            {#if playerPic >= 3 && playerPic <= 13}
            <div id="profil_pic" style="background-image: url('assets/photo-profile/{playerPic}.png')"></div>
            {:else if playerPic === null || playerPic === 0}
            <div id="profil_pic" style="background-image: url('assets/photo-profile/cropped-default-profile.webp')"></div>
            {:else if playerPic === 1}
            <div id="profil_pic" style="background-image: url('assets/photo-profile/loicProfile.png')"></div>
            {:else if playerPic === 2}
            <div id="profil_pic" style="background-image: url('assets/photo-profile/sebProfile.png')"></div>
            {:else}
            <div id="profil_pic"></div>
            {/if}
            <div id="profil_name_score">
                <p>{playerLogin}</p>
                {#if playerScore !== undefined}
                    <p>{playerScore} 🏆</p>
                {/if}
            </div>
        </div>

        <div id="separator"></div>
        <a id="login_button" on:click={() => dispatch('AfficheChat')} ><p>Afficher le chat</p></a>
    </div>
    <div>
        <a id="signup_button" on:click={() => leaveRoom()}><p>Quitter la partie</p></a> <!-- on:click={() => dispatch('SignupClick')}-->
    </div>
</nav>

<style>
    #photo_profil {
        width: 50px;
        height: 50px;
        background-color: white;
    }

    /*#player_name_score {
        display: flex;
        flex-direction: column;
    }*/

    /*#player_name_score p {
        margin: 2px;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        color: white;
    }*/

    #separator {
        height: 100%;
        border: 3px solid #427D9D;
        width: 0;
        margin-left: 20px;
        margin-right: 20px;
    }

    /*#player_info {
        justify-content: flex-start;
        margin-left: 20px;
        margin-right: 20px;
    }*/

    a{
        text-decoration: none;
        text-align: center;

        font-weight: bolder;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    nav {
        width: 100%;
        height: 10vh;

        /*box-shadow: 0px 0px 0px 0px #454140;*/
        margin: auto;

        display: flex;

        flex-direction: row;
        justify-content: space-between;
        align-content: flex-end;
        background-color: #164863;
        /*align-items: center;*/
    }

    img {
        height: 90%;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
    }
    #logo{
        animation: rotate 4s infinite ;
    }
    @keyframes rotate {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }

    #logoSpinun{
        filter: drop-shadow(10px 7px 10px dimgray);
    }

    div {
        align-self: center;
        justify-self: flex-end;
        margin-right: 10px;

        display: flex;
        flex-direction: row;

        justify-content: flex-end;

        /*border: 1px solid black;*/
        height: 70%;
        width: 30%;
    }

    #info_chat {
        align-self: center;
        justify-self: flex-end;
        margin-right: 0;

        display: flex;
        flex-direction: row;

        justify-content: flex-start;

        /*border: 1px solid black;*/
        height: 70%;
        width: 50%;
    }

    #player_info {
        width: 30%;
    }

    #login_button {

        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        background-color: #82b74b;
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;

        height: 80%;
        width: 30%;

        cursor: pointer;


background: #3C8224;
box-shadow: 0px 4px 4px #000000;
border-radius: 5px;

    }

    #login_button:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #signup_button {
        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        background-color: #eea29a;
        border: none;
        box-shadow: 0 5px 0 #c94c4c;
        color: white;

        height: 80%;
        width: 45%;

        cursor: pointer;


        background: #822424;
        box-shadow: 0px 4px 4px #000000;
        border-radius: 5px;

    }

    #signup_button:hover {
        /*box-shadow: 0 2px 0 #c94c4c;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #player_name_score {
        width: 50%;
    }

    #player_info {
        width: auto;
    }




    /*************************************/
    .player_info {
        background-color: #164863;
        border-radius: 5px;
        text-align: center;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        font-weight: bolder;
        color: white;

        display: flex;
        justify-content: column;

        justify-content: center;
        align-items: center;

        width: 180px;
    }

    #profil_pic {
        background-color: white;
        width: 75px;
        height: 75px;
        border-radius: 5px;

        /*width: 140px;
        height: 120px;*/
        background-color: white;

        border: 5px solid #427D9D;
        border-radius: 5px;
        background-image: url("assets/robot-cropped.jpg");
        background-size: contain;
        background-repeat: no-repeat;

        background-position: center;

        /*margin-left: 10px;
        margin-right: 10px;*/
    }

    #profil_name_score {
        /*margin-left: 10px;
        margin-right: 10px;*/
        width: 95px;
        display: flex;
        flex-direction: column;
    }

    #profil_name_score p {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>