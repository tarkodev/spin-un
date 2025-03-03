"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Real from "./real_hadi";
const ia_hadi_1 = __importDefault(require("./ia_hadi"));
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const assert_1 = __importDefault(require("assert"));
/* Fonction qui check quel joueur n'as plus de carte dans sa main */
function isEnd(playersList) {
    return playersList.some((player) => player.hand.length === 0);
}
/* Permet l'insertion d'une carte dans le dépot à partir de la pioche */
function insertCardInCardDeposit(cardDeposit, drawStack) {
    (0, assert_1.default)(drawStack.length > 0);
    cardDeposit.unshift(drawStack.pop());
}
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
    console.log("Number of cards :", cardArray.length);
    let counter = 0;
    for (const card of cardArray) {
        if (card instanceof numerotedCard_1.default) {
            const color = colorCode(card.color);
            console.log(`${counter} ${color}${card.color}, ${card.number}${reset}`);
            counter++;
        }
    }
    console.log();
}
/* fonction d'initialisation */
function init() {
    let cardDeposit = [];
    let drawStack = [];
    const colorsList = ["blue", "red", "green", "yellow"];
    const numberOfCardDrawStack = 50;
    const numberOfCardForEachHandPlayer = 5;
    /* Création des joueurs */
    let ia1 = new ia_hadi_1.default("IA1");
    let ia2 = new ia_hadi_1.default("IA2");
    let ia3 = new ia_hadi_1.default("IA3");
    let ia4 = new ia_hadi_1.default("IA4");
    /* Liste des joueurs */
    let playersList = [];
    playersList.unshift(ia1);
    playersList.unshift(ia2);
    playersList.unshift(ia3);
    playersList.unshift(ia4);
    /* Initialisation des cartes dans la pioche */
    for (let index = 0; index < numberOfCardDrawStack; index++) {
        let indexColor = Math.floor(Math.random() * colorsList.length); // Générer un nombre aléatoire entre 0 et la taille du tableau colorsList
        let numberCard = Math.floor(Math.random() * 10); // Générer un nombre aléatoire entre 0 et 9
        drawStack.unshift(new numerotedCard_1.default(colorsList[indexColor], numberCard)); // Insertion des cartes dans drawStack
    }
    /* Chaque joueur pioche 4 cartes de la pioche */
    for (let indexArray = 0; indexArray < playersList.length; indexArray++) {
        for (let numberOfCard = 0; numberOfCard < numberOfCardForEachHandPlayer; numberOfCard++) {
            playersList[indexArray].drawCard(drawStack);
        }
    }
    insertCardInCardDeposit(cardDeposit, drawStack);
    let returnObjets = [playersList, cardDeposit, drawStack];
    return returnObjets;
}
/* Fonction de test */
function test() {
    /* Objets pour la suite du jeu */
    let returnObjets = init();
    let playersList = returnObjets[0];
    let cardDeposit = returnObjets[1];
    let drawStack = returnObjets[2];
    let turnPlayer = 0;
    /* Déroulement du jeu */
    while (!isEnd(playersList)) {
        /* À qui le tour */
        turnPlayer %= playersList.length;
        /* Petit affichage */
        console.log("###############################");
        console.log("Card deposit before ", playersList[turnPlayer].login, "turn :");
        printCardArray(cardDeposit);
        console.log(playersList[turnPlayer].login, "hand :");
        printCardArray(playersList[turnPlayer].hand);
        /* Check si le joueur est une IA */
        if (playersList[turnPlayer] instanceof ia_hadi_1.default) {
            /* Si la méthode renvoie false alors piocher ! */
            if (!playersList[turnPlayer].playableRandomCard(cardDeposit)) {
                playersList[turnPlayer].drawCard(drawStack);
            }
        }
        console.log(playersList[turnPlayer].login, "hand :");
        printCardArray(playersList[turnPlayer].hand);
        console.log("Card deposit after ", playersList[turnPlayer].login, "turn :");
        printCardArray(cardDeposit);
        console.log("###############################");
        /* Incrémenter le tour du joueur */
        turnPlayer++;
    }
    /* Permet d'afficher le gagnant de la partie */
    for (let indexArray = 0; indexArray < playersList.length; indexArray++) {
        if (playersList[indexArray].hand.length === 0) {
            playersList[indexArray].isWinner = true;
            console.log(playersList[indexArray].login, "is the winner !");
            break;
        }
    }
}
test();
