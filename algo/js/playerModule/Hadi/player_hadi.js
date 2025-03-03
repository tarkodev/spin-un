"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
class Player {
    /* Constructeur de la classe */
    constructor(_login) {
        this._hand = []; // Par défaut main vide
        this._points = 0; // Par défaut 0 points
        this._login = _login; // Le login sera à renseigner lors de la création de la l'instance, par défaut ""
        this._isWinner = false; // Par défaut isWinner est false
    }
    /* Méthode permettant à un joueur de piocher une carte dans la pioche */
    drawCard(drawStack) {
        /* Si la pioche n'est pas vide */
        (0, assert_1.default)(drawStack.length != 0);
        const c = drawStack.pop(); // Tirer une carte du haut de la pioche
        this._hand.unshift(c); // Placer la nouvelle carte dans la main du joueur
        return c;
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
