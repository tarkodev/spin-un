import Player from "../playerModule/player";
import IA from "../playerModule/ia";
import Game from "../gameModule/game";
import ClassicUn from "../gameModule/classicUn";
import SpinUn from "../gameModule/spinUn";
import * as readlineSync from "readline-sync";
import Joker from "../cardModule/joker";
import Real from "../playerModule/real";
import SuperJoker from "../cardModule/superJoker";
import TurnDirection from "../cardModule/turnDirection";
import NumerotedCard from "../cardModule/numerotedCard"
import Skip from "../cardModule/skip";
import AddTwo from "../cardModule/addTwo"
import Spin from "../cardModule/spin"



export enum Mode {
    classic = 0,
    spin = 1
}

export default class Room {
    private _idRoom: number;
    private _playersList: Player[];
    private _game: Game | null;
    private _isPrivate: boolean;
    private _keyRoom?: string;
    private _modeGame: Mode;
    private _pointsNumber: number;
    private _nbMaxPlayers: number;
    private _whosTurn: number;
    private _numberRound: number;
    private _isFinished : boolean;
    private _isBlocked : boolean;
    private static ID_COUNT: number = 0;

    constructor(modeGame: Mode, pointsNumber: number, nbMaxPlayers: number) {
        this._idRoom = Room.ID_COUNT;
        if (modeGame !== Mode.classic && modeGame !== Mode.spin) {
            throw new Error("Invalid modeGame value. Expected Mode.classic (0) or Mode.spin (1).");
        }
        this._modeGame = modeGame;
        this._pointsNumber = pointsNumber;
        this._nbMaxPlayers = nbMaxPlayers;
        this._playersList = [];
        this._isPrivate = false;
        this._whosTurn = 0;
        this._game = null;
        this._numberRound = 1;
        this._isFinished = false;
        this._isBlocked = false;
        Room.ID_COUNT++;
    }

    public get isFinished() : boolean{
        return this._isFinished;
    }
    
    public set isFinished(b : boolean){
        this._isFinished = b;
    }

    public get idRoom(): number {
        return this._idRoom;
    }

    public get playersList(): Player[] {
        return this._playersList;
    }

    public set playersList(playersList: Player[]) {
        this._playersList = playersList;
    }

    public get game(): Game {
        if (this._game != null) return this._game;
        else throw new Error("There is no game in this room");
    }

    public set game(game: Game) {
        this._game = game;
    }

    public get isPrivate(): boolean {
        return this._isPrivate;
    }

    public set isPrivate(isPrivate: boolean) {
        this._isPrivate = isPrivate;
    }

    public get keyRoom(): string | undefined {
        return this._keyRoom;
    }

    public set keyRoom(keyRoom: string | undefined) {
        this._keyRoom = keyRoom;
    }

    public get modeGame(): Mode {
        return this._modeGame;
    }

    public set modeGame(modeGame: Mode) {
        this._modeGame = modeGame;
    }

    public get pointsNumber(): number {
        return this._pointsNumber;
    }

    public set pointsNumber(pointsNumber: number) {
        this._pointsNumber = pointsNumber;
    }

    public get nbMaxPlayers(): number {
        return this._nbMaxPlayers;
    }

    public set nbMaxPlayers(nbMaxPlayers: number) {
        this._nbMaxPlayers = nbMaxPlayers;
    }

    public get whosTurn(): number {
        return this._whosTurn;
    }

    public set whosTurn(whosTurn: number) {
        this._whosTurn = whosTurn;
    }

    public get numberRound() {
        return this._numberRound;
    }

    public set numberRound(r: number) {
        this._numberRound = r;
    }

    
    public get isBlocked() {
        return this._isBlocked;
    }

    public set isBlocked(b: boolean){
        this._isBlocked = b;
    }

    public nextRound() {
        this._numberRound++;
        this.gameStart();
    }

    public async waitingPlayers(): Promise<void> {
        const maxDelay = 120000; // 120 secondes en millisecondes
        // Promesse qui attend le délai de 120 secondes
        const delayPromise = new Promise<void>((resolve) =>
            setTimeout(resolve, maxDelay),
        );
        // Promesse qui attend une action du joueur
        const playerActionPromise = new Promise<void>((resolve, reject) => {
            // La logique pour surveiller l'action du joueur.
            // Ex : si vous attendez un clic sur un bouton :
            // document.getElementById("monBouton").addEventListener("click", () => resolve());
            // Pour l'exemple, je vais simuler une attente d'action en utilisant setTimeout :
            setTimeout(() => {
                // Simuler ici la vérification de l'action du joueur
                const actionDone = true;
                if (actionDone) {
                    resolve();
                } else {
                    reject("Le joueur n'a pas effectué d'action.");
                }
            }, 0);
        });

        // Attendre soit le délai de 120 secondes, soit l'action du joueur
        return Promise.race([delayPromise, playerActionPromise])
            .then(() => {
                // Le joueur a appuyé sur le bouton ou le délai est écoulé
                while (this.playersList.length < this.nbMaxPlayers) {
                    this.playersList.push(new IA());
                }
                //Début de la partie !
                this.gameStart();
            })
            .catch((error) => {
                console.error("Error happened :", error);
            });
    }

    public gameStart(): void {
        while (this.playersList.length < this.nbMaxPlayers) {
            let nam = Math.floor(Math.random() * 2920);
            this.playersList[this.playersList.length] = new IA("Bot " + nam);
        }
        // According to the Room constructor, modeGame = 0 (Mode.classic) or 1 (Mode.spin)
        if (this.modeGame == Mode.classic) {
            this.game = new ClassicUn(this.playersList);
        }
        else {
            this.game = new SpinUn(this.playersList);
        }
    }

