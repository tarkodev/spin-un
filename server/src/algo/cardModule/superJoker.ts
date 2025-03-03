import Joker from "./joker";

/**
 * Represents a numbered card, which is a subclass of Card.
 */
class SuperJoker extends Joker {

    /**
     * Creates an instance of Super Joker Card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor() {
        super();
        this._number = 14; // sets the number of superJoker card as 14
        this._isSpin = false;
    }

    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo(): string {
        return `SuperJoker card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer} \nChosenColor : ${this.chosenColor}`;
    }
}

export default SuperJoker;
