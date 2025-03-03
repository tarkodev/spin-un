import NumerotedCard from "../cardModule/numerotedCard";
import Spin from "../cardModule/spin";
import Skip from "../cardModule/skip";
import TurnDirection from "../cardModule/turnDirection";
import AddTwo from "../cardModule/addTwo";
import Joker from "../cardModule/joker";
import SuperJoker from "../cardModule/superJoker";
import ClassicUn from "./classicUn";
import SpinUn from "./spinUn";
import Game from "./game"; // for Game.shuffle() use
import Real from "../playerModule/real";
import IA from "../playerModule/ia";

describe("ClassicUn", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);

    it("should get an instance of ClassicUn", () => {
        expect(game).toBeInstanceOf(ClassicUn);
    });

    it("direction should be clockwise (direction == 1)", () => {
        expect(game.direction).toBe(1);
    });

    it("there should be one card in cardDeposit", () => {
        expect(game.cardDeposit.length).toBe(1);
    });

    it("each player should have 7 cards in his hand", () => {
        for (var player of players) expect(player.hand).toHaveLength(7);
    });
});

describe("createDrawStack", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);
    let drawStack = game.createDrawStack();
    let colors = ["red", "green", "blue", "yellow"];

    it("should get a list of length 108", () => {
        expect(drawStack).toHaveLength(108);
    });

    it("drawStack should contain, for each color, 1 card '0' and 2 cards of numbers '1' to '9'", () => {
        // drawStack.pop(); // test should fail : one card less (yellow 9)
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) =>
                        card instanceof NumerotedCard &&
                        card.color === colors[i] &&
                        card.number === 0,
                ),
            ).toHaveLength(1);
            for (let j = 1; j < 10; j++) {
                expect(
                    drawStack.filter(
                        (card) =>
                            card instanceof NumerotedCard &&
                            card.color === colors[i] &&
                            card.number === j,
                    ),
                ).toHaveLength(2);
            }
        }
    });

    it("drawStack should contain, for each color, 2 cards skip", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof Skip && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, for each color, 2 cards turnDirection", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof TurnDirection && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, for each color, 2 cards addTwo", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof AddTwo && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, 4 joker", () => {
            expect(
                drawStack.filter(
                    (card) => card instanceof Joker && 
                    !(card instanceof SuperJoker) && 
                    card.color === "black"
                )
            ).toHaveLength(4);
    });

    it("drawStack should contain, 4 superJoker", () => {
            expect(
                drawStack.filter(
                    (card) => card instanceof SuperJoker && card.color === "black"
                )
            ).toHaveLength(4);
    });
});

describe("checkCardDeposit", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);

    it("should return the top card in the card deposit stack", () => {
        let topCard = game["cardDeposit"][0];
        let result = game.checkCardDeposit();
        expect(result).toBe(topCard);
    });
});

describe("cardDistribution", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);

    let nbCardsBeforeDistribution = game.createDrawStack().length;

    it("there should be (7 * number of players + 1) fewer cards in drawStack", () => {
        let nbCardsAfterDistributionExpected =
            nbCardsBeforeDistribution - (7 * players.length + 1);
        expect(game.drawStack.length).toBe(nbCardsAfterDistributionExpected);
    });
});

describe("shuffle", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);
    let cards = game.createDrawStack();
    let cards2 = game.createDrawStack();
    Game.shuffle(cards);

    it("cards2 should have the same values as cards", () => {
        let index: number;
        let sameVal = true;
        for (let card of cards) {
            index = cards2.findIndex(
                (card2) => JSON.stringify(card) === JSON.stringify(card2),
            );
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

describe("turnDirection", () => {
    let players = [new Real("1"), new Real("2"), new IA("3")];
    let game = new ClassicUn(players);

    game.turnDirection();
    
    it("direction should be now counter-clockwise (direction == -1)", () => {
        expect(game.direction).toBe(-1);
    });
});

describe("endRound()", () => {
    it("Each player has at least one card in his hand: the round should not be over ", () => {
        let players = [new Real("1"), new Real("2"), new IA("3")];
        let game = new ClassicUn(players);
        expect(game.isEndRound()).toBeFalsy();
    });
    
    it("First player has no card in his hand: the round should be over ", () => {
        let players = [new Real("1"), new Real("2"), new IA("3")];
        let game = new ClassicUn(players);
        for(let i = 0; i<7; i++)
            players[0].hand.pop();       
        expect(game.isEndRound()).toBeTruthy();
    });
});


describe("SpinUn", () => {
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new SpinUn(players);
    let drawStack = game.createDrawStack();
    let colors = ["red", "green", "blue", "yellow"];

    it("should get a list of length 108", () => {
        expect(drawStack).toHaveLength(108);
    });

    it("drawStack should contain, for each color, 1 NumerotedCard '0'", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) =>
                        card instanceof NumerotedCard &&
                        card.color === colors[i] &&
                        card.number === 0,
                ),
            ).toHaveLength(1);
        }
    });

    it("drawStack should contain, for each color, 2 numerotedCards '1' to '9'", () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 10; j++) {
                expect(
                    drawStack.filter(
                        (card) =>
                            card instanceof NumerotedCard &&
                            card.color === colors[i] &&
                            card.number === j,
                    ),
                ).toHaveLength(2);
            }
        }
    });

    it("drawStack should contain, for each color, 1 spinCard '1' to '5'", () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j <= 5; j++) {
                expect(
                    drawStack.filter(
                        (card) =>
                            card instanceof Spin &&
                            card.color === colors[i] &&
                            card.number === j,
                    ),
                ).toHaveLength(1);
            }
        }
    });

    it("drawStack should contain, for each color, 2 cards skip", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof Skip && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, for each color, 2 cards turnDirection", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof TurnDirection && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, for each color, 2 cards addTwo", () => {
        for (let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(
                    (card) => card instanceof AddTwo && card.color === colors[i]
                )
            ).toHaveLength(2);
        }
    });

    it("drawStack should contain, 4 joker", () => {
            expect(
                drawStack.filter(
                    (card) => card instanceof Joker &&
                    !(card instanceof SuperJoker) &&
                    card.color === "black"
                )
            ).toHaveLength(4);
    });

    it("drawStack should contain, 4 superJoker", () => {
            expect(
                drawStack.filter(
                    (card) => card instanceof SuperJoker && card.color === "black"
                )
            ).toHaveLength(4);
    });
});

describe("endRound", () => {
    it("Should set the winner's points to the sum of the points of the other players' cards.", () => {
        // Arrange
        const players = [new Real("1"), new Real("2"), new Real("3")];
        const game = new ClassicUn(players); // creating a new game, each player has 7 cards in his hand
        
        // removing cards of one player to simulate a "winner"
        const winner = players[2];
        for(let i = 0; i<7; i++)
            winner.hand.pop();

        // computing the points the winner should get
        let expectedPoints = 0;
        for(let player of players) // each player...
            if(player !== winner) // ...except the "winner"
                for(let card of player.hand)
                    expectedPoints += card.points;
        
        // Act
        game.endRound() // Tested method
        
        // Assert

        // Verify that the points of the winning player have been updated correctly
        expect(winner.points).toBe(expectedPoints);

        // Verify that the points of the other players have not changed
        for(let player of players) // each player...
            if(player !== winner) // ...except the "winner"
                expect(player.points).toBe(0); // Ensure that the other players have no points
            
    });
});