    public isEnd(): boolean {
        // Vérifier si une partie est terminée ou non
        for (const player of this.playersList) {
            if (player.points >= this.pointsNumber) {
                player.isWinner = true;
                this._isFinished = true;
                return true; // La partie est terminée si un joueur a atteint ou dépassé le nombre de points requis
            }
        }
        return false; // La partie n'est pas terminée si aucun joueur n'a atteint le nombre de points requis
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /*        PARTIE CONCERNANT LES EFFETS DES CARTES                                                */
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    public checkEffectOfTopOfDeposit(color: string): void {
        let c = this.game.cardDeposit[0];
        if(!(c instanceof NumerotedCard) || (c instanceof Spin)) {
            if(c.effectToApply === true) {
                c.effectToApply = false
                
                switch(true) {
                    case c instanceof TurnDirection: {
                        this.changeDirection();
                        break;
                    }
                    case c instanceof Skip: {
                        this.skipNextPlayer();
                        break;
                    }
                    case c instanceof Joker: {
                        this.questionJokerColor(color);
                        if(c instanceof SuperJoker){
                            //Ajouter la possibilité de challenge
                            this.addTwoOrFourCards(4);
                        }
                        break;
                    }
                    case c instanceof AddTwo: {
                        this.addTwoOrFourCards(2);
                        break;
                    }
                    case c instanceof Spin: {
                        this.wheelToTurn();
                    }
                    default: 
                    break;
                }
            }
        }
    }

    public wheelToTurn(){
        this._isBlocked = true;
    }

    //fonction rajoutée par seb
    public checkEffectOfTopOfDepositJokerOrSuperJoker(color: string) : void {
        console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        let c = this.game.cardDeposit[0];
        if(!(c instanceof NumerotedCard)) {
            if(c.effectToApply === true) {
                //c.effectToApply = false
                if(c instanceof Joker) {
                    this.questionJokerColor(color);
                    if(c instanceof SuperJoker){
                        //Ajouter la possibilité de challenge
                        this.addTwoOrFourCards(4);
                    }
                }
            }
        }
    }

    //fonction rajoutée par seb
    public checkIfJokerOrSuperJoker(): boolean {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        let c = this.game.cardDeposit[0];
        if(!(c instanceof NumerotedCard)) {
            console.log("pupupupute")
            if(c.effectToApply === true) {
                console.log("pupupupute ta grosse mere")
                if(c instanceof Joker || c instanceof SuperJoker)
                    console.log(c instanceof Joker)
                    return true;
            }
        }
        return false;
    }

    // fonction rajoutée par seb
    public questionJokerColor(color: string) : void {
        let choice = color
        if(this._playersList[this._whosTurn] instanceof Real){
            console.log(this._playersList[this._whosTurn].login)
            console.log(color)
            console.log(color)
            /*choice = readlineSync
            .question("Quelle couleur voulez vous ?")
            .toLowerCase();*/
        }
        else{ //choix de l'ia
            choice = this.getRandomColor(); // choix de la couleur aléatoire 
        }
        /*Fonction appelée uniquement si la carte du dessus est un joker pas encore activé*/
        if (this._game?.cardDeposit[0] instanceof Joker){
            this._game.cardDeposit[0].chosenColor = choice;
        }
    }

    public changeDirection(){
        this._game?.turnDirection();
    }

    public skipNextPlayer(){
        if(this._game)
            this._whosTurn += this._game.direction;
    }

    /* Renvoie aléatoirement une couleur parmi les quatres couleurs du jeu */
    public getRandomColor(): string {
        const colors: string[] = ["red", "green", "blue", "yellow"];
        const randomIndex: number = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    public questionJoker() : void{
        let choice : string
        if(this._playersList[this._whosTurn] instanceof Real){
            console.log(this._playersList[this._whosTurn].login)
            choice = readlineSync
            .question("Quelle couleur voulez vous ?")
            .toLowerCase();
        }
        else{ //choix de l'ia
            choice = this.getRandomColor(); // choix de la couleur aléatoire 
        }
        /*Fonction appelée uniquement si la carte du dessus est un joker pas encore activé*/
        if (this._game?.cardDeposit[0] instanceof Joker){
            this._game.cardDeposit[0].chosenColor = choice;
        }
    }

    /* Renvoie l'indice du prochain joueur dont c'est le tour */
    public nextPlayer(): number {
        return (((this.whosTurn + this.game.direction) % this.playersList.length) + this.playersList.length) % this.playersList.length;
    }

    /* @brief Fait piocher 2 ou 4 cartes au joueur en argument
     * @param p Le joueur qui doit piocher
     * @param numberCards le nombre de cartes à piocher, doit être 2 ou 4 
    */
    public drawTwoOrFourCards(p : Player, numberCards: number){
        if(numberCards !== 2 && numberCards !== 4)
            throw new Error("Nombre de cartes à picoher invalide, doit être 2 ou 4 !");
        for(let i=0; i<numberCards; i++){
            this.game.remakeDrawStackIfNoCardIn();
            if(this._game)
                p.drawCard(this._game.drawStack, this._game.cardDeposit);
            this.game.remakeDrawStackIfNoCardIn();
        }
    }
    
    /* Fait piocher 2 ou 4 cartes au joueur suivant */
    public addTwoOrFourCards(numberCards: number): void {
        let next_player_index = this.nextPlayer();
        this.drawTwoOrFourCards(this.playersList[next_player_index], numberCards);
        this.skipNextPlayer();
    }

    /* Fait piocher 2 cartes au joueur actuel*/
    public addTwoCards(): void {
        this.drawTwoOrFourCards(this.playersList[this.whosTurn], 2);
        this.skipNextPlayer();
    }
}
