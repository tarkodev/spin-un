import Card from "../cardModule/card";
import Player from "../playerModule/player";
import NumerotedCard from "../cardModule/numerotedCard";
import Spin from "../cardModule/spin";
/**
 * @brief Represents a Uno game.
 */
export default abstract class Game {
    /**
     * @brief The list of players.
     */
    protected _players: Player[];

    /**
     * @brief The draw stack of cards.
     */
    protected _drawStack: Card[];

    /**
     * @brief The card deposit stack.
     */
    protected _cardDeposit: Card[];

    /**
     * @brief The direction of play (1 for clockwise, -1 for counter-clockwise).
     */
    protected _direction: number;

    /**
     * @brief Constructs a new Game instance.
     */
    constructor(players: Player[]) {
        this._players = players;
        this._drawStack = this.createDrawStack();
        this._cardDeposit = [];
        this._direction = 1;
        this.cardDistribution(this._players);
    }

    /**
     * @brief Shuffle the cards list given in parameter (static for test use without creating instance)
     * @param cardList The list of cards to shuffle.
     */
    static shuffle = (cardList: Card[]): void => {
        cardList.sort(() => Math.random() - 0.5);
    };

    /**
     * @brief Creates a draw stack based on the game mode.
     * @return The created draw stack.
     * @throws Error if the mode is invalid.
     */
    abstract createDrawStack(): Card[];

    public remakeDrawStackIfNoCardIn() {
        if (this.drawStack.length === 0) {
            const topCard = this._cardDeposit.shift(); // Retire la première carte du dépot
            if (!topCard) {
                throw new Error("Le dépot de carte est vide");
            }
            this._drawStack = this._cardDeposit; // La pioche devient le dépot (à l'exception de la première carte)
            for (let c of this.drawStack){
                c.effectToApply=true;
                c.loginPlayer=null;
            }
            this._cardDeposit = [topCard]; // Le dépot ne contient que la première carte
            Game.shuffle(this._drawStack); // Mélange la nouvelle pioche
        }
    }

    public deleteCardTopOfDrawStack(): Card {
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
    checkCardDeposit(): Card {
        return this._cardDeposit[0];
    }

    /**
     * @brief Distributes cards to players.
     * @param playersList The list of players to distribute cards to.
     */
    cardDistribution(players: Player[]): void {
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
            while (! (card_shifted instanceof NumerotedCard) || (card_shifted instanceof Spin)){
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

    public isEndRound(): boolean {
        for (let player of this._players) {
            if (player.hand.length == 0) {
                return true;
            }
        }
        return false;
    }

    public endRound(): void {
        let count = 0;
        let winner: Player | null;
        winner = null;
        for (let player of this._players) {
            if (player.hand.length == 0) {
                winner = player;
            } else {
                for (let card of player.hand) {
                    count += card.points;
                }
            }
        }
        if (winner instanceof Player) {
            winner.points = count + winner.points;
            console.log(
                winner.login + " a gagné le round il empoche " + count + " points",
            );
        } else {
            throw new Error("Problème : pas de joueur sans carte");
        }
    }

    public turnDirection(): void {
        this._direction *= -1;
    }

    public get players(): Player[] {
        return this._players;
    }

    public get cardDeposit(): Card[] {
        return this._cardDeposit;
    }

    public get drawStack(): Card[] {
        return this._drawStack;
    }

    public get direction(): number {
        return this._direction;
    }

}
