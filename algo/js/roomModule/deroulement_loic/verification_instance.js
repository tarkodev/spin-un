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
exports.verificationInstancePlayer = void 0;
const ia_1 = __importDefault(require("../../playerModule/ia"));
const game_1 = __importDefault(require("../../gameModule/game"));
const readlineSync = __importStar(require("readline-sync"));
const real_1 = __importDefault(require("../../playerModule/real"));
const console_1 = require("console");
/* Fonction permettant de récupérer les cartes contenues dans cardDeposit et de les placer dans drawStack */
function swapDrawStackAndCardDeposit(drawStack, cardDeposit) {
    (0, console_1.assert)(cardDeposit.length !== 0);
    let cardOnTopOfCardDeposit = cardDeposit.shift();
    while (cardDeposit.length > 0) {
        drawStack.unshift(cardDeposit.shift());
    }
    cardDeposit.unshift(cardOnTopOfCardDeposit);
}
/* Fonction simulant le tour d'une IA */
function turnIA(p, cardDeposit, drawStack) {
    /* Si aucune carte n'est jouable alors priocher */
    if (!p.playableRandomCard(cardDeposit)) {
        /* Tester si la pioche est vide, si oui alors on prend toutes les cartes de cardDeposità l'exception de celle du haut et on mélange de nouveau */
        if (drawStack.length === 0) {
            /* Tant que cardDeposit contient plus d'un élément alors on lui retire des cartes */
            swapDrawStackAndCardDeposit(drawStack, cardDeposit);
            /* Mélange de la pioche */
            game_1.default.shuffle(drawStack);
        }
        p.drawCard(drawStack);
    }
}
/* Fonction permettant de faire jouer un véritable joueur */
function turnReal(p, cardDeposit, drawStack) {
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
                    } while (indexCard < 0 || indexCard >= p.hand.length); // Tant que l'index n'est pas compris dans la longueur de la main
                    returnOfAction = p.playCard(p.hand[indexCard], cardDeposit).succes;
                    countAction++;
                } while (returnOfAction === false && countAction < 5);
                if (countAction === 5) {
                    if (drawStack.length === 0) {
                        swapDrawStackAndCardDeposit(drawStack, cardDeposit);
                    }
                    p.drawCard(drawStack);
                }
                untilChoiceIsWrong = false;
                break;
            case "p":
                /* Si le joueur décide de piocher directement */
                if (drawStack.length === 0) {
                    swapDrawStackAndCardDeposit(drawStack, cardDeposit);
                }
                p.drawCard(drawStack);
                untilChoiceIsWrong = false;
                break;
            default:
                console.log("Veuillez saisir une réponse valide.");
                break;
        }
    }
}
/* Fonction permettant la vérification de l'instance */
function verificationInstancePlayer(room, turnPlayer) {
    /* Si le joueur est une instance d'IA */
    if (room.playersList[turnPlayer] instanceof ia_1.default) {
        turnIA(room.playersList[turnPlayer], room.game.cardDeposit, room.game.drawStack);
    }
    else if (room.playersList[turnPlayer] instanceof real_1.default) {
        turnReal(room.playersList[turnPlayer], room.game.cardDeposit, room.game.drawStack);
    }
}
exports.verificationInstancePlayer = verificationInstancePlayer;
