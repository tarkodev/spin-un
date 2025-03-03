<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {socketioNetwork} from '../../manager/socketio.ts';

    const dispatch = createEventDispatcher();

    // Création d'une variable réactive pour stocker le nom de la salle
    let roomName = "";

    // Fonction pour créer une salle avec le nom saisi
    function createRoom() {
        socketioNetwork.emit('createRoom', roomName);
        dispatch('CreateClick');
    }

    // Gestionnaire pour la soumission du formulaire
    function handleSubmit(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        createRoom(); // Crée la salle avec le nom saisi
    }

</script>

<nav>
</nav>
<section>
    <article>
        <h1 style="color: white;">Création d'une partie</h1>
        <form on:submit={handleSubmit}>
            <label for="roomName" style="color: white;">Nom de la partie</label><br>
            <input bind:value={roomName} id="roomName" type="text"><br>
            <button type="submit" class="button"><span>Créer</span></button>
        </form>
    </article>
</section>

<style>
    section {
        width: 50%;
        height: fit-content;
        padding-bottom: 5%;

        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        /*border: 1px solid black;*/

        font-family: "Hanken Grotesk";
    }

    #buttonCreer{
        background-color: #9BBEC8;
        border-radius: 5px;
        width: 100px;
        height: 50px;
        margin-top: 5%;
    }

    article {
        width: 75%;
        height: fit-content;
        padding-bottom: 5%;

        border-radius: 5px;

        display: flex;
        flex-direction: column;

        background-color: #164863;

        font-weight: bolder;
        color: #9BBEC8;
    }

    h1 {
        margin-left: auto;
        margin-right: auto;
        font-size: 2em;
        font-weight: bolder;
        /*color: #454140;*/
    }

    form {
        margin-left: auto;
        margin-right: auto;
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

    input {
        background-color: #164863;
        border: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        color: white;
        font-weight: bolder;

        font-size: 1.2em;

        margin-bottom: 50px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 320px;
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
        width: 75%;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px 10px;

        height: 50px;

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