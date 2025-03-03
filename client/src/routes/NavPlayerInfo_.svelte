<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {CookieType, getCookie, setCookie, viteServerUrl} from '../manager/cookie'

    const dispatch = createEventDispatcher();

    let login2 = getCookie(CookieType.Login)

    let error = false;

    let score = undefined;

    let profil_picture = undefined


    async function getPlayerScore() {
        try {
    

            const response = await fetch(`${viteServerUrl}/user/profile/` + login2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getCookie(CookieType.Token)
                }
            });

            let status = response.status;
            //console.log(response);

            const data = await response.json();
            //console.log(data);

            if (status == 404) {
                    //console.log("errreur 404 couzin");
                    error = true;
                    throw new Error('Failed to fetch scores');
            }
            if(data.status == 200) {
                //console.log("infos reucperees");
                score = data.userProfile.score
                setCookie(CookieType.Score, data.userProfile.score);
                setCookie(CookieType.ProfilePicture, data.userProfile.profilePicture)

                profil_picture = data.userProfile.profilePicture
                console.log("profil picture id last :" + profil_picture)
                //console.log(data.userProfile.profilePicture);
                //console.log(data.userProfile.score);
                profil_pic_set()
            } 
           
        } catch (error) {
            console.error('Error fetching scores:', error);
            console.log(error);
        }
    }

    getPlayerScore();

    function profil_pic_set() {
        let pic_div = document.getElementById("profil_pic")
        if(pic_div == null)
                return;
        //console.log(pic_div)
        //console.log(" Profil pic idddddddddddd:" + getCookie("profil_pic"))

        //console.log("test :" + getCookie("profil_pic"))
        
        if(getCookie(CookieType.ProfilePicture) === "null" || getCookie(CookieType.ProfilePicture) === "0") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/cropped-default-profile.webp')"
            //console.log("mahslalah")
        }
        else if(getCookie(CookieType.ProfilePicture) === "1") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/loicProfile.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "2") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/sebProfile.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "3") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/3.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "4") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/4.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "5") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/5.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "6") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/6.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "7") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/7.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "8") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/8.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "9") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/9.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "10") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/10.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "11") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/11.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "12") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/12.png')"
        }
        else if(getCookie(CookieType.ProfilePicture) === "13") {
            pic_div.style.backgroundImage = "url('assets/photo-profile/13.png')"
        }
        
       /*
       console.log("teeeeeeetetetet")
        if(profil_picture === null) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/cropped-default-profile.webp')"
            //console.log("mahslalah")
        }
        else if(profil_picture == 1) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/loicProfile.png')"
        }
        else if(profil_picture == 2) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/sebProfile.png')"
        }
        else if(profil_picture == 3) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/3.png')"
        }
        else if(profil_picture == 4) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/4.png')"
        }
        else if(profil_picture === 5) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/5.png')"
        }
        else if(profil_picture === 6) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/6.png')"
        }
        else if(profil_picture === 7) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/7.png')"
        }
        else if(profil_picture === 8) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/8.png')"
        }
        else if(profil_picture === 9) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/9.png')"
        }
        else if(profil_picture === 10) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/10.png')"
        }
        else if(profil_picture === 11) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/11.png')"
        }
        else if(profil_picture === 12) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/12.png')"
        }
        else if(profil_picture === 13) {
            pic_div.style.backgroundImage = "url('/src/assets/photo-profile/13.png')"
        }
        */
    }

    onMount(() => {
        profil_pic_set()
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    });

    export let is_in_room = false;
</script>

{#if is_in_room}

    {:else}
<div id="player_info" on:click={() => dispatch('MonProfilClick')}>
    <div id="profil_pic"></div>
    <div>
        <p>{login2}</p>
        <p>{getCookie("score")} 🏆</p>
    </div>
    <!--
    <div>
        <a id="login_button" on:click={() => dispatch('MonProfilClick')} >Mon Profil</a>
        <a id="signup_button" on:click={() => dispatch('DecoClick')} >Déconnexion</a>
    </div> -->
    <!--<div id="param"><img src="/src/assets/logo/parameters.png"></div>-->
</div>
    {/if}

<style>
    a {
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }

    div {
        align-self: center;
        justify-self: flex-end;
        margin-right: 10px;

        display: flex;
        flex-direction: row;

        justify-content: flex-end;

        /*border: 1px solid black;*/
        height: 80%;
        width: 30%;
        /*border: 1px solid black;*/
    }

    div div:nth-child(2) {
        /*background-color: #003366;*/
        color: white;
        width: 25%;
        border-radius: 30px;
        font-family: "Hanken Grotesk";
        font-size: 1.1em;

        font-weight: bolder;

        text-align: center;
        /*border: 2px solid white;*/
        height: 60%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    div div:nth-child(2) p {
        margin-bottom: 3px;
        margin-top: 3px;
    }

    span {
        color: #c94c4c;
    }

    div div:nth-child(3) {
        align-self: center;
        justify-self: flex-end;
        margin-right: 0px;

        display: flex;
        flex-direction: column;

        justify-content: space-around;

        /*border: 1px solid black;*/
        height: 80%;
        width: 45%;
    }

    #login_button {

        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        background-color: #82b74b;
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;

        height: 40%;

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
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        background-color: #eea29a;
        border: none;
        box-shadow: 0 5px 0 #c94c4c;
        color: white;

        height: 40%;

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

    #param {
        /*background-image: url("/src/assets/logo/parameters.png");
        background-size: contain;*/
        width: 15%;
        margin-right: 0;
        height: 40%;
    }

    #param:hover{
        
    }

    #param img {
        /*box-shadow: 2px 2px 0 0 black;*/
    }

    #param img:hover {
        cursor: pointer;
    }

    #profil_pic {
        border: 5px solid #427D9D;
        border-radius: 5px;
        background-image: url("assets/photo-profile/loicProfile.png");
        background-size: contain;
        background-repeat: no-repeat;

        background-position: center;

        height: 100px;
        width: 100px;
        /*width: 120px;*/

        /*width: 25%;*/
        margin-right: 0;
    }

    @keyframes color-change {
  0% { box-shadow: 3px 3px 0 #9BBEC8; }
  50% { box-shadow: 3px 3px 0 #427D9D; }
  100% { box-shadow: 3px 3px 0 #9BBEC8; }
}

    #player_info {
        border: 3px solid #427D9D;
        box-shadow: 3px 3px 0 #9BBEC8;
        width: 260px;
        display: flex;
        justify-content: space-around;

        animation: color-change 1s infinite;
        font-weight: bolder;
        font-size: 1.1em;
    }

    @keyframes color-change2 {
  0% { box-shadow: 3px 3px 0 #9BBEC8; }
  50% { box-shadow: 3px 3px 0 #427D9D; }
  100% { box-shadow: 3px 3px 0 #9BBEC8; }
}

    #player_info:hover {
        cursor: pointer;
        /*box-shadow: 5px 5px 0 #9BBEC8;*/
        /*background-color: #9BBEC8;*/
        background-color: #427D9D;
        animation: color-change2 0s;
        /*color: #164863 !important;*/
    }

    #player_info:hover p {
        /*color: #164863 !important;*/
    }

    
    #player_info:hover #profil_pic {
        border: 5px solid #9BBEC8 !important;
    }
    

    #profil_pic div {
        /*
        display: flex;
        justify-content: center;
        align-items: center;*/

        margin-right: 0;
    }
</style>