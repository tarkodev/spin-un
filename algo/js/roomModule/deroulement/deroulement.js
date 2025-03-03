"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_main = exports.main = exports.deroulement_tour = exports.changeTurnPlayer = void 0;
//import NumerotedCard from "../numerotedCard";
const room_1 = __importDefault(require("../room"));
const fonctions_affichages_1 = require("./fonctions_affichages");
const verification_instance_1 = require("./verification_instance");
function changeTurnPlayer(room) {
    room.whosTurn += room.game.direction;
    room.whosTurn = ((room.whosTurn % room.playersList.length) + room.playersList.length) % room.playersList.length;
}
exports.changeTurnPlayer = changeTurnPlayer;
function deroulement_tour(room) {
    /* Afficher des informations */
    console.log("Before play :");
    (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[room.whosTurn]);
    /* Vérification de l'instance d'un joueur */
    (0, verification_instance_1.verificationInstancePlayer)(room);
    /* Afficher des informations */
    console.log("After play :");
    (0, fonctions_affichages_1.printInfo)(room.game.cardDeposit, room.playersList[room.whosTurn]);
    room.checkEffectOfTopOfDeposit();
    /* Au joueur suivant */
    changeTurnPlayer(room);
    console.log("######################################");
}
exports.deroulement_tour = deroulement_tour;
/* Fonction main, là où tout se déroule */
function main() {
    let room = new room_1.default(0, 10, 4);
    room.gameStart();
    /* Tant qu'il n'y a pas de gagnant la partie continue */
    while (!room.isEnd()) {
        /* Tant que le round n'est pas terminé */
        console.log("#####################################################################################################");
        console.log("round: ", room.numberRound);
        console.log("#####################################################################################################");
        while (!room.game.isEndRound()) {
            deroulement_tour(room);
        }
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
exports.main = main;
main();
function new_main() {
    let room = new room_1.default(0, 10, 4);
    room.gameStart();
    while (1) {
        /* Vérification de l'instance d'un joueur et le joueur joue */
        (0, verification_instance_1.verificationInstancePlayer)(room);
        room.checkEffectOfTopOfDeposit();
        /* Au joueur suivant */
        changeTurnPlayer(room);
        if (room.game.isEndRound()) {
            room.game.endRound();
            room.nextRound();
            if (room.isEnd()) {
                for (let p of room.playersList) {
                    if (p.points > room.pointsNumber) {
                        return p;
                    }
                }
            }
        }
    }
    return room.playersList[0];
}
exports.new_main = new_main;
