<script>
    //import Nav from "./Nav.svelte";

    import LoginForm from "./LoginForm.svelte";
    import SignupForm from "./SignupForm.svelte";

    let lastPageUrl = document.referrer;

    import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

import MediaQuery from "../MediaQuery.svelte";

import NavNotConnected from "../NavNotConnected.svelte";
    import DownloadFooter from "../DownloadFooter.svelte";

export let login;
</script>

<!-- <Nav /> 
<nav>
    <button>go back</button>
    
</nav>  -->

<!--# MOBILE #-->
<MediaQuery query="(max-width: 700px)" let:matches>
  {#if matches}
  
  {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery query="(min-width: 701px)" let:matches>
  {#if matches}
  
  {/if}
</MediaQuery>

<NavNotConnected />
<section>
  {#if login}
    <LoginForm on:ConnectClick on:SignupClick on:ForgetPWDClick/>
  {:else}
    <SignupForm on:LoginClick on:SignupTestClick on:SignupYessir/>
  {/if}
</section>
<DownloadFooter on:DownloadClick/>

<style>
    /*
    nav {
        /*border: 1px solid black;
        box-shadow: 1px 1px 1px black;
        width: 100%;
        height: 5vh;

        display: flex;
        justify-content: flex-end;
    }*/

    section {
        width: 50%;
        height: 70vh;

        display: flex;
        flex-direction: column;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        /*border: 1px solid black;*/

        font-family: "Hanken Grotesk";
    }

    article {
        width: 75%;
        height: 65vh;
        box-shadow: 0px 5px 6px #454140;
        border-radius: 40px;

        display: flex;
        flex-direction: column;
    }

    h1 {
        margin-left: auto;
        margin-right: auto;
        font-size: 2em;
        color: #454140;
    }

    form {
        margin-left: auto;
        margin-right: auto;
    }
</style>