"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("./player"));
const player_2 = require("./player");
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../cardModule/addTwo"));
const assert_1 = __importDefault(require("assert"));
const turnDirection_1 = __importDefault(require("../cardModule/turnDirection"));
const skip_1 = __importDefault(require("../cardModule/skip"));
const joker_1 = __importDefault(require("../cardModule/joker"));
class IA extends player_1.default {
    /* Constructeur de la classe */
    constructor(_login = "") {
        super(_login); /* Appel au constructeur de la classe mère */
    }
    /* Méthode privée pour playableRandomCard */
    checkInstanceCardOnTopOfCardDeposit(cOnTopCardDeposit, cHand, cardDeposit) {
        if ((cOnTopCardDeposit instanceof numerotedCard_1.default &&
            cHand instanceof numerotedCard_1.default &&
            (cOnTopCardDeposit.number === cHand.number)) ||
            (cOnTopCardDeposit.color === cHand.color) ||
            (cOnTopCardDeposit instanceof addTwo_1.default && cHand instanceof addTwo_1.default) ||
            (cOnTopCardDeposit instanceof turnDirection_1.default && cHand instanceof turnDirection_1.default) ||
            (cOnTopCardDeposit instanceof skip_1.default && cHand instanceof skip_1.default) ||
            (cHand instanceof joker_1.default) ||
            (cOnTopCardDeposit instanceof joker_1.default && cOnTopCardDeposit.chosenColor === cHand.color)) {
            /* Jouer la carte */
            return this.playCard(cHand, cardDeposit);
        }
        /* La carte n'est pas jouable */
        return { succes: false, information: player_2.cardIsNotPlayable };
    }
    /* Méthode pour faire jouer une IA de façon bête */
    playableRandomCard(cardDeposit) {
        (0, assert_1.default)(this._hand.length > 0); // Vérifier que la main n'est pas vide
        const cOnTopCardDeposit = cardDeposit[0]; // Récuperer la carte en haut du dépot
        let checkInstance = {
            succes: false,
            information: player_2.noCardCanBePlayed,
        };
        /* Tenter de joueur n'importe quelle carte présente dans la main */
        for (const cHand of this._hand) {
            /* Selon l'instance de la carte du haut du dépot, différentes actions sont possibles */
            checkInstance = this.checkInstanceCardOnTopOfCardDeposit(cOnTopCardDeposit, cHand, cardDeposit);
            /* Si la clef succes est true alors c'est bon on quitte la méthode */
            if (checkInstance.succes) {
                return checkInstance;
            }
        }
        /* Si au dernier tour de la boucle la carte testée n'est pas jouable, ça signifie qu'aucune carte n'était jouable */
        if (checkInstance.information === player_2.cardIsNotPlayable) {
            checkInstance.information = player_2.noCardCanBePlayed;
        }
        return checkInstance;
    }
    /* Méthode permettant de joueur une carte sur le dépot de carte */
    playCard(c, cardDeposit) {
        const indexC = this._hand.indexOf(c);
        if (indexC !== -1) {
            this.hand.splice(indexC, 1); //Retirer la carte de la main du joueur en récuperant la position de la carte demandée dans la main et la retirer ensuite
            cardDeposit.unshift(c); // Empiler la carte jouée
            return { succes: true, information: player_2.cardHasBeenPlayed };
        }
        /* Ce cas ne devrait jamais arriver, mais là par précaution */
        return { succes: false, information: player_2.cardIsNotPlayable };
    }
}
exports.default = IA;
