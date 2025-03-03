<script>
    import MediaQuery from './MediaQuery.svelte';

    import {createEventDispatcher} from 'svelte';

    let logo1 = 'assets/logo-tournant-blanc.png'
    let logo2 = 'assets/logo2-blanc.png'

    const dispatch = createEventDispatcher();

    import NavConnect from './NavConnect_.svelte';
    import NavPlayerInfo from './NavPlayerInfo_.svelte';
    import {CookieType, getCookie, setCookie} from '../manager/cookie'

    let isConnected = false;

    function changeVar() {
        isConnected = true;
    }

    let token = false;
    

    console.log(getCookie(CookieType.Token));

    if(getCookie(CookieType.Token) !== "")
        token = true;
</script>


    <!--
    <img src="{logo1}" alt="SpinUn Logo" id="logo">
    <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">

    <!--
    <div id="connect">
        <div>
            <p>Connecte toi ou inscris toi pour jouer. L'inscription ne prend que <span>1 minute</span> !</p>
        </div>
        <div>
            <a id="login_button" on:click={() => dispatch('LoginClick')}>Connexion</a>
            <a id="signup_button" on:click={() => dispatch('SignupClick')}>Inscription</a>
        </div>
    </div>

    {#if !isConnected}
        <NavConnect on:LoginClick
            on:SignupClick />
        <button id="test_button" on:click={changeVar} >Test</button>
    {:else}
        <NavPlayerInfo />
    {/if}
-->

    <!--# MOBILE #-->
    <MediaQuery query="(max-width: 700px)" let:matches>
        {#if matches}
            <p style="position: absolute;
                        background-color: red;">
            mobile</p>

            <nav style="flex-direction: column;">
            <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun" style="margin-left: 0; margin: auto;">
            {#if !token}
                <NavConnect on:LoginClick
                    on:SignupClick />
                <button id="test_button" on:click={changeVar} >Test</button>
            {:else}
                <NavPlayerInfo on:DecoClick />
            {/if}
            </nav>
        {/if}
    </MediaQuery>

    <!--# TABLETTE #-->
    <MediaQuery query="(min-width: 701px) and (max-width: 1100px)" let:matches>
        {#if matches}
            <p style="position: absolute;
                        background-color: orange;">
            tablette</p>

            <nav style="">
            <img src="{logo1}" alt="SpinUn Logo" id="logo">
            <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">
            {#if !token}
                <NavConnect on:LoginClick
                    on:SignupClick />
                <button id="test_button" on:click={changeVar} >Test</button>
            {:else}
                <NavPlayerInfo on:DecoClick />
            {/if}
            </nav>
        {/if}
    </MediaQuery>

    <!--# ORDINATEUR PETIT #-->
    <MediaQuery query="(min-width: 1101px) and (max-width: 1500px)" let:matches>
        {#if matches}
            <p style="position: absolute;
                        background-color: green;">
            ordinateur petit</p>

            <nav>
            <img src="{logo1}" alt="SpinUn Logo" id="logo">
            <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">
            {#if !token}
                <NavConnect on:LoginClick
                    on:SignupClick />
                <button id="test_button" on:click={changeVar} >Test</button>
                <!--<button id="test_button2" on:click={deleteCookie} >Vider cookie</button>-->
                
                
            {:else}
                <NavPlayerInfo on:DecoClick />
            {/if}
            </nav>
        {/if}
    </MediaQuery>

    <!--# ORDINATEUR GRAND #-->
    <MediaQuery query="(min-width: 1501px)" let:matches>
        {#if matches}
            <p style="position: absolute;
                        background-color: green;">
            ordinateur grand</p>

            <nav>
            <img src="{logo1}" alt="SpinUn Logo" id="logo">
            <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">
            {#if !token}
                <NavConnect on:LoginClick
                    on:SignupClick />
                <button id="test_button" on:click={changeVar} >Test</button>
            {:else}
                <NavPlayerInfo on:DecoClick on:MonProfilClick/>
            {/if}
            </nav>
        {/if}
    </MediaQuery>


<style>
    /*
    @media screen and (max-width: 800px) {
        nav {
            height: 5%;
        }
    }
    */

    #test_button2 {
        position: absolute;
        top: 50px;
    }

    a {
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }

    nav {
        width: 100%;
        height: 20vh;

        /*box-shadow: 0px 5px 0px #454140;*/
        margin: auto;

        display: flex;

        flex-direction: row;
        justify-content: space-between;

        background-color: #164863;
    }

    img {
        height: 90%;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
    }

    #logo {
        animation: rotate 4s infinite;
        /*filter: drop-shadow(10px 7px 10px dimgray);*/
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    #logoSpinun {
        filter: drop-shadow(10px 7px 10px dimgray);
        /*margin-left: 19%;*/
        /*justify-self: flex-start;*/
        margin-right: auto;
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

    div div:nth-child(1) {
        background-color: #003366;
        color: white;
        width: 65%;
        border-radius: 30px;
        font-family: "Hanken Grotesk";
        font-size: 1.1em;

        font-weight: bolder;

        text-align: center;
        border: 2px solid white;
        height: 60%;
    }

    span {
        color: #c94c4c;
    }

    div div:nth-child(2) {
        align-self: center;
        justify-self: flex-end;
        margin-right: 0px;

        display: flex;
        flex-direction: column;

        justify-content: space-around;

        /*border: 1px solid black;*/
        height: 80%;
        width: 35%;
    }

    #login_button {

        border-radius: 50px;
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
        border-radius: 30px;

    }

    #login_button:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #signup_button {
        border-radius: 50px;
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
        border-radius: 30px;

    }

    #signup_button:hover {
        /*box-shadow: 0 2px 0 #c94c4c;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #test_button {
        position: absolute;
    }

    nav {
        position: fixed;
        top: 0;
        overflow: hidden;
    }
</style>