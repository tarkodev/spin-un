"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numerotedCard_1 = __importDefault(require("./numerotedCard"));
class Spin extends numerotedCard_1.default {
    constructor(color, number) {
        super(color, number); // Calls the constructor of the superclass (Card)
    }
    displayInfo() {
        return `Spin card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }
}
exports.default = Spin;
