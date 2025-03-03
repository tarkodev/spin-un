import Game from "./game";
import NumerotedCard from "../cardModule/numerotedCard";
import Card from "../cardModule/card";
import Player from "../playerModule/player";
import Spin from "../cardModule/spin";
import Skip from "../cardModule/skip";
import TurnDirection from "../cardModule/turnDirection";
import AddTwo from "../cardModule/addTwo";
import Joker from "../cardModule/joker";
import SuperJoker from "../cardModule/superJoker";


/* Enum représentant les différents défis de la roue */
export enum SpinUnChallengeWheel {
    ALMOSTUN,
    DISCARDNUMBER,
    DISCARDCOLOR,
    DRAWRED,
    DRAWBLUE,
    TRADEHANDS,
    SHOWHAND,
    WAR,
    UNSPIN,
  }

export default class SpinUn extends Game {
    
    public wheel: number[];

    constructor(players: Player[]) {
        super(players);
        this.wheel = [SpinUnChallengeWheel.ALMOSTUN, SpinUnChallengeWheel.DISCARDNUMBER, SpinUnChallengeWheel.DISCARDCOLOR,
                      SpinUnChallengeWheel.DRAWRED, SpinUnChallengeWheel.DRAWBLUE, SpinUnChallengeWheel.TRADEHANDS,
                      SpinUnChallengeWheel.WAR, SpinUnChallengeWheel.UNSPIN];
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


            for (let j = 1; j <= 5; j++) {
                drawStack.push(new Spin(colors[i], j));
                drawStack.push(new NumerotedCard(colors[i], j));
            }

            for (let j=6; j< 10; j++){
                drawStack.push(new NumerotedCard(colors[i], j));
                drawStack.push(new NumerotedCard(colors[i], j));
            }

        }
        Game.shuffle(drawStack);
        return drawStack;
    }

}