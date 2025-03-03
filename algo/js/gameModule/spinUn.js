"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __importDefault(require("./game"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const spin_1 = __importDefault(require("../cardModule/spin"));
const skip_1 = __importDefault(require("../cardModule/skip"));
const turnDirection_1 = __importDefault(require("../cardModule/turnDirection"));
const addTwo_1 = __importDefault(require("../cardModule/addTwo"));
const joker_1 = __importDefault(require("../cardModule/joker"));
const superJoker_1 = __importDefault(require("../cardModule/superJoker"));
class SpinUn extends game_1.default {
    constructor(players) {
        super(players);
    }
    createDrawStack() {
        let drawStack = [];
        let colors = ["red", "green", "blue", "yellow"];
        for (let i = 0; i < 4; i++) {
            drawStack.push(new numerotedCard_1.default(colors[i], 0));
            drawStack.push(new skip_1.default(colors[i]));
            drawStack.push(new skip_1.default(colors[i]));
            drawStack.push(new turnDirection_1.default(colors[i]));
            drawStack.push(new turnDirection_1.default(colors[i]));
            drawStack.push(new addTwo_1.default(colors[i]));
            drawStack.push(new addTwo_1.default(colors[i]));
            drawStack.push(new joker_1.default());
            drawStack.push(new superJoker_1.default());
            for (let j = 1; j <= 5; j++) {
                drawStack.push(new spin_1.default(colors[i], j));
                drawStack.push(new numerotedCard_1.default(colors[i], j));
            }
            for (let j = 6; j < 10; j++) {
                drawStack.push(new numerotedCard_1.default(colors[i], j));
                drawStack.push(new numerotedCard_1.default(colors[i], j));
            }
        }
        game_1.default.shuffle(drawStack);
        return drawStack;
    }
}
exports.default = SpinUn;
