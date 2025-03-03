<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<section>
    <nav>
        <a id="login_button" on:click={() => dispatch('GoBackClick')}><span>Revenir en arrière</span></a>

    </nav>
    <article>
        <div class="joueur">
            <p>Baris</p>
            <p>Mail</p>
            <p>Admin</p>
            <p>score : 24999</p>
            <span class="supprimer-compte">Supprimer le compte</span>
        </div>


        <div class="joueur">
            <p>Sebastien</p>
            <p>Mail</p>
            <p>Admin</p>
            <p>score : 24999</p>
            <span class="supprimer-compte">Supprimer le compte</span>
        </div>


        <div class="joueur">
            <p>Lucas</p>
            <p>Mail</p>
            <p>Joueur</p>
            <p>score : 134</p>
            <span class="supprimer-compte">Supprimer le compte</span>
        </div>

        <div class="joueur">
            <p>Mathieu</p>
            <p>Mail</p>
            <p>Joueur</p>
            <p>score : 877</p>
            <span class="supprimer-compte">Supprimer le compte</span>
        </div>
    </article>

</section>

<style>

    article {
        display: inline;
    }

    .joueur, .supprimer-compte {
        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #003366;
        font-family: "Hanken Grotesk";
        background-color: #D9D9D9;
        margin-top: 10px;
        border-radius: 30px;
    }

    .supprimer-compte {

        align-items: center;
        color: white;
        background: #822424;
        box-shadow: 0px 4px 4px #000000;
        border-radius: 30px;
        height: 40%;
        padding: 4px;
    }

    .supprimer-compte:hover {
        /*box-shadow: 0 2px 0 #c94c4c;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }


    nav {
        width: 95%;
        height: 10vh;
        display: flex;
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

    a {
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }
</style>