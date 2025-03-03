<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<nav>
    <div id="bouttonHautGauche" on:click={() => dispatch('GoBackClick')}>
        <p>Retour</p>
    </div>
</nav>



<style>
    nav {
        width: 100%;
        height: 10vh;

        /*border-top: 1px solid black;
        border-bottom: 1px solid black;*/

        display: flex;
    }

    #bouttonHautGauche {
        width: 100px;
        height: 50%;
        border-radius: 5px;
        box-shadow: 0px 3px #9BBEC8;
        background-color: #164863;
        margin-left: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: auto;
        margin-bottom: auto;
    }

    #bouttonHautGauche p {
        color: #9BBEC8;
        font-family: "Hanken Grotesk";
    }

    #bouttonHautGauche:hover {
        cursor: pointer;
    }

    /*
    nav {
        position: fixed;
        z-index: 10;
        background-color: #427D9D;
        top: 20vh;
        border-bottom: 2px solid #164863;
    }
    */
</style>