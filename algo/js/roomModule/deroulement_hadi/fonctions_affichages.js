"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printInfo = void 0;
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../../cardModule/addTwo"));
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
        const color = colorCode(card.color);
        /* Affichage NumerotedCard */
        if (card instanceof numerotedCard_1.default) {
            console.log(`${count} ${color}${card.color}, ${card.number} ${reset} ${card.loginPlayer}`);
        }
        else if (card instanceof addTwo_1.default) {
            /* Affichage différent que pour les NumerotedCard */
            console.log(`${count} ${color}${card.color}, "+2" ${reset} ${card.loginPlayer}`);
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
