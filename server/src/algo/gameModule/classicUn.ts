import Game from "./game";
import NumerotedCard from "../cardModule/numerotedCard";
import Card from "../cardModule/card";
import Player from "../playerModule/player";
import AddTwo from "../cardModule/addTwo";
import TurnDirection from "../cardModule/turnDirection";
import Skip from "../cardModule/skip";
import Joker from "../cardModule/joker";
import SuperJoker from "../cardModule/superJoker";

export default class ClassicUn extends Game {
    constructor(players: Player[]) {
        super(players);
    }

    createDrawStack(): Card[] {
        let drawStack: Card[] = [];
        let colors = ["red", "green", "blue", "yellow"];
            for (let i = 0; i < 4; i++) {
            drawStack.push(new NumerotedCard(colors[i], 0));
            drawStack.push(new Skip(colors[i]));
            drawStack.push(new Skip(colors[i]));
            drawStack.push(new TurnDirection(colors[i]));
            drawStack.push(new TurnDirection(colors[i]));
            drawStack.push(new AddTwo(colors[i]));
            drawStack.push(new AddTwo(colors[i]));
            drawStack.push(new Joker());
            drawStack.push(new SuperJoker());

            for (let j = 1; j < 10; j++) {
                drawStack.push(new NumerotedCard(colors[i], j));
                drawStack.push(new NumerotedCard(colors[i], j));
            }
        }
        Game.shuffle(drawStack);
        return drawStack;
    }
}