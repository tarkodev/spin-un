import Card from "./card";

/**
 * Represents a numbered card, which is a subclass of Card.
 */
class Skip extends Card {


    /**
     * Creates an instance of Skip Card.
     * @param color The color of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor(color: string) {
        super(color); // Calls the constructor of the superclass (Card)
        this._number = 10; // sets the number of skip card as 10
        this._points = 20; // For Skip : points = 20
        this._isSpin = false;
    }

    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo(): string {
        return `Skip card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}

export default Skip;
