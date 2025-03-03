"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classicUn_1 = __importDefault(require("./classicUn"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const real_1 = __importDefault(require("../playerModule/real"));
const game_1 = __importDefault(require("./game")); // for Game.shuffle() use
describe("ClassicUn", () => {
    let players = [new real_1.default("1"), new real_1.default("2"), new real_1.default("3")];
    let game = new classicUn_1.default(players);
    it("should get an instance of ClassicUn", () => {
        expect(game).toBeInstanceOf(classicUn_1.default);
    });
    it("direction should be 1", () => {
        expect(game.direction).toBe(1);
    });
    it("there should be one card in cardDeposit", () => {
        expect(game.cardDeposit.length).toBe(1);
    });
    it("each player should have 7 cards in his hand", () => {
        for (var player of players)
            expect(player.hand).toHaveLength(7);
    });
});
describe("createDrawStack", () => {
    let players = [new real_1.default("1"), new real_1.default("2"), new real_1.default("3")];
    let game = new classicUn_1.default(players);
    let drawStack = game.createDrawStack();
    it("should get a list of length 76", () => {
        expect(drawStack).toHaveLength(108);
    });
    it("drawStack should contain, for each color, 1 card '0' and 2 cards of numbers '1' to '9'", () => {
        let colors = ["red", "green", "blue", "yellow"];
        // drawStack.pop(); // test should fail : one card less (yellow 9)
        for (let i = 0; i < 4; i++) {
            expect(drawStack.filter((card) => card instanceof numerotedCard_1.default &&
                card.color === colors[i] &&
                card.number === 0)).toHaveLength(1);
            for (let j = 1; j < 10; j++) {
                expect(drawStack.filter((card) => card instanceof numerotedCard_1.default &&
                    card.color === colors[i] &&
                    card.number === j)).toHaveLength(2);
            }
        }
    });
});
describe("checkCardDeposit", () => {
    let players = [new real_1.default("1"), new real_1.default("2"), new real_1.default("3")];
    let game = new classicUn_1.default(players);
    it("should return the top card in the card deposit stack", () => {
        let topCard = game["cardDeposit"][0];
        let result = game.checkCardDeposit();
        expect(result).toBe(topCard);
    });
});
describe("cardDistribution", () => {
    let players = [new real_1.default("1"), new real_1.default("2"), new real_1.default("3")];
    let game = new classicUn_1.default(players);
    let nbCardsBeforeDistribution = game.createDrawStack().length;
    it("there should be (7 * number of players + 1) fewer cards in drawStack", () => {
        let nbCardsAfterDistributionExpected = nbCardsBeforeDistribution - (7 * players.length + 1);
        expect(game.drawStack.length).toBe(nbCardsAfterDistributionExpected);
    });
});
describe("shuffle", () => {
    let players = [new real_1.default("1"), new real_1.default("2"), new real_1.default("3")];
    let game = new classicUn_1.default(players);
    let cards = game.createDrawStack();
    let cards2 = game.createDrawStack();
    game_1.default.shuffle(cards);
    it("cards2 should have the same values as cards", () => {
        let index;
        let sameVal = true;
        for (let card of cards) {
            index = cards2.findIndex((card2) => JSON.stringify(card) === JSON.stringify(card2));
            if (index === -1) {
                sameVal = false;
                break;
            }
        }
        expect(sameVal).toBeTruthy();
    });
    it("cards and cards2 should not be in the same order", () => {
        let sameOrder = true;
        for (let i = 0; i < cards.length; i++) {
            // console.log(cards[i].getColor() + " " + (cards[i] as NumerotedCard).getNumber());
            // console.log(cards2[i].getColor() + " " + (cards2[i] as NumerotedCard).getNumber());
            if (JSON.stringify(cards[i]) !== JSON.stringify(cards2[i])) {
                console.log(i);
                sameOrder = false;
                break;
            }
        }
        expect(sameOrder).toBeFalsy();
    });
});
