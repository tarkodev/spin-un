import ClassicUn from "./classicUn";
import NumerotedCard from "../cardModule/numerotedCard";
import Real from "../playerModule/Hadi/real_hadi";
import Game from "./game"; // for Game.shuffle() use

describe("ClassicUn", () => {
    
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);
    
    it("should get an instance of ClassicUn", () => {
        expect(game).toBeInstanceOf(ClassicUn);
    });

    it("direction should be 1", () => {
            expect(game.getDirection()).toBe(1);
    });

    it("numberRound should be > 0", () => {
        expect(game.getNumberRound()).toBeGreaterThan(0);
    });

    it("there should be one card in cardDeposit", () => {
        expect(game.getCardDeposit().length).toBe(1);
    });

    it("each player should have 7 cards in his hand", ()=> {
        for(var player of players)
            expect(player.hand).toHaveLength(7);
    });
});

describe("createDrawStack", () => {
    
    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);
    let drawStack = game.createDrawStack();

    it("should get a list of length 76", () => {
        expect(drawStack).toHaveLength(76);
    });

    it("drawStack should contain, for each color, 1 card '0' and 2 cards of numbers '1' to '9'", () => {
        let colors = ["red", "green", "blue", "yellow"];
        // drawStack.pop(); // test should fail : one card less (yellow 9)
        for(let i = 0; i < 4; i++) {
            expect(
                drawStack.filter(card => 
                    card instanceof NumerotedCard && 
                    card.getColor()===colors[i] && 
                    card.getNumber()===0
                )
            ).toHaveLength(1);
            for(let j = 1; j < 10; j++) {
                expect(
                    drawStack.filter(card => 
                        card instanceof NumerotedCard &&
                        card.getColor()===colors[i] &&
                        card.getNumber()===j
                    )
                ).toHaveLength(2);
            }
        }
    });
});

describe("checkCardDeposit", () => {

    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);

    it("should return the top card in the card deposit stack", ()=> {
        let topCard = game['cardDeposit'][0];
        let result = game.checkCardDeposit();
        expect(result).toBe(topCard);
    });
});

describe("cardDistribution", () => {

    let players = [new Real("1"), new Real("2"), new Real("3")];
    let game = new ClassicUn(players);
    
    let nbCardsBeforeDistribution = game.createDrawStack().length;

    it("there should be (7 * number of players + 1) fewer cards in drawStack", () => {
        let nbCardsAfterDistributionExpected = nbCardsBeforeDistribution - (7 * players.length + 1);
        expect(game.getDrawStack().length).toBe(nbCardsAfterDistributionExpected);
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
        for(let card of cards) {
            index = cards2.findIndex(card2 => JSON.stringify(card)===JSON.stringify(card2));
            if(index === -1) {
                sameVal = false;
                break;
            }
        }
        expect(sameVal).toBeTruthy();
    });

    it("cards and cards2 should not be in the same order", () => {
        let sameOrder = true;
        for(let i = 0; i < cards.length; i++) {    
            // console.log(cards[i].getColor() + " " + (cards[i] as NumerotedCard).getNumber());
            // console.log(cards2[i].getColor() + " " + (cards2[i] as NumerotedCard).getNumber());
            if( JSON.stringify(cards[i]) !== JSON.stringify(cards2[i]) )
            {
                console.log(i);
                sameOrder = false;
                break;
            } 
        }
        expect(sameOrder).toBeFalsy();
    });
    
});
