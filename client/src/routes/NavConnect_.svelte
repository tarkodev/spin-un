<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    import MediaQuery from './MediaQuery.svelte';
</script>

<!--# MOBILE #-->
<MediaQuery query="(max-width: 700px)" let:matches>
    {#if matches}
        <div id="connect">
            <div id="buttons" style="width: 100%; height: 100%; font-size: 0.7em;" >
                <a id="login_button" on:click={() => dispatch('LoginClick')} >Connexion</a>
                <a id="signup_button" on:click={() => dispatch('SignupClick')} >Inscription</a>
            </div>
        </div>
    {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery query="(min-width: 701px)" let:matches>
    {#if matches}
        <div id="connect">
            <div id="help">
                <p>Connecte toi pour jouer.</p>
                <p>Inscription en <span>1 minute</span> !</p>
            </div>
            <div id="buttons">
                <a id="login_button" on:click={() => dispatch('LoginClick')} >Connexion</a>
                <a id="signup_button" on:click={() => dispatch('SignupClick')} >Inscription</a>
            </div>
        </div>
    {/if}
</MediaQuery>

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

    div #help {
        background-color: lightgrey;
        color: black;
        width: 65%;
        border-radius: 30px;
        font-family: "Hanken Grotesk";
        font-size: 1.1em;

        font-weight: bolder;

        text-align: center;
        outline: 3px outset black;
        height: 60%;

        flex-direction: column;
        justify-content: center;
    }

    div #help p {
        margin: 0;
    }

    span {
        color: #c94c4c;
    }

    div #buttons {
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
</style>