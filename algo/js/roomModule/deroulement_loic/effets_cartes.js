"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEffect = void 0;
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../../cardModule/addTwo"));
const skip_1 = __importDefault(require("../../cardModule/skip"));
const joker_1 = __importDefault(require("../../cardModule/joker"));
const superJoker_1 = __importDefault(require("../../cardModule/superJoker"));
const turnDirection_1 = __importDefault(require("../turnDirection"));
/* Vérifie si l'effet de la carte est déja utilisé et ensuite lance la fonction de l'effet en question */
function checkEffect(r) {
    let cardOnTop = r.game.checkCardDeposit();
    if (!(cardOnTop instanceof numerotedCard_1.default) &&
        cardOnTop.effectToApply === true) {
        if (cardOnTop instanceof addTwo_1.default) {
            addTwoEffect(r);
            cardOnTop.effectToApply = false;
        }
        else if (cardOnTop instanceof skip_1.default) {
            skipEffect(r);
            cardOnTop.effectToApply = false;
        }
        else if (cardOnTop instanceof turnDirection_1.default) {
            turnDirectionEffect(r);
            cardOnTop.effectToApply = false;
        }
        else if (cardOnTop instanceof joker_1.default) {
            jokerEffect(r);
            cardOnTop.effectToApply = false;
        }
        else if (cardOnTop instanceof superJoker_1.default) {
            superJokerEffect(r);
            cardOnTop.effectToApply = false;
        }
    }
}
exports.checkEffect = checkEffect;
function cardToDrawPunishement(n, r) {
    for (let i = 0; i < n; i++) {
        r.playersList[r.whosTurn + r.game.direction].drawCard(r.game.drawStack);
        r.game.remakeDrawStackIfNoCardIn();
    }
    r.whosTurn += r.game.direction;
}
function addTwoEffect(r) {
    cardToDrawPunishement(2, r);
    r.whosTurn += r.game.direction;
}
function skipEffect(r) {
    r.whosTurn += r.game.direction;
}
function turnDirectionEffect(r) {
    r.game.turnDirection();
}
function jokerEffect(r) {
    /* Demander la couleur que le joueur veut*/
    let chosencolor = "red";
    let jokerCard = r.game.checkCardDeposit(); // Cast deposit en tant que Joker
    jokerCard.chosenColor = chosencolor; // Maintenant vous pouvez accéder à chosencolor
    r.game.cardDeposit[0] = jokerCard;
}
function superJokerEffect(r) {
    jokerEffect(r);
    cardToDrawPunishement(4, r);
}
