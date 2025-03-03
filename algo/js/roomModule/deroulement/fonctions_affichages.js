"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printInfo = void 0;
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../../cardModule/addTwo"));
const turnDirection_1 = __importDefault(require("../../cardModule/turnDirection"));
const skip_1 = __importDefault(require("../../cardModule/skip"));
const joker_1 = __importDefault(require("../../cardModule/joker"));
const superJoker_1 = __importDefault(require("../../cardModule/superJoker"));
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
        case "black":
            return "\x1b[5;35m";
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
        const color = colorCode(card.color);
        /* Affichage NumerotedCard */
        if (card instanceof numerotedCard_1.default) {
            console.log(`${count} ${color}${card.color}, ${card.number} ${reset} ${card.loginPlayer}`);
        }
        else if (card instanceof addTwo_1.default) {
            /* Affichage différent que pour les NumerotedCard */
            console.log(`${count} ${color}${card.color}, "+2" ${reset} ${card.loginPlayer}`);
        }
        else if (card instanceof turnDirection_1.default) {
            /* Affichage différent que pour les NumerotedCard */
            console.log(`${count} ${color}${card.color}, "<->" ${reset} ${card.loginPlayer}`);
        }
        else if (card instanceof skip_1.default) {
            /* Affichage différent que pour les NumerotedCard */
            console.log(`${count} ${color}${card.color}, "O/" ${reset} ${card.loginPlayer}`);
        }
        else if (card instanceof joker_1.default) {
            /* Affichage différent que pour les NumerotedCard */
            if (card instanceof superJoker_1.default) {
                console.log(`${count} ${color}${card.chosenColor}, "SUPER JOKER" ${reset} ${card.loginPlayer}`);
            }
            else {
                console.log(`${count} ${color}${card.chosenColor}, "JOKER" ${reset} ${card.loginPlayer}`);
            }
        }
        /* Incrémenter le compteur */
        count++;
    }
    console.log();
}
/* Fonction permettant l'affichage d'info à l'écran */
function printInfo(cardDeposit, player) {
    console.log("card deposit :");
    printCardArray(cardDeposit);
    console.log(player.login, "hand: ");
    printCardArray(player.hand);
}
exports.printInfo = printInfo;
