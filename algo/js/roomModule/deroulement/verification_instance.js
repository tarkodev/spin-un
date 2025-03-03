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
exports.verificationInstancePlayer = exports.turnIA = exports.swapDrawStackAndCardDeposit = void 0;
const readlineSync = __importStar(require("readline-sync"));
const console_1 = require("console");
const game_1 = __importDefault(require("../../gameModule/game"));
const player_1 = require("../../playerModule/player");
const real_1 = __importDefault(require("../../playerModule/real"));
const ia_1 = __importDefault(require("../../playerModule/ia"));
/* Fonction permettant de récupérer les cartes contenues dans cardDeposit et de les placer dans drawStack */
function swapDrawStackAndCardDeposit(drawStack, cardDeposit) {
    (0, console_1.assert)(cardDeposit.length !== 0);
    let cardOnTopOfCardDeposit = cardDeposit.shift();
    while (cardDeposit.length > 0) {
        drawStack.unshift(cardDeposit.shift());
    }
    cardDeposit.unshift(cardOnTopOfCardDeposit);
}
exports.swapDrawStackAndCardDeposit = swapDrawStackAndCardDeposit;
/* Tirer dans la pioche */
function drawInDrawStack(cardDeposit, drawStack, p) {
    /* Tester si la pioche est vide, si oui alors on prend toutes les cartes de cardDeposit à l'exception de celle du haut et on mélange de nouveau */
    if (drawStack.length === 0) {
        /* Tant que cardDeposit contient plus d'un élément alors on lui retire des cartes */
        swapDrawStackAndCardDeposit(drawStack, cardDeposit);
        /* Mélange de la pioche */
        game_1.default.shuffle(drawStack);
    }
    p.drawCard(drawStack, cardDeposit);
}
/* Checker le retour de clef information dans un switch case */
function checkInformationStatus(information, cardDeposit, drawStack, p) {
    /* switch case */
    switch (information) {
        /* Aucune carte n'est jouable */
        case player_1.noCardCanBePlayed:
            /* Piocher une carte si aucune carte dans la main d'est jouable */
            drawInDrawStack(cardDeposit, drawStack, p);
            break;
        case player_1.cardIsNotPlayable:
            //Si la carte n'est pas jouable
            break;
        default:
            break;
    }
}
/* Fonction simulant le tour d'une IA */
function turnIA(p, cardDeposit, drawStack) {
    /* Si aucune carte n'est jouable alors priocher */
    let statusPlayCard = p.playableRandomCard(cardDeposit);
    if (!statusPlayCard.succes) {
        /* Checker la clef information */
        checkInformationStatus(statusPlayCard.information, cardDeposit, drawStack, p);
    }
}
exports.turnIA = turnIA;
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
                let returnOfAction = {
                    succes: false,
                    information: player_1.cardIsNotPlayable,
                };
                do {
                    /* Demander à l'utilisateur la carte à jouer */
                    let inputCardInput = readlineSync.question("Quelle carte voulez vous jouer ? ");
                    /* Récupérer la réponse et la convertir en entier */
                    indexCard = parseInt(inputCardInput);
                    /* Vérification */
                    (0, console_1.assert)(!isNaN(indexCard));
                } while (indexCard < 0 || indexCard >= p.hand.length); // Tant que l'index n'est pas compris dans la longueur de la main
                returnOfAction = p.playCard(p.hand[indexCard], cardDeposit);
                console.log(returnOfAction);
                /* Si la clef succes est false alors checker la raison */
                if (!returnOfAction.succes) {
                    if (returnOfAction.information === player_1.youNeedToDrawTwoCards) {
                        console.log("Vous devez piocher 2 cartes !");
                        untilChoiceIsWrong = false;
                    }
                    else {
                        console.log("Impossible de jouer cette carte.");
                    }
                    checkInformationStatus(returnOfAction.information, cardDeposit, drawStack, p);
                }
                else {
                    untilChoiceIsWrong = false;
                }
                break;
            case "p":
                /* Si le joueur décide de piocher directement */
                drawInDrawStack(cardDeposit, drawStack, p);
                untilChoiceIsWrong = false;
                break;
            default:
                console.log("Veuillez saisir une réponse valide.");
                break;
        }
    }
}
/* Fonction permettant la vérification de l'instance */
function verificationInstancePlayer(room) {
    /* Si le joueur est une instance d'IA */
    if (room.playersList[room.whosTurn] instanceof ia_1.default) {
        turnIA(room.playersList[room.whosTurn], room.game.cardDeposit, room.game.drawStack);
    }
    else if (room.playersList[room.whosTurn] instanceof real_1.default) {
        turnReal(room.playersList[room.whosTurn], room.game.cardDeposit, room.game.drawStack);
    }
}
exports.verificationInstancePlayer = verificationInstancePlayer;
