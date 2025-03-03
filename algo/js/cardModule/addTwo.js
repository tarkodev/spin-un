"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
/**
 * Represents a numbered card, which is a subclass of Card.
 */
class AddTwo extends card_1.default {
    /**
     * Creates an instance of AddTwo Card.
     * @param color The color of the card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor(color) {
        super(color); // Calls the constructor of the superclass (Card)
        this._points = 20; // For AddTwo : points = 20
    }
    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo() {
        return `AddTwo card: \nColor : ${this.color} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}
exports.default = AddTwo;
