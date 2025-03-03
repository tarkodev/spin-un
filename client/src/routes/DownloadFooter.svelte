<script>
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    let isElectron = typeof api !== 'undefined'

</script>

{#if !isElectron}
<footer>
    <div id="download_button" on:click={() => dispatch('DownloadClick')}>
        <p>Obtenir l’application sur Windows, Mac ou Linux      <span>Cliquez ici</span></p>
    </div>
</footer>
{/if}

<style>
    footer {
      height: 10vh;
      width: 100%;

      /*border-top: 1px solid black;*/

      display: flex;
      justify-content: center;
      align-items: baseline;

      color: white;
      font-family: "Hanken Grotesk";
      font-size: 1.3em;
    }

    footer #download_button {
      border-radius: 5px;
      background-color: #164863;
      padding-left: 15px;
      padding-right: 15px;
      height: 80%;

      display: flex;
      align-items: center;
    }

    footer #download_button span {
      font-weight: bolder;
      text-decoration: underline;
    }

    footer #download_button:hover {
        cursor: pointer;
    }
</style>