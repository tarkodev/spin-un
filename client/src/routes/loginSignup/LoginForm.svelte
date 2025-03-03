<script>
    import MediaQuery from "../MediaQuery.svelte";

    import { createEventDispatcher } from 'svelte';
    import {CookieType, setCookie, getCookie} from "../../manager/cookie.ts";
    import {refreshSocketio} from "../../manager/socketio.ts";


    const dispatch = createEventDispatcher();

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    let error = false;
    
    async function login() {
        var loginVal = document.getElementsByName("login")[0].value;
        var passwordValue = document.getElementsByName("password")[0].value;

        try {


            const response = await fetch(`${serverUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: loginVal,
                    password: passwordValue
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

            if (status == 404 || status == 401 || status == 400) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error('Failed to fetch scores');
            }
            if(data.status == 401) {
                error = true;
            }
            if (data.status == 200) {
                console.log("vous etes connecté");
                setCookie(CookieType.Token, data.token)
                setCookie(CookieType.Login, loginVal)
                /*
                setCookie("login", data.login, 1);
                setCookie("score", data.score, 1);*/

                //setCookie2("reload_connect", "true", 1)

                //location.reload()
                //location.replace('/')
                
                //location.href = '/'
                refreshSocketio();
                dispatch("ConnectClick");
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
<MediaQuery let:matches query="(max-width: 700px)">
    {#if matches}
        <article>
            <h1>Jouer en ligne</h1>
            <form on:submit|preventDefault={login}>
                <label>Login</label><br>
                <input type="text" name="login" placeholder=""><br>
                <label>Mot de passe</label>
                <!--
                <div style="display: flex; justify-content: space-between;">
                    <label id="oublie" style="text-decoration: underline;">oublié ?</label>
                </div>-->
                <br>
                <input type="password" name="password" placeholder=""><br>
                <a id="forgot" on:click={() => dispatch('ForgetPWDClick')}>Mot de passe oublié</a><br>
                <button type="submit">Se connecter</button> <!-- on:click={login}-->
            </form>
            <div id="errorContainer">
                {#if error}
                    <p id="errorMessage">Mauvais Login ou Mot de passe</p>
                {/if}
            </div>

            <div id="separator"></div>
            <div id="signup_div">
                <p id="ask">Vous n'avez pas de compte ?</p>
                <button id="signup" on:click={() => dispatch('SignupClick')}>Inscription en 1 minute</button>
            </div>
        </article>
    {/if}
</MediaQuery>

<!--# TABLETTE #-->
<MediaQuery let:matches query="(min-width: 701px)">
    {#if matches}
        <article>
            <h1>Jouer en ligne</h1>
            <form on:submit|preventDefault={login}>
                <label>Login</label><br>
                <input type="text" name="login" placeholder=""><br>
                <label>Mot de passe</label>
                <!--
                <div style="display: flex; justify-content: space-between;">
                    <label id="oublie" style="text-decoration: underline;">oublié ?</label>
                </div>-->
                <br>
                <input type="password" name="password" placeholder=""><br>
                <a id="forgot" on:click={() => dispatch('ForgetPWDClick')}>Mot de passe oublié</a><br>
                <button type="submit">Se connecter</button> <!-- on:click={login}-->
            </form>
            <div id="errorContainer">
                {#if error}
                    <p id="errorMessage">Mauvais Login ou Mot de passe</p>
                {/if}
            </div>

            <div id="separator"></div>
            <div id="signup_div">
                <p id="ask">Vous n'avez pas de compte ?</p>
                <button id="signup" on:click={() => dispatch('SignupClick')}>Inscription en 1 minute</button>
            </div>
        </article>
    {/if}
</MediaQuery>

<style>
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

    #signup:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        /*box-shadow: 0 2px 0 #000000;*/
        transform: translateY(3px);
    }

    #ask {
        text-align: center;
    }

    #errorMessage {
        color: #c94c4c;
        text-align: center;
        background-color: white;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        margin-bottom: 5%;
    }

    form {
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    input {
        border: none;
        border-radius: 5px;
        height: 40px;
        margin-bottom: 20px;
    }

    input[type=text], select {
        /*border: 3px solid black;*/
    }

    button[type="submit"] {
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        border: none;
        color: white;
        height: 50px;
        cursor: pointer;
        background: #3C8224;
        align-self: center;
        margin-bottom: 5%;
    }

    button[type="submit"]:hover {
        transform: translateY(3px);
    }

    article {
        width: 55%;
        height: fit-content;

        border-radius: 5px;

        display: flex;
        flex-direction: column;

        background-color: #164863;

        font-weight: bolder;
        color: white;

        justify-content: flex-start;
        /*height: 85%;*/
    }

    h1 {
        margin-left: auto;
        margin-right: auto;
        font-size: 2em;
        font-weight: bolder;
        color: white;

        margin-bottom: 30px;

        margin-top: 10px;
    }

    #signup_div {


        justify-self: flex-end;
        /*height: 28%;*/

        width: 100%;

        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        margin-bottom: 20px;
    }

    #signup_div p {
        margin: 10px;
    }

    input {
        background-color: #164863;
        border: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        color: white;
        font-weight: bolder;

        font-size: 1.2em;

        margin-bottom: 30px;
    }

    label {
        color: white;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        font-weight: 100;
    }

    #errorContainer {
        width: 100%;
        height: 15%;
        /*border: 1px solid black;*/

        display: flex;
        justify-content: center;
    }

    #errorMessage {
        margin: 0;
        margin-top: auto;
        margin-bottom: auto;
    }

    input[name=password] {
        margin-bottom: 5px;
    }

    #forgot {
        text-decoration: underline;
        margin-bottom: 30px;
    }

    #forgot:hover {
        cursor: pointer;
    }

    #separator {
        width: 100%;
        border-top: 2px solid #427D9D;
    }

    #oublie {
        /*background-color: #427D9D;*/
    }

    #oublie:hover {
        cursor: pointer;
    }
</style>