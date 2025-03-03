"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("./room"));
const ia_hadi_1 = __importDefault(require("../playerModule/Hadi/ia_hadi"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const game_1 = __importDefault(require("../gameModule/game"));
const readlineSync = __importStar(require("readline-sync"));
const console_1 = require("console");
const real_hadi_1 = __importDefault(require("../playerModule/Hadi/real_hadi"));
/* Fonction pour obtenir le code ANSI de couleur en fonction du nom de la couleur */
function colorCode(color) {
    switch (color.toLowerCase()) {
        case "green":
            return "\x1b[32m"; // Vert
        case "red":
            return "\x1b[31m"; // Rouge
        case "blue":
            return "\x1b[34m"; // Bleu
        case "yellow":
            return "\x1b[33m"; // Jaune
        default:
            return "\x1b[0m"; // Par défaut, réinitialisation des styles
    }
}
/* Affiche d'un tableau de cartes */
function printCardArray(cardArray) {
    const reset = "\x1b[0m";
    let count = 0;
    console.log("Number of cards :", cardArray.length);
    for (const card of cardArray) {
        if (card instanceof numerotedCard_1.default) {
            const color = colorCode(card.color);
            console.log(`${count} ${color}${card.color}, ${card.number}${reset}`);
            count++;
        }
    }
    console.log();
}
function printInfo(cardDeposit, player) {
    console.log("card deposit :");
    printCardArray(cardDeposit);
    console.log(player.login, "hand: ");
    printCardArray(player.hand);
}
function swapDrawStackAndCardDeposit(drawStack, cardDeposit) {
    (0, console_1.assert)(cardDeposit.length !== 0);
    let cardOnTopOfCardDeposit = cardDeposit.shift();
    while (cardDeposit.length > 0) {
        drawStack.unshift(cardDeposit.shift());
    }
    cardDeposit.unshift(cardOnTopOfCardDeposit);
}
function verificationInstancePlayer(room, turnPlayer) {
    /* Si le joueur est une instance d'IA */
    if (room.playersList[turnPlayer] instanceof ia_hadi_1.default) {
        /* Si aucune carte n'est jouable alors priocher */
        if (!room.playersList[turnPlayer].playableRandomCard(room.game.cardDeposit)) {
            /* Tester si la pioche est vide, si oui alors on prend toutes les cartes de cardDeposità l'exception de celle du haut et on mélange de nouveau */
            if (room.game.drawStack.length === 0) {
                /* Tant que cardDeposit contient plus d'un élément alors on lui retire des cartes */
                swapDrawStackAndCardDeposit(room.game.drawStack, room.game.cardDeposit);
                /* Mélange de la pioche */
                game_1.default.shuffle(room.game.drawStack);
            }
            room.playersList[turnPlayer].drawCard(room.game.drawStack);
        }
    }
    else if (room.playersList[turnPlayer] instanceof real_hadi_1.default) {
        // Si le joueur est une instance de Real
        let indexCard = 0;
        let untilChoiceIsWrong = true;
        while (untilChoiceIsWrong) {
            let userInputChoice = readlineSync
                .question("Vous voulez vous jouer ou piocher [j/p]? ")
                .toLowerCase();
            switch (userInputChoice) {
                case "j":
                    let countAction = 0;
                    let returnOfAction = false;
                    /* Laisser le joueur décider de la carte qu'il veut joueur, au bout de 5 échecs le faire piocher et quitter la boucle */
                    do {
                        if (countAction !== 0) {
                            console.log("Mauvaise carte ! Retentez votre chance.");
                        }
                        do {
                            /* Demander à l'utilisateur la carte à jouer */
                            let inputCardInput = readlineSync.question("Quelle carte voulez vous jouer ?");
                            /* Récupérer la réponse et la convertir en entier */
                            indexCard = parseInt(inputCardInput);
                            /* Vérification */
                            (0, console_1.assert)(!isNaN(indexCard));
                        } while (indexCard < 0 ||
                            indexCard >= room.playersList[turnPlayer].hand.length); // Tant que l'index n'est pas compris dans la longueur de la main
                        returnOfAction = room.playersList[turnPlayer].playCard(room.playersList[turnPlayer].hand[indexCard], room.game.cardDeposit);
                        countAction++;
                    } while (returnOfAction === false && countAction < 5);
                    if (countAction === 5) {
                        if (room.game.drawStack.length === 0) {
                            swapDrawStackAndCardDeposit(room.game.drawStack, room.game.cardDeposit);
                        }
                        room.playersList[turnPlayer].drawCard(room.game.drawStack);
                    }
                    untilChoiceIsWrong = false;
                    break;
                case "p":
                    /* Si le joueur décide de piocher directement */
                    if (room.game.drawStack.length === 0) {
                        swapDrawStackAndCardDeposit(room.game.drawStack, room.game.cardDeposit);
                    }
                    room.playersList[turnPlayer].drawCard(room.game.drawStack);
                    untilChoiceIsWrong = false;
                    break;
                default:
                    console.log("Veuillez saisir une réponse valide.");
                    break;
            }
        }
    }
}
function main() {
    let room = new room_1.default(0, 10, 4);
    let turnPlayer = 0;
    let round = 1;
    room.gameStart();
    /* Tant qu'il n'y a pas de gagnant la partie continue */
    while (!room.isEnd()) {
        /* Tant que le round n'est pas terminé */
        console.log("#####################################################################################################");
        console.log("round: ", round);
        console.log("#####################################################################################################");
        while (!room.game.isEndRound()) {
            /* Récupérer le tour d'un joueur */
            turnPlayer %= room.playersList.length;
            /* Afficher des informations */
            console.log("Before play :");
            printInfo(room.game.cardDeposit, room.playersList[turnPlayer]);
            /* Vérification de l'instance d'un joueur et actions associées */
            verificationInstancePlayer(room, turnPlayer);
            /* Afficher des informations */
            console.log("After play :");
            printInfo(room.game.cardDeposit, room.playersList[turnPlayer]);
            /* Au joueur suivant */
            turnPlayer++;
            console.log("######################################");
        }
        /* Incrémenter le nombre du round */
        round++;
        /* Fin du round */
        room.game.endRound();
        for (let player of room.playersList) {
            player.hand.splice(0, player.hand.length);
        }
        room.nextRound();
    }
    console.log("Fin de partie");
    for (const player of room.game.players) {
        if (player.isWinner) {
            console.log("Gagnant : " + player.login + " avec " + player.points);
        }
        else {
            console.log("Perdant : " + player.login + " avec " + player.points);
        }
    }
}
main();
