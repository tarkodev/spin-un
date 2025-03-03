import Card from "./card";

/**
 * Represents a numbered card, which is a subclass of Card.
 */
class Joker extends Card {

    /**
     * The selected color after playing this card.
     */
    protected _chosenColor: string = "black";

    /**
     * Creates an instance of Joker Card.
     * @param color The color of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor() {
        super("black"); // Calls the constructor of the superclass (Card)
        this._number = 13; // sets the number of joker card as 13
        this._points = 50; // For AddTwo : points = 20
        this._isSpin = false;
    }

    /**
     * Sets the selected color.
     * @param color one color in ["red", "yellow", "green", "blue"].
     */
    public set chosenColor(color: string) {
        this._chosenColor = color;
    }

    /**
     * Gets the selected color.
     * @returns the selected color.
     */
    public get chosenColor(): string {
        return this._chosenColor;
    }

    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo(): string {
        return `Joker card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer} \nChosenColor : ${this.chosenColor}`;
    }
}

export default Joker;
