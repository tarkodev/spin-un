<script lang="ts">

    export let button_name;
    export let href;

    export let color;

    import {createEventDispatcher} from 'svelte';

    import MediaQuery from './MediaQuery.svelte';

    const dispatch = createEventDispatcher();
</script>

<!--<a on:click class="button"><span>{button_name} </span></a>-->

<!--# MOBILE #-->
<MediaQuery query="(max-width: 500px)" let:matches>
    {#if matches}
        {#if color === "red"}
            <a on:click class="button" style="width: 300px; font-size: 28px; background-color:#c94c4c;"><span>{button_name} </span></a>
        {:else}
            <a on:click class="button" style="width: 300px; font-size: 28px;"><span>{button_name} </span></a>
        {/if}
    {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery query="(min-width: 501px)" let:matches>
    {#if matches}
        {#if color === "red"}
            <a on:click class="button" style="background-color:#c94c4c;"><span>{button_name} </span></a>
        {:else}
            <a on:click class="button" style="background-color: #9BBEC8;"><span>{button_name} </span></a>
        {/if}
    {/if}
</MediaQuery>

<style>

    .button {
        display: inline-block;
        /*border-radius: 4px;*/

        background: #073579;
        box-shadow: 0px 4px 0px #FFF;
        border-radius: 5px;
        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #164863;
        text-align: center;
        font-size: 36px; /** 28*/
        padding: 20px;
        /*default with : 200px*/
        width: 75%;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px 10px;

        height: 60px;

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