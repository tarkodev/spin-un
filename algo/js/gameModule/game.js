"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = __importDefault(require("../playerModule/player"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
/**
 * @brief Represents a Uno game.
 */
class Game {
    /**
     * @brief Constructs a new Game instance.
     */
    constructor(players) {
        this._players = players;
        this._drawStack = this.createDrawStack();
        this._cardDeposit = [];
        this._direction = 1;
        this.cardDistribution(this._players);
    }
    remakeDrawStackIfNoCardIn() {
        if (this.drawStack.length === 0) {
            const topCard = this._cardDeposit.shift(); // Retire la première carte du dépot
            if (!topCard) {
                throw new Error("Le dépot de carte est vide");
            }
            this._drawStack = this._cardDeposit; // La pioche devient le dépot (à l'exception de la première carte)
            for (let c of this.drawStack) {
                c.effectToApply = true;
                c.loginPlayer = null;
            }
            this._cardDeposit = [topCard]; // Le dépot ne contient que la première carte
            Game.shuffle(this._drawStack); // Mélange la nouvelle pioche
        }
    }
    deleteCardTopOfDrawStack() {
        if (this._drawStack.length === 0) {
            throw new Error("La pioche est vide !");
        }
        let c = this._drawStack.shift(); // Retire la carte du haut de la pioche
        if (!c) {
            throw new Error("La carte retirée de la pioche n'est pas valide !");
        }
        if (this._drawStack.length === 0 && this._cardDeposit.length > 1) {
            // Si la pioche est vide mais il reste des cartes dans le dépot (à l'exception de la première carte),
            // nous échangeons la pioche et le dépot tout en laissant la première carte dans le dépot
            const topCard = this._cardDeposit.shift(); // Retire la première carte du dépot
            if (!topCard) {
                throw new Error("La première carte du dépot n'est pas valide !");
            }
            this._drawStack = this._cardDeposit; // La pioche devient le dépot (à l'exception de la première carte)
            this._cardDeposit = [topCard]; // Le dépot ne contient que la première carte
            Game.shuffle(this._drawStack); // Mélange la nouvelle pioche
        }
        return c;
    }
    /**
     * @brief Checks the top card in the card deposit stack.
     * @return The top card in the card deposit stack.
     */
    checkCardDeposit() {
        return this._cardDeposit[0];
    }
    /**
     * @brief Distributes cards to players.
     * @param playersList The list of players to distribute cards to.
     */
    cardDistribution(players) {
        for (let player of this.players) {
            player.hand = [];
        }
        for (let i = 0; i < 7; i++) {
            for (let player of players) {
                player.drawCard(this._drawStack, this.cardDeposit);
            }
        }
        let card_shifted = this.drawStack.shift();
        if (card_shifted !== undefined) {
            while (!(card_shifted instanceof numerotedCard_1.default)) {
                if (card_shifted !== undefined)
                    this.drawStack[this.drawStack.length] = card_shifted;
                card_shifted = this.drawStack.shift();
            }
            this._cardDeposit[0] = card_shifted;
        }
        /*
                    - unshift adds an element to the beginning and returns the new length of the array (not the added element)
                    - shift removes the first element and returns it (not the new length)
                    */
    }
    isEndRound() {
        for (let player of this._players) {
            if (player.hand.length == 0) {
                return true;
            }
        }
        return false;
    }
    endRound() {
        let count = 0;
        let winner;
        winner = null;
        for (let player of this._players) {
            if (player.hand.length == 0) {
                winner = player;
            }
            else {
                for (let card of player.hand) {
                    count += card.points;
                }
            }
        }
        if (winner instanceof player_1.default) {
            winner.points = count + winner.points;
            console.log(winner.login + " a gagné le round il empoche " + count + " points");
        }
        else {
            throw new Error("Problème : pas de joueur sans carte");
        }
    }
    get players() {
        return this._players;
    }
    get cardDeposit() {
        return this._cardDeposit;
    }
    get drawStack() {
        return this._drawStack;
    }
    get direction() {
        return this._direction;
    }
    turnDirection() {
        this._direction *= -1;
    }
}
/**
 * @brief Shuffle the cards list given in parameter (static for test use without creating instance)
 * @param cardList The list of cards to shuffle.
 */
Game.shuffle = (cardList) => {
    cardList.sort(() => Math.random() - 0.5);
};
exports.default = Game;
