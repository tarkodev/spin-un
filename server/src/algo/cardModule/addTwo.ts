import Card from "./card";

/**
 * Represents a numbered card, which is a subclass of Card.
 */
class AddTwo extends Card {


    /**
     * Creates an instance of AddTwo Card.
     * @param color The color of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor(color: string) {
        super(color); // Calls the constructor of the superclass (Card)
        this._number = 12; // sets the number of addTwo card as 12
        this._points = 20; // For AddTwo : points = 20
        this._isSpin = false;
    }

    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo(): string {
        return `AddTwo card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}

export default AddTwo;
