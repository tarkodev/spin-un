<script>

    export let playerLogin
    export let playerScore
    export let playerPic

    /*
    let test = ""
    onMount (() => {
        if(playerLogin === undefined) {

        }
        else if(playerLogin.length > 4 && playerLogin[0] === 'B' && playerLogin[1] === 'o' && playerLogin[2] === 't' && playerLogin[3] === ' ')
            test = "bot"
    });
    */

    function profil_pic_set() {

        let pic_div = document.querySelector("#profil_pic")
        //console.log(pic_div)
        //console.log(" Profil pic idddddddddddd:" + getCookie("profil_pic"))

        //console.log("test :" + getCookie("profil_pic"))

        if(playerPic === null || playerPic === 0) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/cropped-default-profile.webp')"
            //console.log("mahslalah")
        }
        else if(playerPic === 1) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/loicProfile.png')"
        }
        else if(playerPic  === 2) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/sebProfile.png')"
        }
        else if(playerPic  === 3) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/3.png')"
        }
        else if(playerPic  === 4) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/4.png')"
        }
        else if(playerPic  === 5) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/5.png')"
        }
        else if(playerPic  === 6) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/6.png')"
        }
        else if(playerPic  === 7) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/7.png')"
        }
        else if(playerPic === 8) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/8.png')"
        }
        else if(playerPic  === 9) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/9.png')"
        }
        else if(playerPic  === 10) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/10.png')"
        }
        else if(playerPic  === 11) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/11.png')"
        }
        else if(playerPic === 12) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/12.png')"
        }
        else if(playerPic  === 13) {
            pic_div.style.backgroundImage = "url('assets/photo-profile/13.png')"
        }
    }
</script>

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
        {#if playerScore !== -1}
            <p>{playerScore} 🏆</p>
        {/if}
    </div>
</div>

<style>
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
    }

    #profil_name_score p {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>