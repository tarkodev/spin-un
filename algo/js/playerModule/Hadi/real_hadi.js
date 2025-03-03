"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_hadi_1 = __importDefault(require("./player_hadi"));
const numerotedCard_1 = __importDefault(require("../../cardModule/numerotedCard"));
const assert_1 = __importDefault(require("assert"));
class Real extends player_hadi_1.default {
    /* Constructeur de la classe */
    constructor(_login = "") {
        /* Appel au constructeur de la classe mère */
        super(_login);
    }
    /* Méthode permettant de joueur une carte sur le dépot de carte */
    playCard(c, cardDeposit) {
        (0, assert_1.default)(this._hand.length > 0); // Vérifier que la main n'est pas vide
        const cOnTopCardDeposit = cardDeposit[cardDeposit.length - 1]; // Récuperer la carte en haut du dépot
        /* tester l'instance des deux cartes pour savoir si les deux sont des NumerotedCard */
        if (cOnTopCardDeposit instanceof numerotedCard_1.default &&
            c instanceof numerotedCard_1.default) {
            if (cOnTopCardDeposit.number == c.number ||
                cOnTopCardDeposit.color == c.color) {
                const indexC = this._hand.indexOf(c);
                if (indexC !== -1) {
                    // Vérifier que la carte est bien présente dans la main du joueur
                    this.hand.splice(indexC, 1); //Retirer la carte de la main du joueur en récuperant la position de la carte demandée dans la main et la retirer ensuite
                    cardDeposit.unshift(c); // Empiler la carte jouée
                    return true; // La carte est jouable
                }
            }
        }
        return false; // La carte n'est pas jouable
    }
}
exports.default = Real;
