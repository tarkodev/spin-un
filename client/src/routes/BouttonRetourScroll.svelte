<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<!--<article></article>-->
<nav>
    <div on:click={() => dispatch('GoBackClick')}>
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

    div {
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

    div p {
        color: #9BBEC8;
        font-family: "Hanken Grotesk";
    }

    div:hover {
        cursor: pointer;
    }

    nav {
        position: sticky;
        z-index: 10;
        /*background-color: #427D9D;*/
        top: 0vh;
        /*border-bottom: 2px solid #164863;*/

        /*
        display: flex;
        flex-direction: column;*/
    }

    article {
        width: 100%;
        height: 5vh;
        position: fixed;

        top: 20vh;

        /*border-bottom: 2px solid #164863;*/
        background-color: #427D9D;
        width: 40%;

        margin: auto;
        left: 50%;
        margin-left: auto;
        margin-right: auto;
        transform: translate(-50%,0%);
        /*margin-top: 22px;*/
    }

    /*
    nav {
        /*position: absolute;
        height: 200%;

        border: 1px solid black;
    }

    div {
        position: sticky;
        top: 0;
    }*/
</style>