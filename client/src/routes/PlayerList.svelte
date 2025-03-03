<script>

    import { room } from "../manager/room.ts";
    import { onMount, onDestroy } from "svelte";
    import { CookieType, getCookie } from "../manager/cookie.ts";

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    let error = false;

    let player_pic = {undefined, undefined, undefined, undefined}
    let player_score = {undefined, undefined, undefined, undefined}

    let nb_players_in_room = undefined

    let intervalId;
    
    onMount(() => {
        intervalId = setInterval(() => {

        if($room.data.players.length !== nb_players_in_room) {
            for(let i = 0; i < $room.data.players.length; i++) {
                getPlayerScoreAndProfilPic(i)
                //profil_pic_set(i)
            }
            nb_players_in_room = $room.data.players.length
        }

        console.log("*******DEBUT********")
        console.log(player_pic[0])
        console.log(player_pic[1])
        console.log(player_pic[2])
        console.log(player_pic[3])

        }, 50);
    });
    
    onDestroy(() => {
        // Nettoyer pour éviter les fuites de mémoire
        clearInterval(intervalId);
    });

    async function getPlayerScoreAndProfilPic(i) {
        try {
            const response = await fetch(`${serverUrl}/user/profile/` + $room.data.players[i], {
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
                player_pic[i] = data.userProfile.profilePicture
                player_score[i] = data.userProfile.score
            } 
        } catch (error) {
            console.error('Error fetching scores:', error);
            console.log(error);
        }
    }

    function profil_pic_set(i) {
        let container = document.getElementsByClassName("player_info")[i]

        let pic_div = container.querySelector("#profil_pic")
        //console.log(pic_div)
        //console.log(" Profil pic idddddddddddd:" + getCookie("profil_pic"))

        //console.log("test :" + getCookie("profil_pic"))

        if(player_pic[i] === null || player_pic[i] === 0) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/cropped-default-profile.webp')"
            //console.log("mahslalah")
        }
        else if(player_pic[i] === 1) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/loicProfile.png')"
        }
        else if(player_pic[i] === 2) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/sebProfile.png')"
        }
        else if(player_pic[i] === 3) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/3.png')"
        }
        else if(player_pic[i] === 4) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/4.png')"
        }
        else if(player_pic[i] === 5) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/5.png')"
        }
        else if(player_pic[i] === 6) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/6.png')"
        }
        else if(player_pic[i] === 7) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/7.png')"
        }
        else if(player_pic[i] === 8) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/8.png')"
        }
        else if(player_pic[i] === 9) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/9.png')"
        }
        else if(player_pic[i] === 10) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/10.png')"
        }
        else if(player_pic[i] === 11) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/11.png')"
        }
        else if(player_pic[i] === 12) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/12.png')"
        }
        else if(player_pic[i] === 13) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/13.png')"
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    function profil_pic_url(i) {

        let pic = i

        /*
        try {
            const response = await fetch(`${serverUrl}/user/profile/` + $room.data.players[i], {
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
                pic = data.userProfile.profilePicture
                console.log("*******************************************");
                console.log(pic);
                console.log("*******************************************");
            } 
        } catch (error) {
            console.error('Error fetching scores:', error);
            console.log(error);
        }

        await delay(200);

        return pic;*/

        if(pic === null || pic === 0) {
            return("url('assets/photo-profile/cropped-default-profile.webp')")
        }
        else if(pic === 1) {
            return("url('assets/photo-profile/loicProfile.png')")
        }
        else if(pic === 2) {
            return("url('assets/photo-profile/sebProfile.png')")
        }
        else if(pic === 3) {
            return("url('assets/photo-profile/3.png')")
        }
        else if(pic === 4) {
            return("url('assets/photo-profile/4.png')")
        }
        else if(pic === 5) {
            return("url('assets/photo-profile/5.png')")
        }
        else if(pic === 6) {
            return("url('assets/photo-profile/6.png')")
        }
        else if(pic === 7) {
            return("url('assets/photo-profile/7.png')")
        }
        else if(pic === 8) {
            return("url('assets/photo-profile/8.png')")
        }
        else if(pic === 9) {
            return("url('assets/photo-profile/9.png')")
        }
        else if(pic === 10) {
            return("url('assets/photo-profile/10.png')")
        }
        else if(pic === 11) {
            return("url('assets/photo-profile/11.png')")
        }
        else if(pic === 12) {
            return("url('assets/photo-profile/12.png')")
        }
        else if(pic === 13) {
            return("url('assets/photo-profile/13.png')")
        }
    }

