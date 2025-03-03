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
const ia_1 = __importDefault(require("../playerModule/ia"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const readlineSync = __importStar(require("readline-sync"));
const real_1 = __importDefault(require("../playerModule/real"));
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
function verificationInstancePlayer(room, turnPlayer) {
    /* Si le joueur est une instance d'IA */
    if (room.playersList[turnPlayer] instanceof ia_1.default) {
        /* Si aucune carte n'est jouable alors priocher */
        if (!room.playersList[turnPlayer].playableRandomCard(room.game.cardDeposit)) {
            room.playersList[turnPlayer].drawCard(room.game.drawStack);
            room.game.remakeDrawStackIfNoCardIn();
        }
    }
    else if (room.playersList[turnPlayer] instanceof real_1.default) {
        // Si le joueur est une instance de Real
        const player = room.playersList[turnPlayer];
        console.log("Card on top of the deposit: ");
        printCardArray([room.game.cardDeposit[0]]);
        console.log("Your hand:");
        printCardArray(player.hand);
        while (true /*timer ici */) {
            let chosenAction = readlineSync.question("Choose an action " + player.login + " (play or draw): ");
            if (chosenAction.toLowerCase() === "play") {
                let chosenCardIndex;
                let validPlay;
                chosenCardIndex = readlineSync.questionInt("Choose a card to play (enter the index): ");
                if (chosenCardIndex >= 0 && chosenCardIndex <= player.hand.length - 1) {
                    const chosenCard = player.hand[chosenCardIndex];
                    validPlay = player.playCard(chosenCard, room.game.cardDeposit).succes;
                    if (!validPlay) {
                        console.log("Cannot play this card. Please choose another one.");
                    }
                    else {
                        break;
                    }
                }
                else {
                    console.log("Invalid index. Please choose a valid index.");
                    validPlay = false; // Réinitialiser la validité du jeu pour sortir de la boucle
                }
            }
            else if (chosenAction.toLowerCase() === "draw") {
                player.drawCard(room.game.drawStack);
                room.game.remakeDrawStackIfNoCardIn();
                break; // Sortie de la boucle externe si le joueur a choisi de piocher
            }
            else {
                console.log("Invalid action. Please choose either 'play' or 'draw'.");
            }
        }
    }
}
function main() {
    let room = new room_1.default(0, 10, 4);
    room.playersList[0] = new real_1.default("e");
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
