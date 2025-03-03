"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joker_1 = __importDefault(require("./joker"));
/**
 * Represents a numbered card, which is a subclass of Card.
 */
class SuperJoker extends joker_1.default {
    /**
     * Creates an instance of Super Joker Card.
     * @throws Error if color is invalid or number is out of range.
     */
    constructor() {
        super();
    }
    /**
     * Displays information about the card.
     * @returns A string representing characteristics of the card.
     */
    displayInfo() {
        return `SuperJoker card: \nColor : ${this.color} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer} \nChosenColor : ${this.chosenColor}`;
    }
}
exports.default = SuperJoker;
