"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
const ia_1 = __importDefault(require("../playerModule/ia"));
const classicUn_1 = __importDefault(require("../gameModule/classicUn"));
const spinUn_1 = __importDefault(require("../gameModule/spinUn"));
const readlineSync = __importStar(require("readline-sync"));
const joker_1 = __importDefault(require("../cardModule/joker"));
const real_1 = __importDefault(require("../playerModule/real"));
const superJoker_1 = __importDefault(require("../cardModule/superJoker"));
const turnDirection_1 = __importDefault(require("../cardModule/turnDirection"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const skip_1 = __importDefault(require("../cardModule/skip"));
const addTwo_1 = __importDefault(require("../cardModule/addTwo"));
var Mode;
(function (Mode) {
    Mode[Mode["classic"] = 0] = "classic";
    Mode[Mode["spin"] = 1] = "spin";
})(Mode || (exports.Mode = Mode = {}));
class Room {
    constructor(modeGame, pointsNumber, nbMaxPlayers) {
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
        Room.ID_COUNT++;
    }
    get idRoom() {
        return this._idRoom;
    }
    get playersList() {
        return this._playersList;
    }
    set playersList(playersList) {
        this._playersList = playersList;
    }
    get game() {
        if (this._game != null)
            return this._game;
        else
            throw new Error("There is no game in this room");
    }
    set game(game) {
        this._game = game;
    }
    get isPrivate() {
        return this._isPrivate;
    }
    set isPrivate(isPrivate) {
        this._isPrivate = isPrivate;
    }
    get keyRoom() {
        return this._keyRoom;
    }
    set keyRoom(keyRoom) {
        this._keyRoom = keyRoom;
    }
    get modeGame() {
        return this._modeGame;
    }
    set modeGame(modeGame) {
        this._modeGame = modeGame;
    }
    get pointsNumber() {
        return this._pointsNumber;
    }
    set pointsNumber(pointsNumber) {
        this._pointsNumber = pointsNumber;
    }
    get nbMaxPlayers() {
        return this._nbMaxPlayers;
    }
    set nbMaxPlayers(nbMaxPlayers) {
        this._nbMaxPlayers = nbMaxPlayers;
    }
    get whosTurn() {
        return this._whosTurn;
    }
    set whosTurn(whosTurn) {
        this._whosTurn = whosTurn;
    }
    get numberRound() {
        return this._numberRound;
    }
    set numberRound(r) {
        this._numberRound = r;
    }
    nextRound() {
        this._numberRound++;
        this.gameStart();
    }
    waitingPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxDelay = 120000; // 120 secondes en millisecondes
            // Promesse qui attend le délai de 120 secondes
            const delayPromise = new Promise((resolve) => setTimeout(resolve, maxDelay));
            // Promesse qui attend une action du joueur
            const playerActionPromise = new Promise((resolve, reject) => {
                // La logique pour surveiller l'action du joueur.
                // Ex : si vous attendez un clic sur un bouton :
                // document.getElementById("monBouton").addEventListener("click", () => resolve());
                // Pour l'exemple, je vais simuler une attente d'action en utilisant setTimeout :
                setTimeout(() => {
                    // Simuler ici la vérification de l'action du joueur
                    const actionDone = true;
                    if (actionDone) {
                        resolve();
                    }
                    else {
                        reject("Le joueur n'a pas effectué d'action.");
                    }
                }, 0);
            });
            // Attendre soit le délai de 120 secondes, soit l'action du joueur
            return Promise.race([delayPromise, playerActionPromise])
                .then(() => {
                // Le joueur a appuyé sur le bouton ou le délai est écoulé
                while (this.playersList.length < this.nbMaxPlayers) {
                    this.playersList.push(new ia_1.default());
                }
                //Début de la partie !
                this.gameStart();
            })
                .catch((error) => {
                console.error("Error happened :", error);
            });
        });
    }
    gameStart() {
        while (this.playersList.length < this.nbMaxPlayers) {
            let nam = Math.floor(Math.random() * 2920);
            this.playersList[this.playersList.length] = new ia_1.default("Bot " + nam);
        }
        // According to the Room constructor, modeGame = 0 (Mode.classic) or 1 (Mode.spin)
        if (this.modeGame == Mode.classic) {
            this.game = new classicUn_1.default(this.playersList);
        }
        else {
            this.game = new spinUn_1.default(this.playersList);
        }
    }
    isEnd() {
        // Vérifier si une partie est terminée ou non
        for (const player of this.playersList) {
            if (player.points >= this.pointsNumber) {
                player.isWinner = true;
                return true; // La partie est terminée si un joueur a atteint ou dépassé le nombre de points requis
            }
        }
        return false; // La partie n'est pas terminée si aucun joueur n'a atteint le nombre de points requis
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /*        PARTIE CONCERNANT LES EFFETS DES CARTES                                                */
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    checkEffectOfTopOfDeposit() {
        let c = this.game.cardDeposit[0];
        if (!(c instanceof numerotedCard_1.default)) {
            if (c.effectToApply === true) {
                c.effectToApply = false;
                switch (true) {
                    case c instanceof turnDirection_1.default: {
                        this.changeDirection();
                        break;
                    }
                    case c instanceof skip_1.default: {
                        this.skipNextPlayer();
                        break;
                    }
                    case c instanceof joker_1.default: {
                        this.questionJoker();
                        if (c instanceof superJoker_1.default) {
                            //Ajouter la possibilité de challenge
                            this.addTwoOrFourCards(4);
                        }
                        break;
                    }
                    case c instanceof addTwo_1.default: {
                        this.addTwoOrFourCards(2);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }
    changeDirection() {
        var _a;
        (_a = this._game) === null || _a === void 0 ? void 0 : _a.turnDirection();
    }
    skipNextPlayer() {
        if (this._game)
            this._whosTurn += this._game.direction;
    }
    /* Renvoie aléatoirement une couleur parmi les quatres couleurs du jeu */
    getRandomColor() {
        const colors = ["red", "green", "blue", "yellow"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    questionJoker() {
        var _a;
        let choice;
        if (this._playersList[this._whosTurn] instanceof real_1.default) {
            console.log(this._playersList[this._whosTurn].login);
            choice = readlineSync
                .question("Quelle couleur voulez vous ?")
                .toLowerCase();
        }
        else { //choix de l'ia
            choice = this.getRandomColor(); // choix de la couleur aléatoire 
        }
        /*Fonction appelée uniquement si la carte du dessus est un joker pas encore activé*/
        if (((_a = this._game) === null || _a === void 0 ? void 0 : _a.cardDeposit[0]) instanceof joker_1.default) {
            this._game.cardDeposit[0].chosenColor = choice;
        }
    }
    /* Renvoie l'indice du prochain joueur dont c'est le tour */
    nextPlayer() {
        return (((this.whosTurn + this.game.direction) % this.playersList.length) + this.playersList.length) % this.playersList.length;
        ;
    }
    /* @brief Fait piocher 2 ou 4 cartes au joueur en argument
     * @param p Le joueur qui doit piocher
     * @param numberCards le nombre de cartes à piocher, doit être 2 ou 4
    */
    drawTwoOrFourCards(p, numberCards) {
        if (numberCards !== 2 && numberCards !== 4)
            throw new Error("Nombre de cartes à picoher invalide, doit être 2 ou 4 !");
        for (let i = 0; i < numberCards; i++) {
            this.game.remakeDrawStackIfNoCardIn();
            if (this._game)
                p.drawCard(this._game.drawStack, this._game.cardDeposit);
            this.game.remakeDrawStackIfNoCardIn();
        }
    }
    /* Fait piocher 2 ou 4 cartes au joueur suivant */
    addTwoOrFourCards(numberCards) {
        let next_player_index = this.nextPlayer();
        this.drawTwoOrFourCards(this.playersList[next_player_index], numberCards);
        this.skipNextPlayer();
    }
}
Room.ID_COUNT = 0;
exports.default = Room;
