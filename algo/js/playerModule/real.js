"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("./player"));
const player_2 = require("./player");
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../cardModule/addTwo"));
const turnDirection_1 = __importDefault(require("../cardModule/turnDirection"));
const assert_1 = __importDefault(require("assert"));
const skip_1 = __importDefault(require("../cardModule/skip"));
const joker_1 = __importDefault(require("../cardModule/joker"));
class Real extends player_1.default {
    /* Constructeur de la classe */
    constructor(_login = "") {
        /* Appel au constructeur de la classe mère */
        super(_login);
    }
    subRoutinePlayCard(cardDeposit, c) {
        const indexC = this._hand.indexOf(c);
        if (indexC !== -1) {
            // Vérifier que la carte est bien présente dans la main du joueur
            this.hand.splice(indexC, 1); //Retirer la carte de la main du joueur en récuperant la position de la carte demandée dans la main et la retirer ensuite
            cardDeposit.unshift(c); // Empiler la carte jouée
            return { succes: true, information: player_2.cardHasBeenPlayed };
        }
        /* Ce cas ne devrait pas arriver mais par précaution on gère l'erreur */
        return { succes: false, information: player_2.cardIsNotPlayable };
    }
    /* Méthode permettant de joueur une carte sur le dépot de carte */
    playCard(c, cardDeposit) {
        (0, assert_1.default)(this._hand.length > 0); // Vérifier que la main n'est pas vide
        const cOnTopCardDeposit = cardDeposit[0]; // Récuperer la carte en haut du dépot
        let statusPlayCard = {
            succes: false,
            information: player_2.cardIsNotPlayable,
        };
        if ((cOnTopCardDeposit instanceof numerotedCard_1.default &&
            c instanceof numerotedCard_1.default &&
            (cOnTopCardDeposit.number === c.number)) ||
            (cOnTopCardDeposit.color === c.color) ||
            (cOnTopCardDeposit instanceof addTwo_1.default && c instanceof addTwo_1.default) ||
            (cOnTopCardDeposit instanceof turnDirection_1.default && c instanceof turnDirection_1.default) ||
            (cOnTopCardDeposit instanceof skip_1.default && c instanceof skip_1.default) ||
            (c instanceof joker_1.default) ||
            (cOnTopCardDeposit instanceof joker_1.default && cOnTopCardDeposit.chosenColor === c.color)) {
            statusPlayCard = this.subRoutinePlayCard(cardDeposit, c);
        }
        return statusPlayCard;
    }
}
exports.default = Real;
