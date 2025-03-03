import Card from "./card";

/**
 * Represents a numbered card, which is a subclass of Card.
 */
class NumerotedCard extends Card {
    /**
     * Creates an instance of NumerotedCard.
     * @param color The color of the card.
     * @param number The number value of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor(color: string, number: number) {
        // Color check
        if (!["red", "blue", "green", "yellow"].includes(color)) {
            throw new Error("Invalid color. Valid colors are: red, blue, green, yellow");
        }
        
        // Number check
        if (number < 0 || number > 9) {
            throw new Error("Invalid number. Number must be between 0 and 9");
        }

        super(color); // Calls the constructor of the superclass (Card)
        this._isSpin = false;
        this._number = number; // Sets the number value of the card
        this._points = number; // For NumerotedCard, points = number
    }


    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo(): string {
        return `Numeroted card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}

export default NumerotedCard;
