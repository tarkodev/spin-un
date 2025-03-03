<script lang>
    import {createEventDispatcher, onMount} from 'svelte';
    import BouttonRetour from '../BouttonRetour.svelte';
    import {CookieType, getCookie} from '../../manager/cookie'

    const dispatch = createEventDispatcher();

    let start = 'Mes zamis'
    let scoreboard = 'Informations du compte'
    let lobby = 'Historique des parties'
    let download = 'Télécharger le jeu'

    let href = 'LobbyClick'
    let href2 = 'ScoreboardClick'
    let href3 = 'GameClick'
    let hrefDownload = "DownloadClick"

    let blue = "blue"
    let red = "red"

    let numberPlayedGames = 0
    let numberWonGames = 0;

    function getCookie2(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    let login2 = getCookie(CookieType.Login);

    let photo_profil
    let login_input
    onMount(() => {
        photo_profil = document.getElementById("photo_profil")
        //login_input = document.getElementById("login_input")
    });


    let error = false;

    let player_name = undefined;
    let player_email = undefined
    let player_bio = undefined
    let player_pic = undefined
    let player_score = undefined
    let player_createAt = undefined
    let player_createAt2 = undefined

    //let blabla;


    async function getPlayerScore() {
        try {


            const response = await fetch(`${serverUrl}/user/profile/` + login2);

            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data)
            //blabla = data

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error('Failed to fetch scores');
            }
            if (data.status == 200) {
                console.log("infos reucperees");
                player_name = data.userProfile.login
                player_email = data.userProfile.email
                player_bio = data.userProfile.bio
                player_pic = data.userProfile.profilePicture
                player_score = data.userProfile.score
                player_createAt = data.userProfile.createAt
                numberPlayedGames = data.userProfile.nbTotalGamePlayed;
                numberWonGames = data.userProfile.nbTotalGameWon;

                player_createAt = player_createAt.split('T')
                player_createAt2 = player_createAt[0]
                //setCookie("score", data.userProfile.score, 1)
                //setCookie("profil_pic", data.userProfile.profilPicture, 1)
                //console.log(data.userProfile.profilPicture);
                //console.log(data.userProfile.score);
                console.log(player_name)

                profil_pic_set()
                /*
                const select = document.getElementById('cars');
                console.log("photo porfil id: " + player_pic)
                if(player_pic === null) {
                    select.value = "no_image"
                    console.log("ca a marche ici")
                    photo_profil.style.backgroundImage = "url('/src/assets/photo-profile/cropped-default-profile.webp')"
                }
                if(player_pic === 1) {
                    select.value = "1"
                    console.log("ca a marche ici")
                    photo_profil.style.backgroundImage = "url('/src/assets/photo-profile/loicProfile.png')"
                }
                if(player_pic === 2) {
                    select.value = "2"
                    console.log("ca a marche ici")
                    photo_profil.style.backgroundImage = "url('/src/assets/photo-profile/sebProfile.png')"
                }
*/

            }

        } catch (error) {
            console.error('Error fetching scores:', error);
            console.log(error);
        }
    }


    function profil_pic_set() {
        let pic_div = document.getElementById("photo_profil")
        //console.log(pic_div)
        //console.log(" Profil pic idddddddddddd:" + getCookie("profil_pic"))

        //console.log("test :" + getCookie("profil_pic"))

        console.log("yolo" + player_pic)

        if (player_pic === null || player_pic === 0) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/cropped-default-profile.webp')"
            //console.log("mahslalah")
        } else if (player_pic === 1) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/loicProfile.png')"
        } else if (player_pic === 2) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/sebProfile.png')"
        } else if (player_pic === 3) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/3.png')"
        } else if (player_pic === 4) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/4.png')"
        } else if (player_pic === 5) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/5.png')"
        } else if (player_pic === 6) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/6.png')"
        } else if (player_pic === 7) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/7.png')"
        } else if (player_pic === 8) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/8.png')"
        } else if (player_pic === 9) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/9.png')"
        } else if (player_pic === 10) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/10.png')"
        } else if (player_pic === 11) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/11.png')"
        } else if (player_pic === 12) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/12.png')"
        } else if (player_pic === 13) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/13.png')"
        }
    }

    //profil_pic_set()

    onMount(() => {
        getPlayerScore();
    });


