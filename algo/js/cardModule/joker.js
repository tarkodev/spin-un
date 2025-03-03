"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
/**
 * Represents a numbered card, which is a subclass of Card.
 */
class Joker extends card_1.default {
    /**
     * Creates an instance of Joker Card.
     * @param color The color of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor() {
        super("black"); // Calls the constructor of the superclass (Card)
        /**
         * The selected color after playing this card.
         */
        this._chosenColor = "black";
        this._points = 50; // For AddTwo : points = 20
    }
    /**
     * Sets the selected color.
     * @param color one color in ["red", "yellow", "green", "blue"].
     */
    set chosenColor(color) {
        this._chosenColor = color;
    }
    /**
     * Gets the selected color.
     * @returns the selected color.
     */
    get chosenColor() {
        return this._chosenColor;
    }
    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo() {
        return `Joker card: \nColor : ${this.color} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer} \nChosenColor : ${this.chosenColor}`;
    }
}
exports.default = Joker;
