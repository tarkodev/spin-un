<script lang="ts">
    import { socketioNetwork } from "../../manager/socketio";
    import { onDestroy, onMount } from "svelte";
    import { room, updateNetwork } from "../../manager/room";

    import { CookieType, getCookie } from "../../manager/cookie";

    import GamePlayerInfo from "./GamePlayerInfo.svelte";

    import { createEventDispatcher } from "svelte";
    import TchatInGame from "./TchatInGame.svelte";
    const dispatch = createEventDispatcher();

    export let afficheLeChat = false;

    let cartes = [];
    let deposit = { imagePath: `assets/carte/carte-.png` };

    function addCard(cardName) {
        cartes = [
            ...cartes,
            { name: cardName, imagePath: `assets/carte/carte-${cardName}.png` },
        ];
    }

    /*********************************************/
    function addCardSpin(cardName) {
        cartes = [
            ...cartes,
            {
                name: cardName,
                imagePath: `assets/carte/rcarte-${cardName}.png`,
            },
        ];
    }
    /***********************************************/

    function setDeposit(cardName) {
        deposit = {
            name: cardName,
            imagePath: `assets/carte/carte-${cardName}.png`,
        };
    }

    function setDepositSpin(cardName) {
        deposit = {
            name: cardName,
            imagePath: `assets/carte/rcarte-${cardName}.png`,
        };
    }

    function getCardName(cardName) {}

    let intervalId;

    onMount(() => {
        updateNetwork();

        intervalId = setInterval(() => {
            updateNetwork();
            updateGame(null);
        }, 50);
    });

    onDestroy(() => {
        // Nettoyer pour éviter les fuites de mémoire
        clearInterval(intervalId);
    });

    // variable qui contient la taille des mains
    let player1_handsize, player2_handsize, player3_handsize;
    let IsPlayingAnimation;
    let msg;
    let compteur = 1;
    let wheel_arrow;
    let wheel_arrow_rev;
    let compteur_arrow = 1;

    let print_color;
    let color;

    let inexium;
    let login1;
    let login2;

    let player1_login;
    let player2_login;
    let player3_login;

    let player1_score = -1;
    let player1_picId = -1;

    let player2_score = -1;
    let player2_picId = -1;

    let player3_score = -1;
    let player3_picId = -1;

    let winner_login = undefined;
    let looser1 = undefined;
    let looser2 = undefined;
    let looser3 = undefined;

    let playerId = undefined;

    let print_button_uno = false;

    //let choix_couleur

    let sens_de_rotation;

    let compteur_update = 0;

    let init = 0;

    let tourner_la_roue_switch = true;

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    function updateGame(event) {
        compteur_update++;
        // pour le multijoueur
        inexium = document.getElementById("inexium");
        login1 = $room.data.algoGame.room._playersList[0]._login;
        login2 = getCookie(CookieType.Login);
        if (
            $room.data.algoGame.room._playersList[0]._login ===
            getCookie(CookieType.Login)
        ) {
            playerId = 0;

            /*
            if (
                $room.data.algoGame.room._playersList[playerId]._hand.length >
                10
            ) {
                let hand = document.getElementById("bottom-canvas");

                for (
                    let i = 0;
                    i <
                    $room.data.algoGame.room._playersList[playerId]._hand
                        .length -
                        2;
                    i++
                ) {
                    //let hand2 = <HTMLElement>hand.getElementsByClassName("card")[i]
                    //hand2.style.left = "calc(var(--i)*3em)";
                    //console.log(i)

                    let hand2 = hand.querySelectorAll<HTMLElement>(".card")[i];
                    //console.log(hand2)
                    hand2.style.marginLeft = "-40px";
                    hand2.style.marginRight = "-40px";

                    //for(let card in hand2) {
                    //    card.style.left = "calc(var(--i)*3em)";
                    //}
                }
            }
            if (
                $room.data.algoGame.room._playersList[playerId]._hand.length <=
                    10 &&
                compteur_update >= 15
            ) {
                let hand = document.getElementById("bottom-canvas");

                for (
                    let i = 0;
                    i <
                    $room.data.algoGame.room._playersList[playerId]._hand
                        .length -
                        2;
                    i++
                ) {
                    //let hand2 = <HTMLElement>hand.getElementsByClassName("card")[i]
                    //hand2.style.left = "calc(var(--i)*3em)";
                    //console.log(i)

                    let hand2 = hand.querySelectorAll<HTMLElement>(".card")[i];
                    //console.log(hand2)
                    hand2.style.marginLeft = "-20px";
                    hand2.style.marginRight = "-20px";

                    //for(let card in hand2) {
                    //    card.style.left = "calc(var(--i)*3em)";
                    //}
                }
            }
            */
        } else if (
            $room.data.algoGame.room._playersList[1]._login ===
            getCookie(CookieType.Login)
        )
            playerId = 1;
        else if (
            $room.data.algoGame.room._playersList[2]._login ===
            getCookie(CookieType.Login)
        )
            playerId = 2;
        else if (
            $room.data.algoGame.room._playersList[3]._login ===
            getCookie(CookieType.Login)
        )
            playerId = 3;

        player1_login =
            $room.data.algoGame.room._playersList[(playerId + 1) % 4]._login;
        player2_login =
            $room.data.algoGame.room._playersList[(playerId + 2) % 4]._login;
        player3_login =
            $room.data.algoGame.room._playersList[(playerId + 3) % 4]._login;
        if (!init) {
            getPlayerScore2();
            getPlayerScore3();
            getPlayerScore4();
            init = 1;
        }

        console.log($room);

        cartes = [];

        player1_handsize =
            $room.data.algoGame.room._playersList[(playerId + 1) % 4]._hand
                .length;
        player2_handsize =
            $room.data.algoGame.room._playersList[(playerId + 2) % 4]._hand
                .length;
        player3_handsize =
            $room.data.algoGame.room._playersList[(playerId + 3) % 4]._hand
                .length;

        sens_de_rotation = $room.data.algoGame.room._game._direction;
        wheel_arrow = document.getElementById("wheel_default");
        wheel_arrow_rev = document.getElementById("wheel_default2");
        if (sens_de_rotation == 1 && compteur_arrow === 1) {
            /*wheel_arrow.classList.remove("wheel_rev")
            wheel_arrow.classList.add("wheel")*/
            wheel_arrow_rev.style.display = "none";
            wheel_arrow.style.display = "block";

            //wheel_arrow.style.animationName = "rotate"
            //wheel_arrow.style.animationDuration = "2s"
            //wheel_arrow.style.animationIterationCount = "infinite"
            compteur_arrow = 0;
        }
        if (sens_de_rotation == -1 && compteur_arrow === 0) {
            /*
            wheel_arrow.classList.remove("wheel")
            wheel_arrow.classList.add("wheel_rev")*/
            wheel_arrow.style.display = "none";
            wheel_arrow_rev.style.display = "block";

            //console.log("sens de rotation inverse")
            //wheel_arrow.style.display = "none"
            compteur_arrow = 1;
        }

        IsPlayingAnimation = $room.data.algoGame.room._whosTurn;
        print_msg();
        if (IsPlayingAnimation !== playerId) compteur = 0;
        if (IsPlayingAnimation === playerId && compteur === 0) compteur = 1;

        let bottom_canvas = document.getElementById("bottom-canvas");
        if (IsPlayingAnimation !== playerId) {
            bottom_canvas.style.opacity = "0.3";
        } else {
            bottom_canvas.style.opacity = "1";
        }

        let roomCard = $room.data.algoGame.room._playersList[playerId]._hand;
        //let roomCard = $room.data.algoGame.room._playersList[playerId]._hand;
        let depositCard = $room.data.algoGame.room._game._cardDeposit[0];

        //check carte changement de couleur
        print_color = document.getElementById("print_color");
        if (
            depositCard["_number"] + "-" + depositCard["_color"] ===
                "13-black" ||
            depositCard["_number"] + "-" + depositCard["_color"] === "14-black"
        ) {
            print_color.style.display = "block";
            if (
                $room.data.algoGame.room._game._cardDeposit[0]._chosenColor ===
                "green"
            )
                color = "Vert";
            else if (
                $room.data.algoGame.room._game._cardDeposit[0]._chosenColor ===
                "blue"
            )
                color = "Bleu";
            else if (
                $room.data.algoGame.room._game._cardDeposit[0]._chosenColor ===
                "red"
            )
                color = "Rouge";
            else if (
                $room.data.algoGame.room._game._cardDeposit[0]._chosenColor ===
                "yellow"
            )
                color = "Jaune";
        } else {
            delete_print_color();
        }

        //choix_couleur_msg()

        /***********************************************/
        /************MODE CLASSIC****************/
        /***********************************************/
        if (!$room.data.isSpin) {
            for (let i = 0; i < roomCard.length; i++) {
                let card = roomCard[i];
                addCard(card["_number"] + "-" + card["_color"]);
            }

            setDeposit(depositCard["_number"] + "-" + depositCard["_color"]);
        } else {
            /***********************************************/
            /***************MODE SPIN******************/
            /***********************************************/
            for (let i = 0; i < roomCard.length; i++) {
                let card = roomCard[i];
                if (card._isSpin)
                    addCardSpin(
                        card["_number"] + "-" + card["_color"] + "-spin",
                    );
                else addCard(card["_number"] + "-" + card["_color"]);
            }

            // TO DO
            if (!depositCard._isSpin)
                setDeposit(
                    depositCard["_number"] + "-" + depositCard["_color"],
                );
            else
                setDepositSpin(
                    depositCard["_number"] +
                        "-" +
                        depositCard["_color"] +
                        "-spin",
                );
        }
        /***********************************************/
        /***********************************************/
        /***********************************************/

        if ($room.data.isSpin) {
            if ($room.data.algoGame.room._isBlocked && tourner_la_roue_switch) {
                tourner_la_roue_switch = false;
                tourner_la_roue();

                //updateSpin("1");
            }
        }

        if (!$room.data.algoGame.room._isBlocked) tourner_la_roue_switch = true;

        /*********************************/
        /*********Affichage boutton UNO + compteur ************/
        /*********************************/
        if (
            $room.data.algoGame.room._playersList[playerId]._mustSayUno &&
            print_button_uno === false
        ) {
            print_button_uno = true;
            notUnoSaidReseau();
        }

        if ($room.data.algoGame.room._isFinished) {
            for (let i = 0; i < 4; i++) {
                if (
                    $room.data.algoGame.room._playersList[i]._hand.length === 0
                ) {
                    winner_login =
                        $room.data.algoGame.room._playersList[i]._login;
                    print_scoreboard();
                } else {
                    if (looser1 === undefined)
                        looser1 =
                            $room.data.algoGame.room._playersList[i]._login;
                    else if (looser2 === undefined)
                        looser2 =
                            $room.data.algoGame.room._playersList[i]._login;
                    else
                        looser3 =
                            $room.data.algoGame.room._playersList[i]._login;
                }
            }
            clearInterval(intervalId);
        }

        //console.log(afficheLeChat)
        let le_chat = document.getElementById("le_chat");
        if (afficheLeChat) le_chat.style.display = "block";
        else le_chat.style.display = "none";
    }

    let points_applied = false;
    let return_compteur = false;

    let has_quit = false;

    let compteur_avant_retour = 10;
    async function print_scoreboard() {
        if (points_applied === false) {
            points_applied = true;

            getPlayerScore();
            await delay(500);
            if (getCookie(CookieType.Login) === winner_login) update_score(10);
            else update_score(3);
            /* ne doit pas être fait coté client !*/
            /* ne doit être fait une unique */
            /* Enregistrement de la partie dans la base de donnée. */

            /* 
                Data est un json qui doit contenir les champs suivants :
                Data: {
                    players: {
                        player: string;
                        score: number;
                        rank: number;
                    }[],
                    selectedMode: string,
                    accessMode: string,
                    createAt: Date, 
                    finishedAt: Date
                }
            */
            /*
            let data = {};
            let response = await fetch(`${serverUrl}/game/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            */
        }

        let msg = document.getElementById("winner_msg");
        let game = document.getElementById("game");
        let scoreboard = document.getElementById("scoreboard");

        msg.style.display = "block";
        await delay(1000);

        game.style.display = "none";
        scoreboard.style.display = "block";


        if (!return_compteur) {
            return_compteur = true;

            for (let i = 0; i < 11; i++) {
                await delay(1000);
                compteur_avant_retour--;
            }

            if(!has_quit) {
                socketioNetwork.emit("sendActionData", {
                uuid: $room.data.uuid,
                endGame: true,
            });
            dispatch("RoomClick");
            }
            
        }
    }

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    let player_score = undefined;
    async function update_score(score) {
        try {
            const response = await fetch(`${serverUrl}/user/update/score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getCookie(CookieType.Token),
                },
                body: JSON.stringify({
                    login: getCookie(CookieType.Login),
                    newScore: player_score + score,
                }),
            });

            let status = response.status;
            console.log(response);

            const data = await response.json();

            if (status == 404 || status == 400) {
                console.log("errreur 404 couzin");
                throw new Error("Failed to fetch scores");
            }
            if (status == 201) {
                //good
            }
        } catch (error) {
            console.error("Updating score failed ->", error);
            console.log(error);
        }
    }

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
                throw new Error("Failed to fetch scores");
            }
            if (data.status == 200) {
                console.log("infos reucperees");
                player_score = data.userProfile.score;
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    // Player Stats
    // param: server_url, login du joueur
    // retour code d'erreur: pas de retour
    // retour: enum contenant trophées et pic id
    export async function getPlayerScore2() {
        try {
            const response = await fetch(
                `${serverUrl}/user/profile/` + player1_login,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //'Authorization': 'Bearer ' + getCookie(CookieType.Token)
                    },
                },
            );

            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data);

            if (status == 404) {
                /*console.log("errreur 404 couzin");
                throw new Error('Failed to fetch scores');*/
                player1_score = -1;
                player1_picId = -1;
            }
            if (data.status == 200) {
                player1_score = data.userProfile.score;
                player1_picId = data.userProfile.profilePicture;
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    export async function getPlayerScore3() {
        try {
            const response = await fetch(
                `${serverUrl}/user/profile/` + player2_login,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //'Authorization': 'Bearer ' + getCookie(CookieType.Token)
                    },
                },
            );

            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data);

            if (status == 404) {
                /*console.log("errreur 404 couzin");
            throw new Error('Failed to fetch scores');*/
                player2_score = -1;
                player2_picId = -1;
            }
            if (data.status == 200) {
                player2_score = data.userProfile.score;
                player2_picId = data.userProfile.profilePicture;
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    export async function getPlayerScore4() {
        try {
            const response = await fetch(
                `${serverUrl}/user/profile/` + player3_login,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //'Authorization': 'Bearer ' + getCookie(CookieType.Token)
                    },
                },
            );

            let status = response.status;
            console.log(response);

            const data = await response.json();
            console.log(data);

            if (status == 404) {
                /*console.log("errreur 404 couzin");
            throw new Error('Failed to fetch scores');*/
                player3_score = -1;
                player3_picId = -1;
            }
            if (data.status == 200) {
                player3_score = data.userProfile.score;
                player3_picId = data.userProfile.profilePicture;
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            console.log(error);
        }
    }

    async function print_msg() {
        if (IsPlayingAnimation === playerId && compteur === 1) {
            msg = document.getElementById("your_turn_msg");
            msg.style.display = "block";
            await delay(1000);
            msg.style.display = "none";
            compteur = -1;
        }
    }

    async function delete_print_color() {
        print_color.style.display = "none";
    }

    /*
    async function choix_couleur_msg() {
        //choix de la couleur quand on pose une carte couleur
        let depositCard = $room.data.algoGame.room._game._cardDeposit[0];
        choix_couleur = document.getElementById("choix_couleur")
        if(IsPlayingAnimation === 0 && depositCard["_number"] + "-" + depositCard["_color"] === "13-black" || depositCard["_number"] + "-" + depositCard["_color"] === "14-black") {
            choix_couleur.style.display = "block"
        }
        else {
            choix_couleur.style.display = "none"
        }
    }*/

    /**
     * SOCKET IO
     */

    updateCartePacket();

    /*let intervalId;

    onMount(() => {
        updateRoom();

        intervalId = setInterval(() => {
            console.log("update!!")
            updateCartePacket();
        }, 50);
    });*/

    /**
     * SOCKET IO - PACKET
     */

    function piocherCartePacket() {
        if ($room.data.algoGame.room._whosTurn === playerId)
            socketioNetwork.emit("sendActionData", {
                uuid: $room.data.uuid,
                drawCard: true,
            });
    }

    let mes_cartes;
    let mes_cartes2;
    let choix;

    let index_magique = undefined;

    function jouerCartePacket(index: number) {
        mes_cartes = document.getElementById("bottom-canvas");
        mes_cartes2 = mes_cartes.getElementsByClassName("card");

        choix = document.getElementById("bottom-select");
        //alert(mes_cartes2)
        //alert(mes_cartes2[index].style.backgroundImage)

        if (
            mes_cartes2[index].style.backgroundImage ===
                'url("assets/carte/carte-13-black.png")' ||
            mes_cartes2[index].style.backgroundImage ===
                'url("assets/carte/carte-14-black.png")'
        ) {
            //alert("joker")
            index_magique = index;

            mes_cartes.style.display = "none";
            choix.style.display = "flex";
        } else
            socketioNetwork.emit("sendActionData", {
                uuid: $room.data.uuid,
                playCard: index,
            });
    }

    function choisirCouleur(color: string) {
        mes_cartes = document.getElementById("bottom-canvas");
        choix = document.getElementById("bottom-select");

        choix.style.display = "none";
        mes_cartes.style.display = "flex";

        let index_magique2 = index_magique.toString();
        index_magique2 += "," + color;
        //alert(index_magique2)
        socketioNetwork.emit("sendActionData", {
            uuid: $room.data.uuid,
            chosenColor: index_magique2,
        });
    }

    function close_bottom_select() {
        mes_cartes = document.getElementById("bottom-canvas")
        choix = document.getElementById("bottom-select")
        choix.style.display = "none"
        mes_cartes.style.display = "flex"
    }

    function updateCartePacket() {
        socketioNetwork.emit("updateBoard");
    }

    function presserUnoPacket() {
        socketioNetwork.emit("presserUno");
    }

    /**
     * SOCKET IO - LISTENER
     */

    socketioNetwork.on("consoleUno", (message) => {
        console.log(message);
    });

    socketioNetwork.on("updatedBoardContent", (message, deposit) => {
        cartes = [];

        console.log(message);
        let json = JSON.parse(message);
        for (let i = 0; i < json.length; i++) {
            let card = json[i];
            addCard(card["_number"] + "-" + card["_color"]);
        }
        setDeposit(deposit["_number"] + "-" + deposit["_color"]);
    });

    /**
     * OLD
     */

    function handleCardClick(event) {
        event.target.style["grid-column"] = "3";
        event.target.style["grid-row"] = "3";
        console.log("click");
    }

    function leaveRoom() {
        has_quit = true;
        socketioNetwork.emit("leaveRoom", $room.data.uuid);
        dispatch("GoBackClick");
    }

    function updateSpin(param) {
        socketioNetwork.emit("sendActionData", {
            uuid: $room.data.uuid,
            testButton: param,
        });
    }

    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let msg_jeu_choisi = undefined;

    let jeu_en_cours = -1;

    async function tourner_la_roue() {
        let roue = document.getElementById("la_roue");
        let indicateur = document.getElementById("indicateur");
        let jeu_choisi = document.getElementById("jeu_choisi");
        let value = Math.ceil(Math.random() * 3600);

        let jeu = randomIntFromInterval(1, 6);
        //let jeu = randomIntFromInterval(2, 6);
        //let jeu = 1;
        if($room.data.algoGame.room._playersList[0]._login === getCookie(CookieType.Login)) {
            socketioNetwork.emit("sendActionData", { "uuid": $room.data.uuid, "wheelEffect" : jeu });

            if (jeu === 1)
                msg_jeu_choisi =
                    "Dépose des cartes jusqu'à ce qu'il n'en reste que 2 !";
            else if (jeu === 2)
                msg_jeu_choisi = "Débarrasse toi des cartes d'un nombre choisi";
            else if (jeu === 3)
                msg_jeu_choisi = "Débarrasse toi des cartes d'une couleur";
            else if (jeu === 4)
                msg_jeu_choisi = "Pioche jusqu'à avoir une carte rouge";
            else if (jeu === 5)
                msg_jeu_choisi = "Pioche jusqu'à avoir une carte bleu";
            else if (jeu === 6) msg_jeu_choisi = "Echange de mains";
        } else {
            getEffectNonGameMaster();
        }

        await delay(1000);

        roue.style.display = "block";
        indicateur.style.display = "block";

        await delay(100);

        roue.style.transform = "rotate(" + value + "deg)";
        value += Math.ceil(Math.random() * 3600);

        await delay(6000);

        jeu_choisi.style.display = "block";
        await delay(2000);
        jeu_choisi.style.display = "none";

        indicateur.style.display = "none";
        roue.style.display = "none";

        if (
            $room.data.algoGame.room._playersList[0]._login ===
            getCookie(CookieType.Login)
        ) {
            if ($room.data.algoGame.isRealToPlay === false) {
                await delay(1000);
                updateSpin(jeu.toString());
                console.log(
                    "***************************************************",
                );
                console.log($room.data.algoGame.isRealToPlay);
                console.log(
                    "***************************************************",
                );
            } else {
                if (
                    $room.data.algoGame._wheelEffect === 3 ||
                    $room.data.algoGame._wheelEffect === 4 ||
                    $room.data.algoGame._wheelEffect === 5
                ) {
                    await delay(1000);
                    updateSpin(jeu.toString());
                }
            }
        }

        if (IsPlayingAnimation === playerId) {
            /*************************************************/
            /**********JOUEUR REEL JEU 1, 2, ou 3*************/
            /*************************************************/
            if (
                $room.data.algoGame._wheelEffect === 0 ||
                $room.data.algoGame._wheelEffect === 1 ||
                $room.data.algoGame._wheelEffect === 2
            ) {
                if($room.data.algoGame._wheelEffect === 0 && $room.data.algoGame.room._playersList[playerId]._hand.length <= 2) {
                    socketioNetwork.emit("sendActionData", {
                        uuid: $room.data.uuid,
                        jeuParam: "0;[]",
                    });
                }
                else
                    jeu_en_cours = $room.data.algoGame._wheelEffect;
            }
        }
    }

    async function getEffectNonGameMaster() {
        await delay(3000);
        if ($room.data.algoGame._wheelEffect === 0)
            msg_jeu_choisi =
                "Dépose des cartes jusqu'à ce qu'il n'en reste que 2 !";
        else if ($room.data.algoGame._wheelEffect === 1)
            msg_jeu_choisi = "Débarrasse toi des cartes d'un nombre choisi";
        else if ($room.data.algoGame._wheelEffect === 2)
            msg_jeu_choisi = "Débarrasse toi des cartes d'une couleur";
        else if ($room.data.algoGame._wheelEffect === 3)
            msg_jeu_choisi = "Pioche jusqu'à avoir une carte rouge";
        else if ($room.data.algoGame._wheelEffect === 4)
            msg_jeu_choisi = "Pioche jusqu'à avoir une carte bleu";
        else if ($room.data.algoGame._wheelEffect === 5)
            msg_jeu_choisi = "Echange de mains";
    }

    function jeter_carte_reseau(param) {
        socketioNetwork.emit("sendActionData", {
            uuid: $room.data.uuid,
            jeuParam: param,
        });
        console.log("puuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuutttttttttttttte");
        console.log(param);
    }

    function jeter_carte(number) {
        jeu_en_cours = -1;
        let param = "1;";
        param += number;
        jeter_carte_reseau(param);
        console.log("yesssssssssssssssssssssssssssssssssssssssssssssssssss");
    }

    function jeter_couleur(color) {
        jeu_en_cours = -1;
        let param = "2;";
        param += color;
        socketioNetwork.emit("sendActionData", {
            uuid: $room.data.uuid,
            jeuParam: param,
        });
    }

    /*************** PRESQUE UN ******************/
    let selected_cards = 0;
    let selected_cards_array = [];

    function jeter_carte_discard2(index) {
        let hand = document.getElementById("bottom-canvas");
        let hand2 = hand.querySelectorAll<HTMLElement>(".card")[index];
        hand2.style.opacity = "1";

        if(!selected_cards_array.includes(index)) {
            selected_cards += 1;
            selected_cards_array.push(index);
        }

        if (
            selected_cards ===
            $room.data.algoGame.room._playersList[playerId]._hand.length - 2
        ) {
            jeu_en_cours = -1;
            selected_cards = 0;

            let param = "0;[";
            param += selected_cards_array.toString();
            param += "]";

            console.log("********************************************");
            console.log(param);
            console.log("********************************************");

            socketioNetwork.emit("sendActionData", {
                uuid: $room.data.uuid,
                jeuParam: param,
            });

            selected_cards_array = [];
        }
    }

    async function unoSaidReseau() {
        socketioNetwork.emit("sendActionData", {
            uuid: $room.data.uuid,
            sayUno: playerId.toString(),
        });
        await delay(200);
        print_button_uno = false;
        console.log("UNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNo");
        let un = document.getElementById("un");
        un.style.display = "block";
        await delay(1000);
        un.style.display = "none";
    }

    async function notUnoSaidReseau() {
        await delay(2000);
        if ($room.data.algoGame.room._playersList[playerId]._mustSayUno) {
            socketioNetwork.emit("sendActionData", {
                uuid: $room.data.uuid,
                unoNotSaid: playerId.toString(),
            });
            await delay(200);
            print_button_uno = false;

            let un = document.getElementById("contre-un");
            un.style.display = "block";
            await delay(1000);
            un.style.display = "none";

            console.log("DOITTTTTTTTTTTTTTTTTTTT DIRE UNOOOOOOOOOO");
            console.log(playerId);
        }
    }
</script>

<section>
    <div
        id="le_chat"
        style="position: absolute; width: 300px; height: 300px; width: 20%;
        height: 97%;
        /*border: 1px solid black;*/

        margin-left: 10px;
        margin-right: 10px;

        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #003366;
        font-family: 'Hanken Grotesk';
        background-color: #D9D9D9;
        border-radius: 5px;

        font-size: 1.2em;
        font-weight: bold;
        color: #164863;
        background-color: #9BBEC8;
        z-index: 2000000;
        left : 0;
        top: 0;
        display: none"
    >
        <TchatInGame />
    </div>

    <div id="game">
        <img
            src="assets/wheel_arrow2.png"
            style="position: absolute;"
            id="wheel_default"
            class="wheel"
        />
        <img
            src="assets/wheel_arrow2_rev.png"
            style="position: absolute; display: none;"
            id="wheel_default2"
            class="wheel_rev"
        />

        <!--<p class="wheel_rev" style="display: none;"></p>-->
        <!--<p id="choix_couleur" style="display: none; position: absolute">Choix de couleur en cours</p>
        -->
        <!--<p id="inexium" style="position: absolute">{login1} {login2}</p>-->

        {#if $room.data.isSpin}
            <div id="la_roue"></div>

            <!--<div style="position: relative; width: 100%;">-->
            <div id="indicateur"></div>
            <!--</div>-->

            <div id="jeu_choisi">
                {#if IsPlayingAnimation === playerId}
                    <p>Tu es tombé sur : {msg_jeu_choisi}</p>
                {:else}
                    <p>
                        {$room.data.algoGame.room._playersList[
                            IsPlayingAnimation
                        ]._login} est tombé sur : {msg_jeu_choisi}
                    </p>
                {/if}
            </div>
        {/if}

        <p id="un" class="un">'Un</p>
        <p id="contre-un" class="un">Tu n'as pas 'Un</p>

        <p id="your_turn_msg">A ton tour !</p>

        <p id="winner_msg">{winner_login} à gagné !</p>
        <!--
        <div class="card" on:click={handleCardClick}></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>-->

        {#if $room.data.isSpin && false}
            <button
                class="ALMOSTUN"
                on:click={() => updateSpin("1")}
                style="position: absolute; top: 0px; z-index: 200;"
                >SpinUn 1</button
            >
            <button
                class="DISCARDNUMBER"
                on:click={() => updateSpin("2")}
                style="position: absolute; top: 20px; z-index: 200;"
                >SpinUn 2</button
            >
            <button
                class="DISCARDCOLOR"
                on:click={() => updateSpin("3")}
                style="position: absolute; top: 40px; z-index: 200;"
                >SpinUn 3</button
            >
            <button
                class="DRAWRED"
                on:click={() => updateSpin("4")}
                style="position: absolute; top: 60px; z-index: 200;"
                >SpinUn 4</button
            >
            <button
                class="DRAWBLUE"
                on:click={() => updateSpin("5")}
                style="position: absolute; top: 80px; z-index: 200;"
                >SpinUn 5</button
            >
            <button
                class="TRADEHANDS"
                on:click={() => updateSpin("6")}
                style="position: absolute; top: 100px; z-index: 200;"
                >SpinUn 6</button
            >
            <button
                class="SHOWHAND"
                on:click={() => updateSpin("7")}
                style="position: absolute; top: 120px; z-index: 200;"
                >SpinUn 7</button
            >
            <button
                class="WAR"
                on:click={() => updateSpin("8")}
                style="position: absolute; top: 140px; z-index: 200;"
                >SpinUn 8</button
            >
            <button
                class="UNSPIN"
                on:click={() => updateSpin("9")}
                style="position: absolute; top: 160px; z-index: 200;"
                >SpinUn 9</button
            >
            <button
                class="test tourner roue"
                on:click={() => tourner_la_roue()}
                style="position: absolute; top: 180px; z-index: 200;"
                >SpinUn 10</button
            >
        {/if}

        <!--<button class="fezfze" on:click={() => choisirCouleur("blue")} style="position: absolute;">Choisir couleur bleueu</button>
        -->
        <!--<button class="fezfze" on:click={updateGame} style="position: absolute; top: 30px;">HEYYYYYYYYYYYYYY</button>

        -->

        <div id="top-canvas">
            <div id="top-canvas-container">
                {#each Array(player2_handsize) as _, index (index)}
                    <div class="card-top" on:click={handleCardClick}>
                        <!--
                        {#if index === player2_handsize -1}
                            <p>{player2_handsize} cartes</p>
                        {/if}
                        -->
                    </div>
                {/each}
                {#if IsPlayingAnimation === (playerId + 2) % 4}
                    <!--<p style="color: red;">Est en train de jouer</p>-->
                    <p class="other_player_play_msg">JOUE</p>
                {/if}
            </div>

            <!--<div class="player_info">
                <p>Tarkod</p>
                <p>2500 🏆</p>
            </div>-->
            <div id="separator"></div>
            <GamePlayerInfo
                bind:playerLogin={player2_login}
                bind:playerScore={player2_score}
                bind:playerPic={player2_picId}
            />
        </div>
        <div id="center-canvas">
            <div id="left-canvas">
                <article style="height: 100%;">
                    <!--
                    <div class="card-left" on:click={handleCardClick}>
                        <p>{player1_handsize} cartes</p>
                        {#if IsPlayingAnimation === (playerId + 1) % 4}
                            <p style="color: red;">Est en train de jouer</p>
                        {/if}
                    </div>
                    -->
                    <div id="left-canvas-container">
                        {#each Array(player1_handsize) as _, index (index)}
                            <div
                                class="card-left"
                                style="z-index: {100 - index};"
                                on:click={handleCardClick}
                            >
                                <!--
                            {#if index === player2_handsize -1}
                                <p>{player2_handsize} cartes</p>
                            {/if}
                            -->
                            </div>
                        {/each}
                        {#if IsPlayingAnimation === (playerId + 1) % 4}
                            <!--<p style="color: red;">Est en train de jouer</p>-->
                            <p class="other_player_play_msg">JOUE</p>
                        {/if}
                    </div>
                    <!--<div class="player_info">
                        <p>Tarkod</p>
                        <p>2500 🏆</p>
                    </div>-->
                    <GamePlayerInfo
                        bind:playerLogin={player1_login}
                        bind:playerScore={player1_score}
                        bind:playerPic={player1_picId}
                    />
                </article>
            </div>
            <div id="middle-canvas">
                <!--* SPIN *-->
                <!--
                <div id="spin-container">
                    <div id="spin-button"></div>
                    <div id="wheel">
                        <div class="wheel-section" style="--i:1; --clr:#229d39;"></div>
                        <div class="wheel-section" style="--i:2; --clr:#229d39;"></div>
                        <div class="wheel-section" style="--i:3; --clr:#229d39;"></div>
                        <div class="wheel-section" style="--i:4; --clr:#229d39;"></div>
                        <div class="wheel-section" style="--i:5; --clr:#229d39;"></div>
                        <div class="wheel-section" style="--i:6; --clr:#d7c624;"></div>
                        <div class="wheel-section" style="--i:7; --clr:#2000bf;"></div>
                        <div class="wheel-section" style="--i:8; --clr:#b12121;"></div>
                    </div>
                </div>-->
                <div
                    class="card card_deposit"
                    style="background-image: url({deposit['imagePath']});"
                >
                    <div style="position: relative; width: 100%;">
                        <p
                            id="print_color"
                            style="position: absolute; display: none;"
                        >
                            {color}
                        </p>
                    </div>
                </div>
                <div
                    class="card pioche"
                    style="background-image: url('assets/carte/pioche.png');"
                    on:click={() => piocherCartePacket()}
                ></div>
                <!--<button on:click={piocherCartePacket}>Piocher</button>-->
            </div>
            <div id="right-canvas">
                <article>
                    <!--
                    <div class="player_info">
                        <p>Tarkod</p>
                        <p>2500 🏆</p>
                    </div>-->
                    <GamePlayerInfo
                        bind:playerLogin={player3_login}
                        bind:playerScore={player3_score}
                        bind:playerPic={player3_picId}
                    />
                    <!--
                <div class="card-right" on:click={handleCardClick}>
                    <p>{player3_handsize} cartes</p>
                    {#if IsPlayingAnimation === (playerId + 3) % 4}
                    <p style="color: red;">Est en train de jouer</p>
                {/if}</div>
                -->
                    <div id="right-canvas-container">
                        {#each Array(player3_handsize) as _, index (index)}
                            <div
                                class="card-right"
                                style="z-index: {100 - index};"
                                on:click={handleCardClick}
                            >
                                <!--
                        {#if index === player2_handsize -1}
                            <p>{player2_handsize} cartes</p>
                        {/if}
                        -->
                            </div>
                        {/each}
                        {#if IsPlayingAnimation === (playerId + 3) % 4}
                            <!--<p style="color: red;">Est en train de jouer</p>-->
                            <p class="other_player_play_msg">JOUE</p>
                        {/if}
                    </div>
                </article>
            </div>
        </div>
        <div id="bottom-canvas">
            <!-- <div id="bottom-canvas-container">-->

            {#if jeu_en_cours != -1}
                <div id="canvas-asking">
                    <div id="canvas-asking-container">
                        {#if jeu_en_cours === 2}
                            <p>
                                Choissisez la couleur que vous souhaitez vous
                                débarrasser : </p>
                            <div
                                id="color_blue"
                                on:click={() => jeter_couleur("blue")}
                            ></div>
                            <div
                                id="color_red"
                                on:click={() => jeter_couleur("red")}
                            ></div>
                            <div
                                id="color_yellow"
                                on:click={() => jeter_couleur("yellow")}
                            ></div>
                            <div
                                id="color_green"
                                on:click={() => jeter_couleur("green")}
                            ></div>
                        {:else if jeu_en_cours === 1}
                            <p>
                                Choissisez la numéro que vous souhaitez vous
                                débarrasser :
                            </p>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("0")}
                            >
                                0
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("1")}
                            >
                                1
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("2")}
                            >
                                2
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("3")}
                            >
                                3
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("4")}
                            >
                                4
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("5")}
                            >
                                5
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("6")}
                            >
                                6
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("7")}
                            >
                                7
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("8")}
                            >
                                8
                            </div>
                            <div
                                id="number_throw"
                                on:click={() => jeter_carte("9")}
                            >
                                9
                            </div>
                        {:else if jeu_en_cours === 0}
                            <p>
                                Débarrassez vous de vos cartes jusqu'à n'en
                                avoir plus que deux
                            </p>
                        {/if}
                    </div>
                </div>
            {/if}

            {#if jeu_en_cours != -1 && jeu_en_cours === 0}
                {#each cartes as { name, imagePath }, index}
                    <div
                        class="card"
                        style="background-image: url({imagePath}); --i:{index}; opacity: 0.3;"
                        on:click={() => jeter_carte_discard2(index)}
                    ></div>
                {/each}
            {:else}
                {#each cartes as { name, imagePath }, index}
                    <div
                        class="card"
                        style="background-image: url({imagePath}); --i:{index};"
                        on:click={() => jouerCartePacket(index)}
                    ></div>
                {/each}
            {/if}
            <!-- </div>-->
        </div>

        <div id="bottom-select" style="display: none;">
            <button class="fezfze" id="bottom-select-close" on:click={() => close_bottom_select()}>Retour</button>
            <p>Choissisez la couleur :</p>
            <button class="fezfze" id="bottom-select-blue" on:click={() => choisirCouleur("blue")}>Bleu</button>
            <button class="fezfze" id="bottom-select-red" on:click={() => choisirCouleur("red")}>Rouge</button>
            <button class="fezfze" id="bottom-select-green" on:click={() => choisirCouleur("green")}>Vert</button>
            <button class="fezfze" id="bottom-select-yellow" on:click={() => choisirCouleur("yellow")}>Jaune</button>
        </div>

        {#if print_button_uno}
            <div id="boutton-spin-container">
                <div id="boutton-spin" on:click={() => unoSaidReseau()}>
                    <p>'Un</p>
                </div>
            </div>
        {/if}
    </div>

    <!--
    <article id="chat">
        <h1>Chat</h1>
    </article>-->

    <div id="scoreboard" style="display: none;">
        <p style="font-size: 1.3em;">🎉 {winner_login} à gagné ! 🎉</p>
        <p style="font-size: 1.3em;">+ 10 🏆</p>

        <div class="separator"></div>

        <p>Les perdants :</p>
        <p>{looser1} ( + 3 🏆 )</p>
        <p>{looser2} ( + 3 🏆 )</p>
        <p>{looser3} ( + 3 🏆 )</p>

        <div class="separator"></div>

        <div style="height: 15px;"></div>

        <div id="retour_room_ou_quit">
            <div>
                <p>
                    Retour dans la salle d'attente dans {compteur_avant_retour}
                </p>
            </div>
            <p>OU</p>
            <button
                on:click={() => leaveRoom()}
                class="button"
                style="background-color: #c94c4c; color: white; box-shadow: 0px 4px 0px #F18383;"
                ><span>Menu Principal </span></button
            >
        </div>
    </div>
</section>

<style>
    :global(canvas) {
        display: block;
        margin: auto;
    }

    #boutton-spin-container {
        position: absolute;
        width: 100%;
        height: 60px;

        /*border: 1px solid white;*/

        left: 0;
        right: 0;
        /*top: 0;*/
        bottom: 25%;
        margin-left: auto;
        margin-right: auto;
        margin: auto;

        /*border: 1px solid black;*/
        display: flex;
        justify-content: center;
    }

    #boutton-spin {
        height: 100%;
        width: 70px;
        border: 2px dashed black;

        z-index: 200000000000000000000000;

        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: bolder;

        /************************/
        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1.4em;
        background-color: #eea29a;
        border: none;
        box-shadow: 0 5px 0 #c94c4c;
        color: white;

        height: 80%;
        width: 150px;

        cursor: pointer;


        /*background: #822424;*/
        background: #D24545;
        box-shadow: 0px 4px 4px #000;
        border-radius: 5px;
    }

    #boutton-spin:hover {
        /*box-shadow: 0 2px 0 #c94c4c;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #canvas-asking {
        position: absolute;
        width: 100%;
        height: 0;

        /*border: 1px solid white;*/

        left: 0;
        right: 0;
        /*top: 0;*/
        bottom: 25%;
        margin-left: auto;
        margin-right: auto;
        margin: auto;
    }

    #canvas-asking #canvas-asking-container {
        position: absolute;

        /*height: 130px;*/
        height: 60px;
        width: 80%;

        z-index: 200000000000;

        left: 0;
        right: 0;
        /*top: 0;*/
        bottom: 0;
        margin-left: auto;
        margin-right: auto;
        margin: auto;

        /*border: 1px solid black;*/

        display: flex;

        justify-content: center;
        align-items: center;


        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: #164863;
        font-weight: 600;

        background-color: white;
        border-radius: 5px;

        color: white;
        background-color: #164863;
        /*border: 5px solid rgba(66, 125, 157, 1);*/
        border: 3px solid white;
    }

    #canvas-asking #canvas-asking-container #color_blue {
        width: 50px;
        height: 50px;
        background-color: #2000BF;
        border-radius: 5px;
        margin-right: 5px;
        margin-left: 5px;

        border: 2px solid white;
        cursor: pointer;
    }

    #canvas-asking #canvas-asking-container #color_red {
        width: 50px;
        height: 50px;
        background-color: #B12121;
        border-radius: 5px;
        margin-right: 5px;

        border: 2px solid white;
        cursor: pointer;
    }

    #canvas-asking #canvas-asking-container #color_yellow {
        width: 50px;
        height: 50px;
        background-color: #D6D123;
        border-radius: 5px;
        margin-right: 5px;

        border: 2px solid white;
        cursor: pointer;
    }

    #canvas-asking #canvas-asking-container #color_green {
        width: 50px;
        height: 50px;
        background-color: #229D39;
        border-radius: 5px;
        margin-right: 5px;

        border: 2px solid white;
        cursor: pointer;
    }

    #canvas-asking #canvas-asking-container #number_throw {
        width: 50px;
        height: 50px;
        border: 2px solid white;

        cursor: pointer;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    #retour_room_ou_quit {
        display: flex;
        justify-content: space-around;
    }

    #retour_room_ou_quit div {
        border: 2px dashed white;
        padding-left: 10px;
        padding-right: 10px;
    }

    #la_roue {
        display: none;

        position: absolute;
        height: 70vh;
        width: 70vh;

        background: url("assets/roueVide.png");
        background-size: contain;
        background-repeat: no-repeat;

        z-index: 20000000000000000000;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /*margin-left: auto; 
        margin-right: auto; */
        margin: auto;

        transition: transform 5s ease-in-out;
    }

    #indicateur {
        display: none;

        position: absolute;
        height: 100px;
        width: 100px;

        background: url("assets/arrow_up.png");
        background-size: contain;
        background-repeat: no-repeat;

        z-index: 200000000000000000000;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin-left: auto;
        margin-right: auto;
        margin: auto;
    }

    #jeu_choisi {
        display: none;

        position: absolute;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        z-index: 20000000000000000000;

        width: 35vw;
        height: 25vh;

        background-color: rgba(66, 125, 157, 0.9);

        border: 3px solid white;
        border-radius: 15px;
    }

    #jeu_choisi p {
        text-align: center;

        font-family: "Hanken Grotesk";
        font-weight: bolder;
        color: #fff;
        font-size: 5vh;
    }

    /*************************************/
    /* button du scoreoard */
    .button {
        display: inline-block;
        /*border-radius: 4px;*/

        background: #073579;
        box-shadow: 0px 4px 0px #fff;
        border-radius: 5px;
        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #164863;
        text-align: center;
        font-size: 20px; /** 28*/
        padding: 20px;
        /*default with : 200px*/
        width: 250px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px 10px;

        height: 80px;

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
        content: "\00bb";
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
    /*************************/

    #scoreboard {
        background-color: #073579;
        color: white;
        font-weight: bolder;
        font-size: 1.5em;
        font-family: "Hanken Grotesk";

        height: 90%;
        width: 60%;
        background-color: #164863;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: flex-start;
        text-align: center;

        /*align-self: center;
        justify-self: center;*/
        margin-top: auto;
        margin-bottom: auto;
    }

    #scoreboard .separator {
        width: 100%;
        height: 3px;

        background-color: #427d9d;
    }

    #your_turn_msg {
        position: absolute;
        color: red;
        font-weight: bolder;
        font-size: 8.5em;
        font-family: "Hanken Grotesk";
        opacity: 0.7;
        z-index: 1000;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 1000px; /* Need a specific value to work */

        text-align: center;

        display: none;

        pointer-events: none;
    }

    .un {
        position: absolute;
        color: red;
        font-weight: bolder;
        font-size: 8.5em;
        font-family: "Hanken Grotesk";
        opacity: 0.7;
        z-index: 1000;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 1000px; /* Need a specific value to work */

        text-align: center;

        display: none;

        pointer-events: none;
    }

    #winner_msg {
        position: absolute;
        color: red;
        font-weight: bolder;
        font-size: 8.5em;
        font-family: "Hanken Grotesk";
        opacity: 0.7;
        z-index: 1000;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 1000px; /* Need a specific value to work */

        text-align: center;

        display: none;

        pointer-events: none;
        color: #073579;
    }

    .other_player_play_msg {
        position: absolute;
        /*color: #ffef96;*/
        color: white;
        font-weight: bolder;
        font-size: 3.5em;
        font-family: "Hanken Grotesk";

        /*opacity: 0.7;*/
        opacity: 1;

        z-index: 1000;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 170px; /* Need a specific value to work */

        text-align: center;

        /*display: none;*/

        pointer-events: none;
    }

    #print_color {
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 100px;

        color: black;
        font-weight: bolder;
        font-size: 1.5em;
        font-family: "Hanken Grotesk";

        text-align: center;
    }

    .wheel {
        animation: rotate 7s linear infinite;
        /*filter: drop-shadow(10px 7px 10px dimgray);*/
        opacity: 0.5;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 200px;
        height: 200px;
        z-index: -2;
    }

    .wheel_rev {
        animation: rotate_opp 7s linear infinite;
        opacity: 0.5;

        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 200px;
        height: 200px;
        z-index: -2;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes rotate_opp {
        0% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    /**************************************/
    /** SPIN **/

    #spin-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 300px;
        height: 300px;

        transform: rotateX(35deg);
    }

    #spin-container #spin-button {
        position: absolute;
        width: 50px;
        height: 50px;
        /*background: #c15c5c;*/
        background: white;
        border-radius: 50%;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;

        border: 2px solid black;
        box-shadow: 1px 2px 0 0 black;
        cursor: pointer;
    }

    /*
    #spin-container #spin-button::before {
        content: '';
        position: absolute;

    }
    */

    #spin-container #wheel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        border-radius: 50%;

        border: 2px solid black;
        box-shadow: 1px 5px 0 0px black;
        overflow: hidden;
    }

    #spin-container #wheel .wheel-section {
        position: absolute;
        width: 50%;
        height: 50%;
        background: var(--clr);
        transform-origin: bottom right;
        transform: rotate(calc(90deg * var(--i)));
        /*clip-path: polygon(0 0, 50% 0, 100% 100%, 0 60%);*/
    }

    /**************************************/

    .player_info {
        background-color: #073579;
        border-radius: 30px;
        text-align: center;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: white;
    }

    #top-canvas .player_info {
        margin-left: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    #top-canvas .card {
        background-image: none;
        background-color: gray;
        background-image: url("assets/logo2.png");

        background-position: center;
    }

    #top-canvas #separator {
        margin: 20px;
    }

    #left-canvas {
        padding-left: 30px;
    }

    #left-canvas .card {
        background-color: #073579;
        border-radius: 30px;
        text-align: center;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: white;

        display: flex;
        flex-direction: column;
    }

    #left-canvas .card p {
        margin-top: 30%;
        align-content: center;
    }

    #left-canvas .card {
        background-image: none;
        background-color: gray;
        background-image: url("assets/logo2.png");

        background-position: center;

        /*rotate: 90deg;*/
        transform: rotateZ(90deg);
    }

    #right-canvas .card {
        background-image: none;
        background-color: gray;
        background-image: url("assets/logo2.png");

        background-position: center;

        transform: rotateZ(-90deg);
    }

    #top-canvas {
        width: 100%;
        /*border: 1px solid black;*/
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #top-canvas-container {
        width: 25%;
        /*border: 1px solid black;*/
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    #center-canvas {
        width: 100%;
        /*border: 1px solid black;*/
        height: 50%;

        display: flex;
    }

    #bottom-canvas {
        width: 100%;
        /*border: 1px solid black;*/
        height: 25%;

        /*position: relative;*/

        display: flex;
        justify-content: center;
        align-items: center;
    }

    #bottom-canvas-container {
        position: relative;

        border: 1px solid black;
        height: 130%;
        width: 35%;
    }

    #bottom-select {
        width: 100%;
        /*border: 1px solid black;*/
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        color: #164863;
        font-weight: 600;

        /*display: flex;
        justify-content: center;*/
    }

    #bottom-select button {
        border: 2px solid white;
        /*border-radius: 5px;*/
        color : white;

        font-family: "Hanken Grotesk";
        font-size: 0.9em;

        margin-left: 5px;
        margin-right: 5px;

        width: 100px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    #bottom-select button:hover {
        cursor: pointer;
    }

    #bottom-select #bottom-select-blue {
        background-color: #2000BF;
    }

    #bottom-select #bottom-select-red {
        background-color: #B12121;
    }

    #bottom-select #bottom-select-green {
        background-color: #229D39;
    }

    #bottom-select #bottom-select-yellow {
        background-color: #D6D123;
        /*color: #164863;*/
        color: white;
        /*border: 2px solid #164863;*/
        border: 2px solid white;
    }

    #bottom-select #bottom-select-close {
        color: #164863;
        border: 2px solid #164863;
    }

    @keyframes hover-card {
        from {
            transform: translateY(0px) translateX(0px) rotateX(50deg)
                rotate(0deg);
        }
        to {
            transform: translateY(-10px) translateX(-30px) rotateX(50deg)
                rotate(-15deg);
        }
    }

    @keyframes hover-card-opposite {
        from {
            transform: translateY(-10px) translateX(-30px) rotateX(50deg)
                rotate(-15deg);
        }
        to {
            transform: translateY(0px) translateX(0px) rotateX(50deg)
                rotate(0deg);
        }
    }

    #bottom-canvas .card {
        margin-left: -20px;
        margin-right: -20px;

        /*position: absolute;*/
        left: calc(var(--i) * 5em);

        /*top: 50%;*/
        /*left: 50%;*/
        /*transform: translateX(calc(-50%)) rotateX(50deg);*/

        animation-name: hover-card-opposite;
        animation-duration: 0.1s;

        box-shadow:
            0 1px 3px rgba(0, 0, 0, 1),
            0 1px 2px rgba(0, 0, 0, 1);
        box-shadow:
            0px 3px 0 0px black,
            -1px 3px 0px rgba(0, 0, 0, 1);
    }

    #bottom-canvas .card:hover {
        /*transform-origin: left bottom*/
        animation-name: hover-card;
        animation-duration: 0.1s;
        transform: translateY(-10px) translateX(-30px) rotateX(50deg)
            rotate(-15deg);
        /*transform: translateY(-50px) rotateX(50deg) rotate3d(-15deg);*/
        /*right: 3em;*/
    }

    @keyframes ecarte-card {
        from {
            transform: translateX(0px) rotateX(50deg);
        }
        to {
            transform: translateX(30px) rotateX(50deg);
        }
    }

    #bottom-canvas .card:hover ~ .card {
        /*animation-name: ecarte-card;
        animation-duration: 0.1s;*/
        transform: translateX(30px) rotateX(50deg);
    }

    #left-canvas {
        width: 25%;
        height: 100%;
        /*border: 1px solid black;*/
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #left-canvas-container {
        width: 100%;
        height: 75%;
        /*border: 1px solid black;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    #middle-canvas {
        width: 50%;
        height: 100%;
        /*border: 1px solid black;*/
        display: flex;
        justify-content: center;
        align-items: center;

        /*background-color: #073579;*/
        /*border-radius: 60px;*/
        /*border-radius: 40%;*/
        /*box-shadow: 0px 4px 0px black;*/

        /*transform: rotateZ(0deg)*/
        /*transform: rotateX(10deg);*/
        /*
        background-image: url("/src/assets/logo2.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;*/
    }

    #middle-canvas .card {
        margin: 0px;
    }

    #middle-canvas .card:nth-child(1) {
        margin-right: 10%;
    }

    #middle-canvas .card:nth-child(2) {
        margin-left: 10%;
    }

    #right-canvas {
        width: 25%;
        height: 100%;
        /*border: 1px solid black;*/
        display: flex;
        justify-content: flex-end;
        align-items: center;

        padding-right: 30px;
    }

    #right-canvas-container {
        width: 100%;
        height: 75%;
        /*border: 1px solid black;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: relative;
    }

    #right-canvas article {
        height: 100%;
    }

    @keyframes rotate-card {
        from {
            transform: rotateX(50deg);
            perspective: 20em;
        }
        to {
            transform: rotateX(0deg);
            perspective: -20em;
        }
    }

    @keyframes rotate-card-opposite {
        from {
            transform: rotateX(0deg);
        }
        to {
            transform: rotateX(50deg);
        }
    }

    @keyframes hover_anim_opp {
        from {
            transform: rotateX(50deg) translateY(-30px);
        }
        to {
            transform: rotateX(50deg) translateY(0px);
        }
    }

    .card {
        background: url("assets/carte/carte-0-rouge.png");
        width: 141px;
        height: 199px;
        background-size: contain;
        background-repeat: no-repeat;
        /*box-shadow: 2px 2px 2px black;*/

        /*border: 1px solid white;*/
        box-shadow: 0px 3px 0 0px white;

        border-radius: 20px;

        transform: rotateX(50deg); /* translateY(0);*/

        animation-name: hover_anim_opp;
        animation-duration: 0.2s;

        /*transform: rotateX(50deg) translateY(0px);*/
    }

    @keyframes hover_anim {
        from {
            transform: rotateX(50deg) translateY(0px);
        }
        to {
            transform: rotateX(50deg) translateY(-30px);
        }
    }
    .card:hover {
        /*transform: translateY(-10px);*/
        /*transform: rotateX(0deg);*/
        /*box-shadow: 5px 5px 5px black;*/

        /*position: relative;*/
        /*perspective: 0;*/
        /*transform: rotateX(50deg);*/
        transform: rotateX(50deg) translateY(-30px);
        /*transform: perspective(0);
        perspective: initial;*/
        /*transform: rotateX(0);*/
        /*transform: rotate3d(30deg);
        transform-style: initial;*/
        /*transform: perspective(0);
        transform: rotate3d(1, 0, 0, 40deg);*/

        animation-name: hover_anim;
        animation-duration: 0.2s;

        cursor: pointer;
    }

    .card:nth-child(1) {
        background: url("assets/carte/carte-plus-4-4-couleur.png");
        background-size: contain;
        background-repeat: no-repeat;

        grid-column: 3;
        grid-row: 1;
    }

    .card:nth-child(2) {
        background: url("assets/carte/carte-9-jaune.png");
        background-size: contain;
        background-repeat: no-repeat;

        grid-column: 1;
        grid-row: 3;
    }

    .card:nth-child(3) {
        grid-column: 4;
        grid-row: 3;
    }

    .card:nth-child(4) {
        grid-column: 5;
        grid-row: 3;
    }

    #bottom-canvas .card:nth-child(4) {
        background: url("assets/carte/carte-9-jaune.png");
        background-size: contain;
        background-repeat: no-repeat;
    }

    #left-canvas .card {
        box-shadow: 3px -1px 0px 0 white;
    }

    #right-canvas .card {
        box-shadow: -1px 3px 0px 0 white;
    }

    section {
        width: 100%;
        height: 75vh;
        /*margin: auto;*/

        display: flex;
        flex-direction: row;
        justify-content: center;
        /*align-items: center;*/

        position: relative;
        perspective: 20em;
    }

    #game {
        /*padding: 30px;*/
        /*padding: 1%;*/

        border: 3px solid black;

        /*border-radius: 80px;*/

        width: 80%;
        height: 100%;
        /*background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(45, 139,226,1) 50%);*/
        background: url("assets/wood.png");
        background-repeat: repeat;

        /*display: grid;

        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: minmax(199px, auto);*/

        /*margin: 80px;*/
        transform: rotateX(10deg);
        position: absolute;
        /*transform-style: preserve-3d;*/

        /*transform: rotate3d(10deg);*/
        /*transform: translate(-50%, -50%) rotate(10deg);
        transform-origin: center center;*/

        box-shadow: 0 4px 0 0 burlywood;
    }

    #players {
        width: 95%;
        height: 95%;
        border: 1px solid black;
    }

    /*
    article {
        margin: 1%;
    }
    */

    #chat {
        /*
        width: 20%;
        height: 97%;
        /*border: 1px solid black;

        margin-left: 10px;
        margin-right: 10px;

        display: flex;
        justify-content: space-around;
        font-size: 1.2em;
        font-weight: bold;
        color: #003366;
        font-family: "Hanken Grotesk";
        background-color: #D9D9D9;
        /*margin-top: 10px;
        border-radius: 30px;
        */

        width: 20%;
        /*background-color: aliceblue;*/
        background-color: white;
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        font-weight: bold;

        text-align: center;
        color: black;
    }

    .card-left {
        background: url("assets/carte/carte-0-rouge.png");
        width: 209px;
        height: 171px;
        background-size: contain;
        background-repeat: no-repeat;
        /*box-shadow: 2px 2px 2px black;*/

        /*border: 1px solid white;*/
        box-shadow: 0px 3px 0 0px white;

        border-radius: 20px;

        transform: rotateX(50deg); /* translateY(0);*/

        animation-name: hover_anim_opp;
        animation-duration: 0.2s;

        /*transform: rotateX(50deg) translateY(0px);*/
        background-image: none;
        background-color: gray;
        background-image: url("assets/carte/dosCarteDroite.png");

        background-position: center;
        box-shadow: 1px 3px 0px 0 white; /*,  1px -3px 0 0 white;*/

        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        text-align: center;

        margin-top: -80px;
        margin-bottom: -80px;
    }

    .card-top {
        background: url("assets/carte/dosCarteHaut.png");
        width: 141px;
        height: 199px;
        background-size: contain;
        background-repeat: no-repeat;
        /*box-shadow: 2px 2px 2px black;*/

        /*border: 1px solid white;*/
        box-shadow: 0px 3px 0 0px white;
        box-shadow:
            0px 3px 0 0px white,
            -1px 3px 0px white;

        border-radius: 20px;

        transform: rotateX(50deg); /* translateY(0);*/

        animation-name: hover_anim_opp;
        animation-duration: 0.2s;

        /*transform: rotateX(50deg) translateY(0px);*/
        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        text-align: center;

        margin-left: -60px;
        margin-right: -60px;
    }

    .card-right {
        background: url("assets/carte/carte-0-rouge.png");
        width: 209px;
        height: 171px;
        background-size: contain;
        background-repeat: no-repeat;
        /*box-shadow: 2px 2px 2px black;*/

        /*border: 1px solid white;*/
        box-shadow: 0px 3px 0 0px white;

        border-radius: 20px;

        transform: rotateX(50deg); /* translateY(0);*/

        animation-name: hover_anim_opp;
        animation-duration: 0.2s;

        /*transform: rotateX(50deg) translateY(0px);*/
        background-image: none;
        background-color: gray;
        background-image: url("assets/carte/dosCarteGauche.png");

        background-position: center;
        box-shadow: -1px 3px 0px 0 white;

        font-family: "Hanken Grotesk";
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        text-align: center;

        margin-top: -80px;
        margin-bottom: -80px;
    }

    .card_deposit:hover {
        transform: rotateX(50deg) translateY(0px);

        animation-name: none;
        animation-duration: 0;

        cursor: auto;
    }

    .card_deposit {
        animation-name: none;
        animation-duration: 0;
    }

    @keyframes hover_anim_pioche {
        from {
            transform: rotateX(50deg) translateY(0px);
        }
        to {
            transform: rotateX(50deg) translateY(30px);
        }
    }

    @keyframes hover_anim_opp_pioche {
        from {
            transform: rotateX(50deg) translateY(30px);
        }
        to {
            transform: rotateX(50deg) translateY(0px);
        }
    }

    .pioche {
        animation-name: hover_anim_opp_pioche;
        animation-duration: 0.2s;
    }

    .pioche:hover {
        transform: rotateX(50deg) translateY(30px);

        animation-name: hover_anim_pioche;
        animation-duration: 0.2s;

        cursor: pointer;
    }
</style>

