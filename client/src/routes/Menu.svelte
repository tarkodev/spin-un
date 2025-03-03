<script lang="ts">
    /*
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
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

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=None;";
    }

    async function print_conf() {
        if(getCookie("reload_connect") === "true") {
            //window.scrollTo(0, 0)
            /*confirmation_msg.style.display = "flex";
                confirmation_msg.classList.add('test_anim')
                confirmation_msg.style.animation="fade 2s ease 3.5s forwards";
                await delay(1500)
                confirmation_msg.style.display = "none";
                setCookie("reload_connect", "false", 1)
                location.reload()
        }
    }

    print_conf()*/


    //import Button from './Button.svelte'

    import MenuButton from './MenuButton.svelte';

    let start = 'Créer une partie'
    let scoreboard = 'Classement'
    let lobby = 'Rejoindre une partie'
    let download = 'Télécharger le jeu'

    let href = 'LobbyClick'
    let href2 = 'ScoreboardClick'
    let href3 = 'GameClick'
    let hrefDownload = "DownloadClick"

    let blue = "blue"
    let red = "red"


    import { createEventDispatcher } from "svelte";
    import Scoreboard from './scoreboard/Scoreboard.svelte';
    import DownloadFooter from './DownloadFooter.svelte';
    import {refreshSocketio} from "../manager/socketio";

    const dispatch = createEventDispatcher();

    export let start_game = () => dispatch("start_game");
    export let show_scoreboard = () => dispatch("show_scoreboard");

    refreshSocketio();

</script>

<section id="menu">

    <article>
        <MenuButton on:click={() => dispatch('LobbyClick')} bind:button_name={lobby} 
            bind:href={href} bind:color={blue} />
        <MenuButton on:click={() => dispatch('GameClick')} bind:button_name={start} 
            bind:href={href3} bind:color={blue} />
        <MenuButton on:click={() => dispatch('ScoreboardClick')} bind:button_name={scoreboard} 
            bind:href={href2} bind:color={blue} />
        
    </article>
    
    <!--
    <MenuButton on:click={() => dispatch('DownloadClick')} bind:button_name={download} 
        bind:href={hrefDownload} bind:color={red} /> -->
</section>
<DownloadFooter on:DownloadClick/>

<style>
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
        width: 45%;
        height: 70%;
        display: flex;
        flex-direction: column;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        background-color: #164863;
        border-radius: 10px;
    }
</style>