import AddTwo from "./addTwo";
import NumerotedCard from "./numerotedCard";
import Skip from "./skip";
import TurnDirection from "./turnDirection";
import Spin from "./spin";
import Joker from "./joker";
import SuperJoker from "./superJoker";

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


describe("Spin", () => {
    it("should correctly display spin card infos", () => {
        const card = new Spin("green", 4);
        expect(card.displayInfo()).toBe(`Spin card: \nColor : green \nNumber : 4 \nPoints : 4 \nVisible: false \nLogin player : null`);
    });
});


describe("Skip", () => {
    const card = new Skip("blue");

    it("should correctly get points", () => {
        expect(card.points).toEqual(20);
    });

    it("should correctly display skip card infos", () => {
        expect(card.displayInfo()).toBe(`Skip card: \nColor : blue \nNumber : 10 \nPoints : 20 \nVisible: false \nLogin player : null`);
    });    
});


describe("AddTwo", () => {
    const card = new AddTwo("green");

    it("should correctly get points", () => {
        expect(card.points).toEqual(20);
    });

    it("should correctly display addTwo card infos", () => {
        expect(card.displayInfo()).toBe(`AddTwo card: \nColor : green \nNumber : 12 \nPoints : 20 \nVisible: false \nLogin player : null`);
    });
});


describe("TurnDirection", () => {
    const card = new TurnDirection("green");
    it("should correctly get points", () => {
        expect(card.points).toEqual(20);
    });

    it("should correctly display turnDirection card infos", () => {
        expect(card.displayInfo()).toBe(`TurnDirection card: \nColor : green \nNumber : 11 \nPoints : 20 \nVisible: false \nLogin player : null`);
    });
});


describe("Joker", () => {
    it("should correctly get points", () => {
        const card = new Joker();
        expect(card.points).toEqual(50);
    });

    it("should correctly get and set chosenColor", () => {
        const card = new Joker();
        expect(card.chosenColor).toBe("black");

        card.chosenColor = "green";
        expect(card.chosenColor).toBe("green");
    });

    it("should correctly display joker card infos", () => {
        const card = new Joker();
        expect(card.displayInfo()).toBe(`Joker card: \nColor : black \nNumber : 13 \nPoints : 50 \nVisible: false \nLogin player : null \nChosenColor : black`);
    });
});

describe("SuperJoker", () => {
    const card = new SuperJoker();

    it("should correctly get points", () => {
        expect(card.points).toEqual(50);
    });

    it("should correctly display superJoker card infos", () => {
        expect(card.displayInfo()).toBe(`SuperJoker card: \nColor : black \nNumber : 14 \nPoints : 50 \nVisible: false \nLogin player : null \nChosenColor : black`);
    });
});