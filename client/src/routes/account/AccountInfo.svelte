<script>
    import {createEventDispatcher, onMount} from "svelte";
    import {to_number} from "svelte/internal";
    import BouttonRetourScroll from "../BouttonRetourScroll.svelte";
    import {CookieType, getCookie, setCookie} from "../../manager/cookie.ts";

    const dispatch = createEventDispatcher();

    let errorMessage = "";
    let successMessageLogin = "";
    let erreurMessageLogin = "";
    let successMessageBio = "";
    let successMessageEmail = "";
    let successMessage = "";
    /*

    let start = "Mes zamis";
    let scoreboard = "Informations du compte";
    let lobby = "Historique des parties";
    let download = "Télécharger le jeu";

    let href = "LobbyClick";
    let href2 = "ScoreboardClick";
    let href3 = "GameClick";
    let hrefDownload = "DownloadClick";

    let blue = "blue";
    let red = "red";

    */

    let photo_profil;
    let login_input;
    let bio_input;
    let email_input;

    /*---------------------------------------------------------------------------------------------*/

    let password = "";
    let confirmPassword = "";

    function deleteAccount() {
        const modal = document.getElementById("delete-modal");
        modal.style.display = "block";
    }

    function closeModal() {
        const modal = document.getElementById("delete-modal");
        modal.style.display = "none";
    }

    async function confirmDelete() {
        let inputPassword = document.getElementById("password");
        let inputConfirmPassword = document.getElementById("confirm-password");
        let errorMessage = document.getElementById(
            "error-message-delete-account",
        );

        // Réinitialiser les champs
        errorMessage.textContent = "";
        inputPassword.style.border = "";
        inputConfirmPassword.style.border = "";

        if (password === "" && confirmPassword === "") {
            inputPassword.style.border = "1px solid red";
            inputConfirmPassword.style.border = "1px solid red";
            errorMessage.textContent = "Veuillez remplir tous les champs";
        } else if (password === "" && confirmPassword !== "") {
            inputPassword.style.border = "1px solid red";
            errorMessage.textContent = "Veuillez indiquer votre mot de passe";
            return;
        } else if (password !== "" && confirmPassword === "") {
            inputConfirmPassword.style.border = "1px solid red";
            errorMessage.textContent = "Veuillez confirmer votre mot de passe";
            return;
        } else if (password !== confirmPassword) {
            inputConfirmPassword.style.border = "1px solid red";
            inputPassword.style.border = "1px solid red";
            errorMessage.textContent = "Les mots de passes ne concordent pas";
        } else {
            let response = await fetch(`${serverUrl}/auth/delete-account`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    password: password,
                }),
            });

            let status = (await response.json()).status;

            if (status === 200) {
                dispatch('DecoClick')
                //window.location.href = "http://192.168.0.10:10000/";
            } else if (status === 404) {
                console.log("ne devrait pas arriver");
            } else if (status === 401) {
                errorMessage.textContent = "Mot de passe incorrect";
            } else {
                console.log(status);
            }
        }
    }

    /*---------------------------------------------------------------------------------------------*/

    let confirmation_msg;
    onMount(() => {
        photo_profil = document.getElementById("pic");
        login_input = document.getElementById("login_input");
        bio_input = document.getElementById("bio");
        email_input = document.getElementById("email");

        confirmation_msg = document.getElementById("test");
    });

    function yeah() {
        const select = document.getElementById("cars");

        select.addEventListener("change", function handleChange(event) {
            console.log(event.target.value); // 👉️ get selected VALUE

            // 👇️ get selected VALUE even outside event handler
            console.log(select.options[select.selectedIndex].value);

            // 👇️ get selected TEXT in or outside event handler
            console.log(select.options[select.selectedIndex].text);

            let ret = select.options[select.selectedIndex].value;
            console.log("okok");
            console.log(ret);
            if (ret == "no_image") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/cropped-default-profile.webp')";
            }
            if (ret == "1") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/loicProfile.png')";
            }
            if (ret == "2") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/sebProfile.png')";
            }
            if (ret == "3") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/3.png')";
            }
            if (ret == "4") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/4.png')";
            }
            if (ret == "5") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/5.png')";
            }
            if (ret == "6") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/6.png')";
            }
            if (ret == "7") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/7.png')";
            }
            if (ret == "8") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/8.png')";
            }
            if (ret == "9") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/9.png')";
            }
            if (ret == "10") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/10.png')";
            }
            if (ret == "11") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/11.png')";
            }
            if (ret == "12") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/12.png')";
            }
            if (ret == "13") {
                photo_profil.style.backgroundImage =
                    "url('assets/photo-profile/13.png')";
            }

            return select.options[select.selectedIndex].value;
        });
    }

    onMount(() => {
        yeah();

        print_conf();
    });

    async function print_conf() {
        if (getCookie(CookieType.ConfirmationMessage) === "true") {
            window.scrollTo(0, 0);
            confirmation_msg.style.display = "flex";
            confirmation_msg.classList.add("test_anim");
            confirmation_msg.style.animation = "fade 2s ease 3.5s forwards";
            await delay(1500);
            confirmation_msg.style.display = "none";
            setCookie(CookieType.ConfirmationMessage, "false");
        }
    }

    let login2 = getCookie(CookieType.Login);

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    let error = false;

    let player_name = undefined;
    let player_email = undefined;
    let player_bio = undefined;
    let player_pic = undefined;

    async function getPlayerScore() {
        try {
            const response = await fetch(
                `${serverUrl}/user/profile/` + login2,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getCookie(CookieType.Token),
                    },
                },
            );

            let status = response.status;
            console.log(response);

            const data = await response.json();

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }
            if (data.status == 200) {
                console.log("infos reucperees");
                player_name = data.userProfile.login;
                player_email = data.userProfile.email;
                player_bio = data.userProfile.bio;
                player_pic = data.userProfile.profilePicture;
                //setCookie("score", data.userProfile.score, 1)
                //setCookie("profil_pic", data.userProfile.profilPicture, 1)
                //console.log(data.userProfile.profilPicture);
                //console.log(data.userProfile.score);
                login_input.value = player_name;
                console.log(player_name);

                if (player_email != null) email_input.value = player_email;
                if (player_bio != null) bio_input.value = player_bio;

                const select = document.getElementById("cars");
                console.log("photo porfil id: " + player_pic);
                if (player_pic === null) {
                    select.value = "no_image";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/cropped-default-profile.webp')";
                }
                if (player_pic === 1) {
                    select.value = "1";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/loicProfile.png')";
                }
                if (player_pic === 2) {
                    select.value = "2";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/sebProfile.png')";
                }
                if (player_pic === 3) {
                    select.value = "3";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/3.png')";
                }
                if (player_pic === 4) {
                    select.value = "4";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/4.png')";
                }
                if (player_pic === 5) {
                    select.value = "5";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/5.png')";
                }
                if (player_pic === 6) {
                    select.value = "6";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/6.png')";
                }
                if (player_pic === 7) {
                    select.value = "7";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/7.png')";
                }
                if (player_pic === 8) {
                    select.value = "8";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/8.png')";
                }
                if (player_pic === 9) {
                    select.value = "9";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/9.png')";
                }
                if (player_pic === 10) {
                    select.value = "10";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/10.png')";
                }
                if (player_pic === 11) {
                    select.value = "11";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/11.png')";
                }
                if (player_pic === 12) {
                    select.value = "12";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/12.png')";
                }
                if (player_pic === 13) {
                    select.value = "13";
                    console.log("ca a marche ici");
                    photo_profil.style.backgroundImage =
                        "url('assets/photo-profile/13.png')";
                }
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    getPlayerScore();

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    async function new_profile_pic() {
        const select = document.getElementById("cars");
        let ret = select.options[select.selectedIndex].value;
        if (ret === "no_image") ret = null;

        try {
            const response = await fetch(
                `${serverUrl}/user/update/profile-picture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getCookie(CookieType.Token),
                    },
                    body: JSON.stringify({
                        login: getCookie(CookieType.Login),
                        newProfilePicture: to_number(ret),
                    }),
                },
            );

            let status = response.status;
            console.log(response);

            const data = await response.json();

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }
            if (status == 201) {
                setCookie(CookieType.ProfilePicture, ret);

                /*
                        confirmation_msg.style.display = "flex";
                        confirmation_msg.classList.add('test_anim')
                        confirmation_msg.style.animation="fade 2s ease 3.5s forwards";
                        await delay(1500)
                        confirmation_msg.style.display = "none";
                        */
                setCookie(CookieType.ConfirmationMessage, "true");
                //location.reload()
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    // Sous-fonction pour update le login
    // Appelé dans update_user_info()
    async function update_login() {
        // TODO : gerer les cas ou login = "" ou " " , etc...

        try {
            const response = await fetch(`${serverUrl}/user/update/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    newLogin: login_input.value,
                }),
            });

            let status = response.status;
            console.log(response);

            const data = await response.json();



            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                erreurMessageLogin = "Erreur login 404"
                throw new Error("Failed to fetch scores");
            }

            if (status == 400) {
                console.log("errreur 404 couzin");
                error = true;
                erreurMessageLogin = "Erreur login 400"
                throw new Error("Failed to fetch scores");
            }

            if (status == 201) {
                setCookie(CookieType.Login, login_input.value);
                successMessageLogin = "Login modifier avec succes !!"
            }
        } catch (error) {
            console.error("Updating login failed ->", error);
            console.log(error);
        }
    }

    // Sous-fonction pour update la bio
    // Appelé dans update_user_info()
    async function update_bio() {
        //Si la bio est vide: alors null
        let bio_value;
        if (bio_input.value === "") bio_value = null;
        else bio_value = bio_input.value;

        try {
            const response = await fetch(`${serverUrl}/user/update/bio`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    newBio: bio_value,
                }),
            });

            let status = response.status;
            console.log(response);

            const data = await response.json();

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }

            if (status == 400) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }

            if (status == 201) {
                successMessageBio = "Bio change avec succes !!"
                //setCookie("login", login_input.value, 1);
            }
        } catch (error) {
            console.error("Updating login failed ->", error);
            console.log(error);
        }
    }

    // Sous-fonction pour update l'email
    // Appelé dans update_user_info()
    async function update_email() {
        //Si l'email est vide: alors null
        let email_value;
        if (email_input.value === "") email_value = null;
        else email_value = email_input.value;

        try {
            const response = await fetch(`${serverUrl}/user/update/email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    newEmail: email_value,
                }),
            });

            let status = response.status;
            console.log(response);

            const data = await response.json();

            if (status == 404) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }

            if (status == 400) {
                console.log("errreur 404 couzin");
                error = true;
                throw new Error("Failed to fetch scores");
            }

            if (status == 201) {
                successMessageEmail = "Mail changer avec succes !!"
                //setCookie("login", login_input.value, 1);
            }
        } catch (error) {
            console.error("Updating login failed ->", error);
            console.log(error);
        }
    }

    /*---------------------------------------------------------------------------------------------*/
    async function update_password() {
        let newPassword = document.getElementById("newPassword").value.trim();
        let newPasswordConfirm = document
            .getElementById("newPasswordConfirm")
            .value.trim();
        let inputNewPassword = document.getElementById("newPassword");
        let inputNewPasswordConfirm =
            document.getElementById("newPasswordConfirm");
        let errorMessageElement = document.getElementById("error-message");

        // Réinitialiser
        errorMessage = "";
        inputNewPassword.style.border = "";
        inputNewPasswordConfirm.style.border = "";

        if (newPassword !== "" || newPasswordConfirm !== "") {
            if (newPassword === "") {
                errorMessage = "Veuillez confirmer le mot de passe.";
                errorMessageElement.textContent = errorMessage;
                inputNewPassword.style.border = "1px solid red";
                return;
            }
            if (newPasswordConfirm === "") {
                errorMessage = "Veuillez confirmer le mot de passe.";
                errorMessageElement.textContent = errorMessage;
                inputNewPasswordConfirm.style.border = "1px solid red";
                return;
            }
            if (newPassword !== newPasswordConfirm) {
                errorMessage = "Les mot de passes ne concordent pas.";
                errorMessageElement.textContent = errorMessage;
                inputNewPasswordConfirm.style.border = "1px solid red";
                inputNewPassword.style.border = "1px solid red";
                return;
            }

            let response = await fetch(`${serverUrl}/user/update/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    newPassword: newPassword,
                }),
            });

            let status = (await response.json()).status;

            if (status == 200) {
                successMessage="Changement mots de passe effectuer"
                errorMessage=""
                console.log("ok");
            }
        }
    }

    /*---------------------------------------------------------------------------------------------*/
    /*---------------------------------------------------------------------------------------------*/
    async function delete_account() {
        let response = await fetch(`${serverUrl}/auth/delete-account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie(CookieType.Token),
            },
            body: JSON.stringify({
                login: getCookie(CookieType.Login),
                password: getCookie(CookieType.password),
            }),
        });

        let status = await response.json();

        if (status == 200) {
            console.log("ok");
        }
    }

    /*---------------------------------------------------------------------------------------------*/

    // Fonction appelée à la validation du formulaire
    /*  Plusieurs fetchs: photo, login, bio, email, mot de passe
     *   En cas d'echec d'un des fetchs: n'appliquer aucune modification
     *   Conserver les infos avant modif:
     *   Appeler une fonction rollback si un des fetchs echoue
     */
    async function update_user_info() {
        setCookie(CookieType.ConfirmationMessage, "true");
        //location.reload()

        new_profile_pic();

        //TODO : Update login provoque des soucis au back
        erreurMessageLogin=""
        successMessageLogin=""
        successMessageEmail=""
        successMessageBio=""
        update_login();
        update_bio();
        update_email();
        update_password();
       // dispatch("GoBackClick");
    }
</script>

<BouttonRetourScroll on:GoBackClick/>
<section>
    <article>
        <h1>Informations du compte</h1>

        <form on:submit|preventDefault={update_user_info}>
            <div id="profil_pic_selector">
                <div>
                    <label for="cars">Photo de profil</label>
                    <select id="cars" name="cars">
                        <option value="no_image">Pas d'image</option>
                        <option value="1">Image 1</option>
                        <option value="2">Image 2</option>
                        <option value="3">Image 3</option>
                        <option value="4">Image 4</option>
                        <option value="5">Image 5</option>
                        <option value="6">Image 6</option>
                        <option value="7">Image 7</option>
                        <option value="8">Image 8</option>
                        <option value="9">Image 9</option>
                        <option value="10">Image 10</option>
                        <option value="11">Image 11</option>
                        <option value="12">Image 12</option>
                        <option value="13">Image 13</option>
                    </select>
                </div>
                <div id="pic">
                    <!--<img src="/src/assets/photo-profile/loicProfile.png" alt="proposed profil pic">-->
                </div>
            </div>
            <label for="">Login</label><br/>
            <input
                    id="login_input"
                    name="login"
                    placeholder="exemple : Jean-Michel"
                    type="text"
            /><br/>
            <p
                    id="succes-message-login"
                    style="color: green; font-size: 14px;"
            >
                {successMessageLogin}
            </p>
            <p
                    id="erreur-message-login"
                    style="color: red; font-size: 14px;"
            >
                {erreurMessageLogin}
            </p>
            <label for="">Bio</label><br/>
            <textarea
                    id="bio"
                    name="subject"
                    placeholder="exemple : Je suis très sympa."
                    style="height:100px"
            ></textarea>
            <p
                    id="succes-message-bio"
                    style="color: green; font-size: 14px;"
            >
                {successMessageBio}
            </p>
            <label for="">Email</label><br/>
            <input
                    id="email"
                    name="login"
                    placeholder="exemple : jean-michel@gmail.com"
                    type="text"
            /><br/>
            <p
                    id="succes-message-email"
                    style="color: green; font-size: 14px;"
            >
                {successMessageEmail}
            </p>
            <label for="">Changement du mot de passe</label><br/>
            <input
                    id="newPassword"
                    name="newPassword"
                    placeholder="Nouveau Mot de Passe"
                    type="password"
            /><br/>
            <input
                    id="newPasswordConfirm"
                    name="login"
                    placeholder="Confirmation du mot de passe"
                    type="text"
            /><br/>
            <p id="succes-message" style="color: green; font-size: 14px;">
                {successMessage}
            </p>
            <p id="error-message" style="color: red; font-size: 14px;">
                {errorMessage}
            </p>
            <button class="validation_bouton" type="submit"
            >Valider les changements
            </button
            >
            <!-- on:click={login}-->
        </form>

        <p id="separator"></p>
        <button class="delete-button" on:click={deleteAccount}
        >Delete Account
        </button
        >
        <div class="modal" id="delete-modal">
            <div class="modal-content">
                <span class="close" on:click={closeModal}>&times;</span>
                <h2>Are you sure you want to delete your account?</h2>
                <form on:submit|preventDefault={confirmDelete}>
                    <label for="password">Password:</label>
                    <input
                            bind:value={password}
                            id="password"
                            name="password"
                            type="password"
                    />
                    <label for="confirm-password">Confirm Password:</label>
                    <input
                            bind:value={confirmPassword}
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                    />
                    <p
                            id="error-message-delete-account"
                            style="color: red; font-size: 14px;"
                    >
                        {errorMessage}
                    </p>
                    <button class="confirm-delete-button" on:click={() =>
                    confirmDelete} type="submit"
                    >Confirm Delete
                    </button
                    >
                </form>
            </div>
        </div>
    </article>
</section>

<div id="test"><p>Changements appliqués.</p></div>

<style>
    /*-----------------------------------------------------------------------------------*/
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
        background-color: #164863;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    /* Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .delete-button,
    .confirm-delete-button {
        background-color: red;
        border-radius: 5px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        border: none;
        color: white;
        height: 50px;
        cursor: pointer;
        align-self: center;
    }

    .delete-button:hover,
    .confirm-delete-button:hover {
        transform: translateY(3px);
    }

    /*-----------------------------------------------------------------------------------*/

    label {
        color: white;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        font-weight: 100;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    #test {
        position: fixed;
        width: 500px;
        height: 75px;
        background-color: rgba(60, 130, 36, 0.6);
        border-radius: 5px;
        /*left: auto;
            right: auto;*/
        margin-left: auto;
        margin-right: auto;
        margin: auto;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 20px;
        margin-top: 40px;

        border: 2px solid white;

        color: white;
        font-family: "Hanken Grotesk";
        font-size: 1.4em;
        font-weight: bolder;

        display: flex;
        justify-content: center;
        align-items: center;

        display: none;
        /*overflow: visible;*/
        animation: fade 1s ease 3.5s forwards;
    }

    .test_anim {
        transition: opacity 200ms,
        display 200ms;
    }

    textarea {
        margin-bottom: 20px;
        font-family: "Hanken Grotesk";
        resize: none;
    }

    #pic {
        /*border: 1px solid black;*/
        width: 50%;
        height: 100px;
    }

    #pic {
        background-image: url("assets/photo-profile/cropped-default-profile.webp");
        background-size: contain;

        height: 100px;
        width: 100px;

        border-radius: 5px;
        border: 5px solid #427d9d;
    }

    #pic img {
        height: 100px;
        width: 100px;

        border-radius: 5px;
        border: 5px solid #427d9d;
    }

    #profil_pic_selector {
        display: flex;

        justify-content: space-between;
        color: white;
        font-family: "Hanken Grotesk";

        /*border: 1px solid black;*/

        margin-bottom: 50px;

        width: 100%;

        align-self: center;
    }

    #profil_pic_selector div:nth-child(1) {
        width: 50%;
    }

    #profil_pic_selector label {
        text-align: center;
    }

    #profil_pic_selector select {
        border: none;
        background-color: white;
        border-radius: 5px;
        height: 50%;
        width: 100%;
    }

    #profil_pic_selector img {
        width: 70%;
        background-color: none;
    }

    #profil_pic_selector #pic {
        /*border: 1px solid white;*/
        display: flex;
        justify-content: flex-end;
    }

    #separator {
        width: 100%;
        border-top: 2px solid #427d9d;
        margin-top: 30px;
        margin-bottom: 0px;
    }

    section {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin: auto;

        /*border: 1px solid black;*/

        /*background-color: #d5f4e6;*/
        margin-top: 100px;
        z-index: -1;
    }

    article {
        width: 40%;
        height: 95%;
        display: flex;
        flex-direction: column;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        margin: auto;

        background-color: #164863;
        border-radius: 10px;

        margin-bottom: 20px;
    }

    h1 {
        margin-top: 20px;
        /*margin-bottom: 20%;*/
        font-family: "Hanken Grotesk";
        color: white;
        font-size: 1.4em;
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

    input[type="text"],
    select {
        /*border: 3px solid black;*/
    }

    .validation_bouton {
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
        /*box-shadow: 0px 4px 4px #000000;*/
        align-self: center;
    }

    .validation_bouton:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        /*box-shadow: 0 2px 0 #000000;*/
        transform: translateY(3px);
    }

    input {
        background-color: #164863;
        border: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        color: white;
        font-weight: bolder;

        font-size: 1.2em;

        margin-bottom: 50px;
    }

    textarea {
        /*border: 2px solid white;*/
        background-color: #164863;
        color: white;
        font-weight: bolder;
        font-size: 1.2em;

        margin-bottom: 50px;

        border: none;
        border-left: 2px solid white;
        border-bottom: 2px solid white;
    }

    select {
        border-radius: 0;
        border: none;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: #164863;
        /*border: 2px solid black;*/
    }

    select option {
        background-color: white;
        border-radius: 0;
        border: none;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: #164863;
    }

    /*
      option:checked {
          background-color: grey;
      }

      option:active {
          background-color: red;
      }

      option:focus {
          background-color: red;
      }

      option:hover {
          background-color: red;
      }
      */
</style>
