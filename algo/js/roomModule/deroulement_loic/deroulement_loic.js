"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Importe des fichiers utils */
const room_1 = __importDefault(require("../room"));
const real_1 = __importDefault(require("../../playerModule/real"));
const effets_cartes_1 = require("./effets_cartes");
const fonctions_affichages_1 = require("./fonctions_affichages");
const verification_instance_1 = require("./verification_instance");
/* Fonction main, là où tout se déroule */
function main() {
    let room = new room_1.default(0, 10, 4);
    room.playersList[0] = new real_1.default("Jordie");
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
            (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[turnPlayer]);
            /* Vérification de l'instance d'un joueur et actions associées */
            (0, verification_instance_1.verificationInstancePlayer)(room, turnPlayer);
            /*Remplissage de la pioche si elle est vide*/
            room.game.remakeDrawStackIfNoCardIn();
            /*Effet pour le joueur suivant si l'effet est a donner*/
            (0, effets_cartes_1.checkEffect)(room);
            /* Afficher des informations */
            console.log("After play :");
            (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[turnPlayer]);
            /* Au joueur suivant */
            turnPlayer += room.game.direction;
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
