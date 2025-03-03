<script>
    import MediaQuery from "../MediaQuery.svelte";
    import {createEventDispatcher, onDestroy} from 'svelte';
    import { loginFetch } from '../../manager/fetch.ts'
    import { setCookie } from "../../manager/cookie";
    import {refreshSocketio} from "../../manager/socketio.ts";
    const dispatch = createEventDispatcher();

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    let error = false;
    let loginAlreadyUsedError = false;

    let pwdError = false;

    async function signup() {
        var loginVal = document.getElementsByName("login")[0].value;
        var EmailVal = document.getElementsByName("email")[0].value;
        var passwordValue = document.getElementsByName("password")[0].value;
        var passwordConfValue = document.getElementsByName("password-confirmation")[0].value;

        if(passwordValue != passwordConfValue) {
            error = false;
            loginAlreadyUsedError = false;
            pwdError = true;
            return;
        }

        if(EmailVal === "")
            EmailVal = null

        try {
            const response = await fetch(`${serverUrl}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: loginVal,
                    password: passwordValue,
                    age: 18,
                    email: EmailVal
                }),
            });
            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data.token);
            /*
            console.log(data.login);
            console.log(data.score);
            */
            console.log(data);

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error('Failed to fetch scores');
            }

            if(status == 400) {
                loginAlreadyUsedError = false;
                error = true;
            }

            // code 409 -> login deja utilisé
            if(data.status == 409) {
                error = false;
                loginAlreadyUsedError = true;
            }

            if(data.status == 201) {
                console.log("vous etes connecté");
                //setCookie("token", data.token, 1);
                //setCookie("login", loginVal, 1);
                /*
                setCookie("login", data.login, 1);
                setCookie("score", data.score, 1);*/





                setCookie("first_connect", "true")
                loginFetch(serverUrl, loginVal, passwordValue)

                let intervalId = setTimeout(() => {
                    dispatch("SignupYessir");
                    refreshSocketio();
                }, 200);
            }

            //return await response.json();
            //const responseData = await response.json();
            //console.log(reponseData);
        } catch (error) {
            console.error('Error fetching scores:', error);
            //return null;

            console.log(error);
        }

    }
</script>

<!--# MOBILE #-->
<MediaQuery query="(max-width: 700px)" let:matches>
    {#if matches}
    <article>
        <h1>Inscription</h1>
        <form on:submit|preventDefault={signup}>
            <div id="form_container">
                <div>
                    <label>Login <span>*</span></label><br>
                    <input type="text" name="login" placeholder="exemple : Jean-Michel75"><br>
                    <label>Email<span></span></label><br>
                    <input type="text" name="email" placeholder="exemple : jean-michel75@gmail.com"><br>
                </div>
                <div>
                    <label>Mot de passe <span>*</span></label><br>
                    <input type="password" name="password" placeholder=""><br>
                    <label>Confirmation du mot de passe <span>*</span></label><br>
                    <input type="password" name="password-confirmation" placeholder=""><br>
                </div>
            </div>
            <p id="star_msg">Les entrées avec le symbole <span>*</span> sont obligatoires</p>
            <button type="submit">S'inscrire</button> <!-- on:click={login}-->
        </form>
        <div id="errorContainer">
        {#if error}
            <p id="errorMessage">Le Login et le Mot de passe ne doivent pas être vide.</p>
        {:else if loginAlreadyUsedError}
            <p id="errorMessage">Ce login est déjà utilisé.</p>
        {:else if pwdError}
            <p id="errorMessage">Les mots de passe diffèrent.</p>
        {/if}
        </div>
        <div id="separator"></div>
        <div id="signup_div">
            <p id="ask" >Vous avez déjà un compte ?</p>
            <button id="signup" on:click={() => dispatch('LoginClick')}>Se connecter</button>
        </div>
    </article>
    {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery query="(min-width: 701px)" let:matches>
    {#if matches}
        <article>
            <h1>Inscription</h1>
            <form on:submit|preventDefault={signup}>
                <div id="form_container">
                    <div>
                        <label>Login <span>*</span></label><br>
                        <input type="text" name="login" placeholder="exemple : Jean-Michel75"><br>
                        <label>Email<span></span></label><br>
                        <input type="text" name="email" placeholder="exemple : jean-michel75@gmail.com"><br>
                    </div>
                    <div>
                        <label>Mot de passe <span>*</span></label><br>
                        <input type="password" name="password" placeholder=""><br>
                        <label>Confirmation du mot de passe <span>*</span></label><br>
                        <input type="password" name="password-confirmation" placeholder=""><br>
                    </div>
                </div>
                <p id="star_msg">Les entrées avec le symbole <span>*</span> sont obligatoires</p>
                <button type="submit">S'inscrire</button> <!-- on:click={login}-->
            </form>
            <div id="errorContainer">
            {#if error}
                <p id="errorMessage">Le Login et le Mot de passe ne doivent pas être vide.</p>
            {:else if loginAlreadyUsedError}
                <p id="errorMessage">Ce login est déjà utilisé.</p>
            {:else if pwdError}
                <p id="errorMessage">Les mots de passe diffèrent.</p>
            {/if}
            </div>
            <div id="separator"></div>
            <div id="signup_div">
                <p id="ask">Vous avez déjà un compte ?</p>
                <button id="signup" on:click={() => dispatch('LoginClick')}>Se connecter</button>
            </div>
        </article>
    {/if}
</MediaQuery>

<style>
    p span {
        color: #c94c4c;
        font-size: 1.4em;
        font-weight: bolder;
    }

    #separator {
        width: 100%;
        border-top: 2px solid #427D9D;
    }

    #star_msg {
        text-align: center;
        /*margin: 10px;*/
        margin-top: 0;
    }

    #signup {
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        /*background-color: #82b74b;*/
        border: none;
        /*box-shadow: 0 4px 4px #405d27;*/
        color: white;
        height: 50px;
        cursor: pointer;
        background: #c94c4c;
        /*box-shadow: 0px 4px 4px #000000;*/
        align-self: center;
    }

    #ask {
        text-align: center;
    }

    #errorMessage {
        color: #c94c4c;
        text-align: center;
        /*margin: 10px*/
        background-color: white;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }

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

    input[type=text], select {
        /*border: 3px solid black;*/
    }

    button[type="submit"] {
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        /*background-color: #82b74b;*/
        border: none;
        /*box-shadow: 0 4px 4px #405d27;*/
        color: white;
        height: 50px;
        cursor: pointer;
        background: #3C8224;
        align-self: center;
    }

    button[type="submit"]:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        transform: translateY(3px);
    }

    article {
        width: 75%;
        border-radius: 5px;

        display: flex;
        flex-direction: column;

        background-color: #164863;
        height: fit-content;
        font-weight: bolder;
        color: white;
        /*padding-bottom: 5%;*/
        justify-content: flex-start;

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

    #signup_div {


        justify-self: flex-end;
        /*height: 38%;*/

        width: 100%;

        display: flex;
        justify-content: flex-end;
        flex-direction: column;

        margin-bottom: 20px;
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

    #signup_div p {
        margin: 10px;
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

    #errorContainer {
        width: 100%;
        height: 15%;
        /*border: 1px solid black;*/

        display: flex;
        justify-content: center;
    }

    form p {
        margin-bottom: 10px;
    }

    input[name=email] {
        margin-bottom: 10px;
    }

    input[name=password-confirmation] {
        margin-bottom: 10px;
    }

    #signup:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        /*box-shadow: 0 2px 0 #000000;*/
        transform: translateY(3px);
    }
</style>