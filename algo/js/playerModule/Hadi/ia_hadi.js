"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_hadi_1 = __importDefault(require("./player_hadi"));
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const assert_1 = __importDefault(require("assert"));
class IA extends player_hadi_1.default {
    /* Constructeur de la classe */
    constructor(_login = "") {
        /* Appel au constructeur de la classe mère */
        super(_login);
    }
    playableRandomCard(cardDeposit) {
        (0, assert_1.default)(this._hand.length > 0); // Vérifier que la main n'est pas vide
        const cOnTopCardDeposit = cardDeposit[0]; // Récuperer la carte en haut du dépot
        for (const cHand of this._hand) {
            /* tester l'instance des deux cartes pour savoir si les deux sont des NumerotedCard */
            if (cOnTopCardDeposit instanceof numerotedCard_1.default &&
                cHand instanceof numerotedCard_1.default) {
                if (cOnTopCardDeposit.color == cHand.color ||
                    cOnTopCardDeposit.number == cHand.number) {
                    if (this.playCard(cHand, cardDeposit)) {
                        // Tester si la carte est jouable, si oui la jouer
                        return true; // Quitter la fonction
                    }
                }
            }
        }
        return false; // Aucune carte n'est jouable, piocher !
    }
    /* Méthode permettant de joueur une carte sur le dépot de carte */
    playCard(c, cardDeposit) {
        const indexC = this._hand.indexOf(c);
        if (indexC !== -1) {
            this.hand.splice(indexC, 1); //Retirer la carte de la main du joueur en récuperant la position de la carte demandée dans la main et la retirer ensuite
            cardDeposit.unshift(c); // Ajouter la carte jouée
            return true; // La carte est jouable
        }
        return false; // La carte n'est pas jouable
    }
}
exports.default = IA;