</script>

<article id="players">
    <h1>Liste des Joueurs</h1>
    <p style="margin-top: 12px; margin-bottom: 12px;"><span style="color: red; font-weight: bolder; font-size: 1.2em">{$room.data.players.length}</span> joueur(s) dans la room</p>

    {#if $room.error}
        <h1>{$room.error.message}</h1>
    {:else if $room.data}
        <!--{#each $room.data.players as player}
            <div class="player">
                <div></div>
                <p>{player}</p>
            </div>
        {/each}-->
    <div id="container">
        {#each $room.data.players as player, index}
            <div class="player_info">
                {#if player === $room.data.players[0]}
                    <div class="profil_pic" style="--background: {profil_pic_url(player_pic[0])};"></div>
                    {:else if player === $room.data.players[1]}
                    <div class="profil_pic" style="background-image: {profil_pic_url(player_pic[1])};"></div>
                    {:else if player === $room.data.players[2]}
                    <div class="profil_pic" style="background-image: {profil_pic_url(player_pic[2])};"></div>
                    {:else if player === $room.data.players[3]}
                    <div class="profil_pic" style="background-image: {profil_pic_url(player_pic[3])};"></div>
                    {:else}
                    <p>erreur</p>
                    {/if}
                <!--{:else if player === $room.data.players[1]}
                <div id="profil_pic" style="background-image: {() => profil_pic_url(index)};"></div>
                {:else if player === $room.data.players[2]}
                <div id="profil_pic" style="background-image: {() => profil_pic_url(index)};"></div>
                {:else if player === $room.data.players[3]}
                <div id="profil_pic" style="background-image: {() => profil_pic_url(index)};"></div>
                {:else}
                <p>erreur</p>
                {/if}-->

                <div id="profil_name_score">
                    <p>{player}</p>
                    {#if player === $room.data.players[0]}
                        <p>{player_score[0]} 🏆</p>
                    {:else if player === $room.data.players[1]}
                    <p>{player_score[1]} 🏆</p>
                    {:else if player === $room.data.players[2]}
                    <p>{player_score[2]} 🏆</p>
                    {:else if player === $room.data.players[3]}
                    <p>{player_score[3]} 🏆</p>
                    {:else}
                    <p>erreur</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    {:else}
        <h1>Chargement de la liste des joueurs...</h1>
    {/if}
</article>

<style>
    #players {
        /*width: 100%;
        height: 100%;
        border: 1px solid black;
        margin-left: 10px;
        margin-right: 10px;*/

        display: flex;
        justify-content: flex-start;
        flex-direction: column;

        align-items: center;

        font-size: 1.2em;
        font-weight: bold;
        color: #164863;
        font-family: "Hanken Grotesk";
        background-color: #9BBEC8;
        /*margin-top: 10px;*/
        border-radius: 5px;
        width: 20%;
        height: 97%;

        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    h1 {
        display: block;
        box-shadow: 0 4px 0 #164863;
        justify-self: flex-start;
        margin-bottom: 0%;

        margin-top: 10px;
    }

    

    #players .player {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: flex-start;
        width: 80%;
        height: 20%;
    }

    #players .player p {
        display: block;
        /*margin: auto;*/
    }

    #players .player div {
        background-color: #003366;
        width: 100px;
        height: 100px;
    }

    /***********************************/
    .player_info {
        background-color: #164863;
        border-radius: 5px;
        text-align: center;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        color: white;

        display: flex;
        justify-content: column;

        justify-content: center;
        align-items: center;
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
        background-image: url("assets/photo-profile/cropped-default-profile.webp");
        background-size: contain;
        background-repeat: no-repeat;

        background-position: center;

        margin-left: 10px;
        margin-right: 10px;
    }

    #profil_name_score {
        margin-left: 10px;
        margin-right: 10px;
    }

    #container {
        display: flex;
        flex-direction: column;
        /*border: 1px solid black;*/
        width: 85%;
        height: 100%;
        justify-content: flex-start;
    }























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

        /*width: 180px;*/

        margin-bottom: 10px;
    }

    .profil_pic {
        background-color: white;
        width: 75px;
        height: 75px;
        border-radius: 5px;

        /*width: 140px;
        height: 120px;*/
        background-color: white;

        border: 5px solid #427D9D;
        border-radius: 5px;
        /*background-image: url("assets/robot-cropped.jpg");*/
        background-image: var(--background);
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
    }

    #profil_name_score p {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>