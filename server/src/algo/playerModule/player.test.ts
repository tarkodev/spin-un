import Real from "./real";
import IA from "./ia";
import NumerotedCard from "../cardModule/numerotedCard";
import ClassicUn from "../gameModule/classicUn";

describe("drawCard", () => {

    it("should return error message", () => {
        const player = new Real("1");
        expect(() => player.drawCard([], [])).toThrowError("Le dépot de carte est vide");
    });

    it("", () => {
        // Arrange
        const players = [new Real("1"), new Real("2"), new Real("3")];
        const game = new ClassicUn(players);

        // console.log(game.drawStack.length); // 86
        // console.log(game.cardDeposit.length); // 1

        // put the cards of the drawStack to the cardDeposit
        for(let i = 0; i < 86; i++) { // there are 86 cards in drawStack
            game.cardDeposit.unshift(game.drawStack.shift());
        }
        // console.log(game.drawStack.length); // 0 
        // console.log(game.cardDeposit.length); // 87

        // Act
        players[0].drawCard(game.drawStack, game.cardDeposit);
        console.log(game.drawStack.length); // 0 
        console.log(game.cardDeposit.length); // 85
        // Assert
        expect(game.cardDeposit).toHaveLength(1);
        expect(players[0].hand).toHaveLength(8);
        expect(game.drawStack).toHaveLength(85);
        for(let c of game.drawStack) {
            expect(c.loginPlayer).toBeNull;
            expect(c.effectToApply).toBeTruthy;
        }
    });

    it("", () => {
        const players = [new Real("1"), new Real("2"), new Real("3")];
        const game = new ClassicUn(players);
        const nbCardsInDrawStack = game.drawStack.length;
        const nbCardsInPlayersHandBeforeDrawing = players[0].hand.length;
        players[0].drawCard(game.drawStack, game.cardDeposit);
        expect(players[0].hand).toHaveLength(nbCardsInPlayersHandBeforeDrawing+1);
        expect(game.drawStack).toHaveLength(nbCardsInDrawStack-1);
    });
});

describe("NumerotedCard", () => {
    it("should throw an error if number higher than 9", () => {
        expect(() => new NumerotedCard("red", 10)).toThrowError("Invalid number. Number must be between 0 and 9");
    });

    it("should throw an error if number lower than 0", () => {
        expect(() => new NumerotedCard("red", -1)).toThrowError("Invalid number. Number must be between 0 and 9");
    });

    it("should throw an error if color is invalid", () => {
        expect(() => new NumerotedCard("purple", 5)).toThrowError("Invalid color. Valid colors are: red, blue, green, yellow");
    });

    it("should display color and number", () => {
        const numberOfRuns = 10;

        for (let i = 0; i < numberOfRuns; i++) {
            const randomColor = ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]; //random color between accepted colors
            const randomNumber = Math.floor(Math.random() * 10); //random number between 0 and 10

            const card = new NumerotedCard(randomColor, randomNumber);

            expect(card.displayInfo()).toEqual(`Numeroted card: \nColor : ${randomColor} \nNumber : ${randomNumber} \nPoints : ${randomNumber} \nVisible: false \nLogin player : null`);
        }
    });

    it("should correctly get and set visibility", () => {
        const card = new NumerotedCard("red", 5);
        expect(card.isVisible).toEqual(false);

        card.isVisible = true ;
        expect(card.isVisible).toEqual(true);
    });

    it("should correctly get and set login player", () => {
        const card = new NumerotedCard("red", 5);
        expect(card.loginPlayer).toEqual(null);

        card.loginPlayer = "player1" ;
        expect(card.loginPlayer).toEqual("player1");
    });

    it("should correctly get color", () => {
        const card = new NumerotedCard("red", 5);
        expect(card.color).toEqual("red");
    });

    it("should correctly get number", () => {
        const card = new NumerotedCard("red", 5);
        expect(card.number).toEqual(5);
    });

    it("should correctly get points", () => {
        const card = new NumerotedCard("red", 5);
        expect(card.points).toEqual(5);
    });

    it("should correctly get and set effectToApply", () => {
        const card = new NumerotedCard("green", 5);
        expect(card.effectToApply).toBeTruthy;

        card.effectToApply = false;
        expect(card.effectToApply).toBeFalsy;
    });
});