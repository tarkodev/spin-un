"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
/**
 * Represents a numbered card, which is a subclass of Card.
 */
class NumerotedCard extends card_1.default {
    /**
     * Creates an instance of NumerotedCard.
     * @param color The color of the card.
     * @param number The number value of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor(color, number) {
        // Color check
        if (!["red", "blue", "green", "yellow"].includes(color)) {
            throw new Error("Invalid color. Valid colors are: red, blue, green, yellow");
        }
        // Number check
        if (number < 0 || number > 9) {
            throw new Error("Invalid number. Number must be between 0 and 9");
        }
        super(color); // Calls the constructor of the superclass (Card)
        this._number = number; // Sets the number value of the card
        this._points = number; // For NumerotedCard, points = number
    }
    /**
     * Gets the number value of the card.
     * @returns The number value of the card.
     */
    get number() {
        return this._number;
    }
    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo() {
        return `Numeroted card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}
exports.default = NumerotedCard;
