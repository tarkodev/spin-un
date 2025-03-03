<script lang="ts">
    import { onMount } from "svelte";
    import NavNotConnected from "../NavNotConnected.svelte";
    let serverUrl: string;
    let errorMessage: string = "";
    let successMessage: string = "";

    onMount(() => {
        serverUrl = import.meta.env.VITE_SERVER_URL;
    });

    function checkform() {
        // verifie tous les inputs du formulaire
        var form = document.getElementById("form");
        var inputs = form.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if(inputs[i].hasAttribute("required")){
                if(inputs[i].value === ""){
                    return false;
                }
            }
        }
        return true;
    }

    async function resetPassword(
        email: string,
        newPassword: string,
        code: string,
    ) {
        try {
            let response = await fetch(
                `${serverUrl}/auth/reset-password-confirmation`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        newPassword: newPassword,
                        code: code,
                    }),
                },
            );

            return (await response.json()).status;

        } catch (error) {
            throw error;
        }
    }

    async function submitButton() {

        const email = (<HTMLInputElement>document.getElementById("email")).value.trim();
        const newPassword = (<HTMLInputElement>document.getElementById("newPassword")).value.trim();
        const newPasswordConfirm = (<HTMLInputElement>document.getElementById("newPasswordConfirm")).value.trim();
        const code = (<HTMLInputElement>document.getElementById("code")).value.trim();

        const errorMessageElement = document.getElementById("error-message");
        const successMessageElement = document.getElementById("success-message");

        // Réinitialisation des messages
        errorMessage = "";
        successMessage = "";
        errorMessageElement.textContent = "";
        successMessageElement.textContent = "";

        if (checkform() == false){
            errorMessage = "Tous les champs doivent êtres remplis.";
            errorMessageElement.textContent = errorMessage;
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            errorMessage = "Les mot de passes ne correspondent pas.";
            errorMessageElement.textContent = errorMessage;
            return;
        }

        try {
            let status = await resetPassword(
                email,
                newPasswordConfirm,
                code,
            );

            if (status == 200) {
                successMessage =
                    "Le mot de passe a été réinitialisé.";
                successMessageElement.textContent = successMessage;
            } else if (status == 404) {
                errorMessage = "Aucun utilisateur ne possède cet email";
                errorMessageElement.textContent = errorMessage;
            } else if (status == 401) {
                errorMessage = "Code incorrect";
                errorMessageElement.textContent = errorMessage;
            } else {
                errorMessage = "Une erreur s'est produite, merci de ressayer plus tard";
                errorMessageElement.textContent = errorMessage;
            }
        } catch (error) {
            throw error;
        }
    }
</script>


<NavNotConnected/>
<article>
    <h1>Changement de mots de passe</h1>
    <form id="form">
        <div id="form_container">
            <div>
                <label for="email">Mail: <span>*</span></label><br />
                <input name="email" placeholder="" type="email" id="email" required/><br/>
                <label for="newPassword">Nouveau mot de passe: <span>*</span></label><br />
                <input name="newPassword" placeholder="" type="password" id="newPassword" required/><br />
                <label for="newPasswordConfirm">Confirmation nouveau mot de passe: <span>*</span></label><br />
                <input name="newPassword" placeholder="" type="password" id="newPasswordConfirm" required/><br />
                <label for="code">Numero secret: <span>*</span></label><br />
                <input name="code" placeholder="" id="code" required/><br />
                <p id="error-message" style="color: red; font-size: 14px;"> {errorMessage} </p>
                <p id="success-message" style="color: green; font-size: 14px;"> {successMessage} </p>
            </div>
        </div>
        <button type="button" on:click={submitButton}>Envoyer</button>
    </form>
</article>

<style>
    form {
        margin-left: auto;
        margin-right: auto;

        display: flex;
        flex-direction: column;
        width: 100%;
    }

    #form_container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    input {
        border: none;
        border-radius: 5px;
        height: 40px;
        margin-bottom: 0px;
    }

    button[type="button"] {
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        /*background-color: #82b74b;*/
        border: none;
        /*box-shadow: 0 4px 4px #405d27;*/
        color: white;

        height: 50px;

        cursor: pointer;

        background: #3c8224;
        box-shadow: 0px 4px 4px #000000;
        align-self: center;
    }

    button[type="button"]:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        /*box-shadow: 0 2px 0 #000000;*/
        border-bottom: 3px solid black;
        transform: translateY(3px);
    }

    article {
        width: fit-content;
        height: fit-content;
        padding: 1%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: 1% auto;
        background-color: #164863;
        /*border: 1px solid black;*/

        font-family: "Hanken Grotesk";
    }

    h1 {
        margin-left: auto;
        margin-right: auto;
        font-size: 2em;
        font-weight: bolder;
        color: white;

        margin-bottom: 20px;
        margin-top: 5px;

        margin-top: 10px;
    }

    input {
        background-color: #164863;
        border: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        color: white;
        font-weight: bolder;

        font-size: 0.9em;

        margin-bottom: 20px;

        width: 80%;
    }

    #form_container div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 50%;
        align-items: center;
    }

    #form_container div label {
        align-self: flex-start;
        margin-left: 10%;
    }

    label {
        color: white;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        font-weight: 100;
    }

    label span {
        color: #c94c4c;
        font-size: 1.4em;
        font-weight: bolder;
    }

    form p {
        margin-bottom: 10px;
    }

    input[name="email"] {
        margin-bottom: 10px;
    }
</style>