</script>

<BouttonRetour on:GoBackClick/>
<section>
    <main>
        <div id="player_info_top">
            <div id="photo_profil"></div>
            <div id="player_login_score">
                <p>{player_name}</p>
                <p>{player_score} 🏆</p>
            </div>
            <div id="compte_date">
                <p>Compte créé le <span>{player_createAt2}</span></p>
            </div>
        </div>
        <div id="bio">
            {#if player_bio == null}
                <p>Pas de bio :(</p>
            {:else}
                <p>{player_bio}</p>
            {/if}
        </div>
        <div id="player_info_center">
            <p>Nombre de partie joué : {numberPlayedGames}</p>
            <p>Nombre de partie gagné : {numberWonGames}</p>
        </div>
        <article>
            <!--
            <MenuButton on:click={() => dispatch('HistoryClick')} bind:button_name={network}
                bind:href={href} bind:color={blue} />
            <MenuButton on:click={() => dispatch('FriendClick')} bind:button_name={start} 
                bind:href={href3} bind:color={blue} />
            <MenuButton on:click={() => dispatch('AccountInfoClick')} bind:button_name={scoreboard} 
                bind:href={href2} bind:color={blue} />-->

            <button class="button" on:click={() => dispatch('HistoryClick')} style="background-color: #9BBEC8;"><span>Historique des parties </span>
            </button>
            <button class="button" on:click={() => dispatch('AccountInfoClick')} style="background-color: #9BBEC8;">
                <span>Informations du compte </span></button>
            <button class="button" on:click={() => dispatch('DecoClick')}
                    style="background-color: #c94c4c; color: white; box-shadow: 0px 4px 0px #F18383;">
                <span>Déconnexion </span></button>
        </article>
    </main>
</section>

<style>
    #compte_date {
        /*border: 1px solid red;*/
        height: 100%;
        width: 50%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;
    }

    #compte_date span {
        font-weight: bolder;
        color: white;
        background-color: #3C8224;
        padding: 5px;
        border-radius: 5px;
    }

    #player_login_score {
        padding-left: 20px;
        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;

        width: 50%;
    }

    #player_info_center {
        height: 35%;
        /*border: 1px solid black;*/
        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;
        padding-left: 40px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #player_info_center p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #bio {
        border-top: 3px solid #427D9D;
        border-bottom: 3px solid #427D9D;
        height: 15%;

        display: flex;
        align-items: center;
        padding-left: 40px;
        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;
    }

    #photo_profil {
        width: 140px;
        height: 120px;
        background-color: white;

        border: 5px solid #427D9D;
        border-radius: 5px;
        background-image: url("assets/photo-profile/loicProfile.png");
        background-size: contain;
        background-repeat: no-repeat;

        background-position: center;
    }

    #player_info_top {
        /*border: 1px solid white;*/
        height: 35%;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;

        padding-left: 20px;
        padding-right: 20px;
    }

    main {
        height: 90%;
        width: 60%;
        background-color: #164863;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    section {
        width: 100%;
        height: 70vh;

        display: flex;
        flex-direction: column;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        /*border: 1px solid black;*/

        /*background-color: #d5f4e6;*/
    }

    article {
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: row;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        /*background-color: #164863;
        border-radius: 10px;*/
    }

    h1 {
        margin-top: 0;
        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;
    }


    .button {
        display: inline-block;
        /*border-radius: 4px;*/

        background: #073579;
        box-shadow: 0px 4px 0px #FFF;
        border-radius: 5px;
        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #164863;
        text-align: center;
        font-size: 20px; /** 28*/
        padding: 20px;
        /*default with : 200px*/
        width: 75%;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px 10px;

        height: 60%;

        font-family: "Hanken Grotesk";
        font-weight: bolder;
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