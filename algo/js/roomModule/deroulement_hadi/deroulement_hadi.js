"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Importe des fichiers utils */
const room_1 = __importDefault(require("../room"));
const fonctions_affichages_1 = require("./fonctions_affichages");
const verification_instance_1 = require("./verification_instance");
/* Fonction main, là où tout se déroule */
function main() {
    let room = new room_1.default(0, 10, 4);
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
            room.whosTurn %= room.playersList.length;
            /* Afficher des informations */
            console.log("Before play :");
            (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[room.whosTurn]);
            /* Vérification de l'instance d'un joueur */
            (0, verification_instance_1.verificationInstancePlayer)(room);
            /* Afficher des informations */
            console.log("After play :");
            (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[room.whosTurn]);
            /* Au joueur suivant */
            room.whosTurn++;
            console.log("######################################");
        }
        /* Incrémenter le nombre du round */
        round++;
        /* Fin du round */
        room.game.endRound();
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
