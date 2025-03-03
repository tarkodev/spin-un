<script>
    import MediaQuery from './MediaQuery.svelte';

    import {createEventDispatcher} from 'svelte';

    let logo1 = 'assets/logo-tournant-blanc.png'
    let logo2 = 'assets/logo2-blanc.png'

    let logo3 = 'assets/cards.png'

    const dispatch = createEventDispatcher();
</script>


    <!--# MOBILE #-->
    <MediaQuery query="(max-width: 700px)" let:matches>
        {#if matches}
            <!--<p style="position: absolute;
                        background-color: red;">
            mobile</p>-->

            
        {/if}
    </MediaQuery>

    <!--# TABLETTE #-->
    <MediaQuery query="(min-width: 701px) and (max-width: 1100px)" let:matches>
        {#if matches}
            <!--<p style="position: absolute;
                        background-color: orange;">
            tablette</p>-->

            
        {/if}
    </MediaQuery>

    <!--# ORDINATEUR PETIT #-->
    <MediaQuery query="(min-width: 1101px) and (max-width: 1500px)" let:matches>
        {#if matches}
            <!--<p style="position: absolute;
                        background-color: green;">
            ordinateur petit</p>-->

            
        {/if}
    </MediaQuery>

    <!--# ORDINATEUR GRAND #-->
    <MediaQuery query="(min-width: 1501px)" let:matches>
        {#if matches}
            <!--<p style="position: absolute;
                        background-color: green;">
            ordinateur grand</p>-->

            
        {/if}
    </MediaQuery>


<nav>
    <div id="img_left"><img src="{logo3}" alt="decorative_cards"></div>
    <div id="center">
        <div id="center-top">
            <img src="{logo1}" alt="SpinUn Logo" id="logo">
            <img src="{logo2}" alt="SpinUn Logo" id="logoSpinun">
        </div>
        <div id="center-bottom"><p>Là où chaque tour de carte révèle un nouveau destin.</p></div>
    </div>
    <div id="img_right"><img src="{logo3}" alt="decorative_cards"></div>
</nav>


<style>
    div {
        /*
        align-self: center;
        justify-self: flex-end;
        margin-right: 10px;

        display: flex;
        flex-direction: row;

        justify-content: flex-end;

        /*border: 1px solid black;
        height: 80%;
        width: 30%;*/
        /*border: 1px solid black;*/
    }

    div div:nth-child(2) {
        /*
        align-self: center;
        justify-self: flex-end;
        margin-right: 0px;

        display: flex;
        flex-direction: column;

        justify-content: space-around;

        /*border: 1px solid black;
        height: 80%;
        width: 35%;
        */
    }


    #img_right {
        
    }

    #center {
        display: flex;
        flex-direction: column;

        /*border: 1px solid black;*/
        width: 50%;
        height: 100%;
    }

    #center-top {
        /*border: 1px solid black;*/
        width: 100%;
        height: 70%;

        display: flex;
        justify-content: center;
    }

    #center-bottom {
        /*border: 1px solid black;*/
        width: 100%;
        text-align: center;

        font-family: "Hanken Grotesk";
        color: white;
        height: 30%;
        font-size: 1.5em;
        font-weight: bolder;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    nav {
        width: 100%;
        height: 20vh;

        /*box-shadow: 0px 5px 0px #454140;*/
        margin: auto;

        display: flex;

        flex-direction: row;
        justify-content: center;

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
    }

    /*
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
    */

    span {
        color: #c94c4c;
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
</style>