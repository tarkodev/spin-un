"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeFalse = exports.challengeLost = exports.challengeWon = exports.youNeedToDrawTwoCards = exports.cardHasBeenPlayed = exports.cardIsNotPlayable = exports.noCardCanBePlayed = void 0;
const assert_1 = __importDefault(require("assert"));
const game_1 = __importDefault(require("../gameModule/game"));
exports.noCardCanBePlayed = "Aucune carte n'est jouable.";
exports.cardIsNotPlayable = "La carte n'est pas jouable.";
exports.cardHasBeenPlayed = "La carte a bien été joué.";
exports.youNeedToDrawTwoCards = "Tu dois piocher 2 cartes.";
exports.challengeWon = "tu as remporté le challenge.";
exports.challengeLost = "tu as perdu le challenge.";
exports.challengeFalse = "la carte jouée n'est pas un SuperJoker.";
class Player {
    /* Constructeur de la classe */
    constructor(_login) {
        this._hand = []; // Par défaut main vide
        this._points = 0; // Par défaut 0 points
        this._login = _login; // Le login sera à renseigner lors de la création de la l'instance, par défaut ""
        this._isWinner = false; // Par défaut isWinner est false
    }
    /* Méthode permettant à un joueur de piocher une carte dans la pioche */
    drawCard(drawStack, cardDeposit) {
        if (drawStack.length === 0) {
            /*la pioche est vide */
            const topCard = cardDeposit.shift(); // Retire la première carte du dépot
            if (!topCard) {
                throw new Error("Le dépot de carte est vide");
            }
            drawStack = cardDeposit; // La pioche devient le dépot (à l'exception de la première carte)
            for (let c of drawStack) {
                c.effectToApply = true;
                c.loginPlayer = null;
            }
            cardDeposit = [topCard]; // Le dépot ne contient que la première carte
            game_1.default.shuffle(drawStack); // Mélange la nouvelle pioche
        }
        /* now la pioche n'est pas vide */
        (0, assert_1.default)(drawStack.length != 0);
        const c = drawStack.shift(); // Tirer une carte du haut de la pioche
        c.loginPlayer = this.login;
        this._hand.unshift(c); // Placer la nouvelle carte dans la main du joueur
    }
    /*methode permettant de prévenir les autres joueur lorsque le joueur jour l'avant derniere carte*/
    lastCard() {
        if (this.hand.length === 1) {
            return "I have the last Card"; // un message sera afficher par le front
        }
        else {
            return "I have many Card";
        }
    }
    /*methode permettant de defier un autre joueur */
    challenge(p, cardDeposit, drawStack) {
        (0, assert_1.default)(cardDeposit.length >= 2);
        let ok = false;
        for (let i = 0; i < p.hand.length; i++) {
            if (p.hand[i].color === cardDeposit[1].color) {
                for (let j = 0; i < 6; j++) {
                    p.drawCard(drawStack, cardDeposit);
                }
                ok = true;
                break;
            }
        }
        if (!ok)
            for (let j = 0; j < 4; j++) {
                this.drawCard(drawStack, cardDeposit);
            }
    }
    /*methode permettant de contrer la methode lastCard */
    conterLast() {
        //là on verifie le nombre de carte que contient chaque joueur, si un joueur à 1 seule carte et ce joueur n'a pas encore appellé la methode lastCad,
        // idee : ajouter une variable si un joueur appelle lastCard alors la variable est à vrai , si cette var est à vrai alors le counterLast je fonctionnera pas
    }
    addToHand(c) {
        this._hand.push(c);
    }
    /* Getter _hand */
    get hand() {
        return this._hand;
    }
    /* Setter_hand */
    set hand(h) {
        this._hand = h;
    }
    /* Getter _login */
    get login() {
        return this._login;
    }
    /* Getter _points */
    get points() {
        return this._points;
    }
    /* Setter _points */
    set points(v) {
        this._points = v;
    }
    /* Getter _isWinner */
    get isWinner() {
        return this._isWinner;
    }
    /* Setter _isWinner */
    set isWinner(v) {
        this._isWinner = v;
    }
}
exports.default = Player;
