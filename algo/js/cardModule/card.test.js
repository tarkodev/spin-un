"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addTwo_1 = __importDefault(require("./addTwo"));
const numerotedCard_1 = __importDefault(require("./numerotedCard"));
const skip_1 = __importDefault(require("./skip"));
const turnDirection_1 = __importDefault(require("./turnDirection"));
describe("NumerotedCard", () => {
    it("should throw an error if number higher than 9", () => {
        expect(() => new numerotedCard_1.default("red", 10)).toThrowError("Invalid number. Number must be between 0 and 9");
    });
    it("should throw an error if number lower than 0", () => {
        expect(() => new numerotedCard_1.default("red", -1)).toThrowError("Invalid number. Number must be between 0 and 9");
    });
    it("should throw an error if color is invalid", () => {
        expect(() => new numerotedCard_1.default("purple", 5)).toThrowError("Invalid color. Valid colors are: red, blue, green, yellow");
    });
    it("should display color and number", () => {
        const numberOfRuns = 10;
        for (let i = 0; i < numberOfRuns; i++) {
            const randomColor = ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]; //random color between accepted colors
            const randomNumber = Math.floor(Math.random() * 10); //random number between 0 and 10
            const card = new numerotedCard_1.default(randomColor, randomNumber);
            expect(card.displayInfo()).toEqual(`Numeroted card: \nColor : ${randomColor} \nNumber : ${randomNumber} \nPoints : ${randomNumber} \nVisible: false \nLogin player : null`);
        }
    });
    it("should correctly get and set visibility", () => {
        const card = new numerotedCard_1.default("red", 5);
        expect(card.isVisible).toEqual(false);
        card.isVisible = true;
        expect(card.isVisible).toEqual(true);
    });
    it("should correctly get and set login player", () => {
        const card = new numerotedCard_1.default("red", 5);
        expect(card.loginPlayer).toEqual(null);
        card.loginPlayer = "player1";
        expect(card.loginPlayer).toEqual("player1");
    });
    it("should correctly get color", () => {
        const card = new numerotedCard_1.default("red", 5);
        expect(card.color).toEqual("red");
    });
    it("should correctly get number", () => {
        const card = new numerotedCard_1.default("red", 5);
        expect(card.number).toEqual(5);
    });
    it("should correctly get points", () => {
        const card = new numerotedCard_1.default("red", 5);
        expect(card.points).toEqual(5);
    });
});
describe("Skip", () => {
    it("should correctly get points", () => {
        const card = new skip_1.default("blue");
        expect(card.points).toEqual(20);
    });
});
describe("AddTwo", () => {
    it("should correctly get points", () => {
        const card = new addTwo_1.default("green");
        expect(card.points).toEqual(20);
    });
});
describe("TurnDirection", () => {
    it("should correctly get points", () => {
        const card = new turnDirection_1.default("green");
        expect(card.points).toEqual(20);
    });
});
