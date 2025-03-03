<script>
    import { onMount, afterUpdate } from "svelte";
    import { socketioNetwork } from "../../manager/socketio.ts";

    let message = "";
    let messages = [];

    // Écouter les événements de message
    socketioNetwork.on("chat-message", (login, data) => {
        messages = [...messages, `${login}: ${data}`];
    });

    // Envoyer un message de chat
    function sendChatMessage() {
        if (message.trim() !== "") {
            socketioNetwork.emit("chat-message", message);
            message = ""; // Réinitialiser le champ de saisie après l'envoi
        }
    }

    // Faire défiler vers le bas lorsque la liste des messages est mise à jour
    function scrollToBottom() {
        const messagesContainer = document.getElementById("messages");
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Faire défiler vers le bas après chaque mise à jour du composant
    afterUpdate(scrollToBottom);

    // Faire défiler vers le bas lorsque le composant est monté
    onMount(scrollToBottom);
</script>

<article class="chat">
    <div id="messages" class="messages">
        {#each messages as message, index}
            <p>{message}</p>
        {/each}
    </div>
    <div class="input-container">
        <input
            type="text"
            bind:value={message}
            placeholder="Type your message..."
        />
        <button on:click={sendChatMessage}>Send</button>
    </div>
</article>

<style>
    .chat {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        /*border: 1px solid #ccc;*/
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .messages {
        max-height: 200px; /* Limite de hauteur pour la barre de défilement */
        overflow-y: auto; /* Ajout de la barre de défilement verticale lorsque le contenu dépasse */
        margin-bottom: 10px;
        padding-right: 10px; /* Ajouter un padding pour éviter le chevauchement de la barre de défilement */
    }

    .input-container {
        display: flex;
    }

    input[type="text"] {
        flex: 1;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
    }

    p {
        margin: 5px 0;
        padding: 5px;
        background-color: #f9f9f9;
        border-radius: 3px;
    }

    p:nth-child(even) {
        background-color: #eaeaea; /* Couleur de fond pour les messages pairs */
    }
</style>

