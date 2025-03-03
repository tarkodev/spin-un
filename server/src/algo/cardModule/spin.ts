import NumerotedCard from "./numerotedCard";


class Spin extends NumerotedCard{
    constructor(color: string, number : number) {
        super(color, number); // Calls the constructor of the superclass (Card)
        this._isSpin= true
    }

    displayInfo(): string {
        return `Spin card: \nColor : ${this.color} \nNumber : ${this.number} \nPoints : ${this.points} \nVisible: ${this.isVisible} \nLogin player : ${this.loginPlayer}`;
    }

}

export default Spin;
