"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("./room"));
const numerotedCard_1 = __importDefault(require("../cardModule/numerotedCard"));
const addTwo_1 = __importDefault(require("../cardModule/addTwo"));
const turnDirection_1 = __importDefault(require("../cardModule/turnDirection"));
const skip_1 = __importDefault(require("../cardModule/skip"));
const joker_1 = __importDefault(require("../cardModule/joker"));
const verification_instance_1 = require("./deroulement/verification_instance");
const ia_1 = __importDefault(require("../playerModule/ia"));
const deroulement_1 = require("./deroulement/deroulement");
class GameReseau {
    constructor(modeGame, pointsNumber, nbMaxPlayers, playerList) {
        this.room = new room_1.default(modeGame, pointsNumber, nbMaxPlayers);
        this.room.playersList = playerList;
        this.room.gameStart();
    }
    /* Si la carte c est posable sur le haut du dépot alors la fonction retourne true */
    playableCard(c) {
        let cOnTopCardDeposit = this.room.game.cardDeposit[0];
        return ((cOnTopCardDeposit instanceof numerotedCard_1.default &&
            c instanceof numerotedCard_1.default &&
            (cOnTopCardDeposit.number === c.number)) ||
            (cOnTopCardDeposit.color === c.color) ||
            (cOnTopCardDeposit instanceof addTwo_1.default && c instanceof addTwo_1.default) ||
            (cOnTopCardDeposit instanceof turnDirection_1.default && c instanceof turnDirection_1.default) ||
            (cOnTopCardDeposit instanceof skip_1.default && c instanceof skip_1.default) ||
            (c instanceof joker_1.default) ||
            (cOnTopCardDeposit instanceof joker_1.default && cOnTopCardDeposit.chosenColor === c.color));
    }
    /*Si c'est au tour de l'IA alors l'IA joue */
    isItIAToPlay() {
        if (this.room.playersList[this.room.whosTurn] instanceof ia_1.default) {
            (0, verification_instance_1.turnIA)(this.room.playersList[this.room.whosTurn], this.room.game.cardDeposit, this.room.game.drawStack);
            return true;
        }
        else
            return false;
    }
    /* p va essayer de jouer une carte et on renvoie un statut pour voir si on a réussi a la jouer ou non */
    playCardReseau(p, indexCard) {
        let c = p.hand[indexCard];
        let s = { succes: false, information: "" };
        if (this.room.playersList[this.room.whosTurn].login === p.login) {
            if (0 > indexCard || indexCard >= p.hand.length) {
                s.information = "Index invalide";
            }
            if (this.playableCard(c)) {
                s = p.playCard(c, this.room.game.cardDeposit);
            }
        }
        else {
            s.information = "Ce n'est pas à toi de jouer";
        }
        return s;
    }
    /* p va essayer de piocher et si il a le droit il pioche et on renvoie true */
    drawCardReseau(p) {
        let s = { succes: false, information: "" };
        if (this.room.playersList[this.room.whosTurn].login === p.login) {
            p.drawCard(this.room.game.drawStack, this.room.game.drawStack);
            s.information = "Carte piochée";
            s.succes = true;
        }
        else {
            s.information = "Ce n'est pas à toi de jouer";
        }
        return s;
    }
    /* Si la manche est terminée on passe à la suivante et on revoie true et si la partie est finie on revoie une info en + */
    changeRound() {
        this.room.nextRound();
    }
    /* Retourne true et le nom du gagnant si le round est fini */
    isRoundFinished() {
        let s = { succes: false, information: "Le round n'est pas fini" };
        if (this.room.game.isEndRound()) {
            s.succes = true;
            for (let p of this.room.playersList) {
                if (p.hand.length === 0) {
                    s.information = p.login;
                }
            }
        }
        return s;
    }
    isGameFinished() {
        let s = { succes: false, information: "La partie n'est pas finie" };
        if (this.room.isEnd()) {
            s.succes = true;
            for (let p of this.room.playersList) {
                if (p.hand.length === 0) {
                    s.information = p.login;
                }
            }
        }
        return s;
    }
    /* Si la derniere carte jouée est une carte spéciale, applique l'effet de la carte s'il n'a pas déjà été appliqué */
    checkEffectOfTopOfDeposit() {
        this.room.checkEffectOfTopOfDeposit();
    }
    /*Pour changer le tour*/
    changeTurnPlayer() {
        (0, deroulement_1.changeTurnPlayer)(this.room);
    }
}
exports.default = GameReseau;
/* Début : commencer la partie en donnant une liste de joueur le nombre de joueurs max, le mode de partie (Classic ou Spin) et le nombre de points pour gagner

Déroulement d'un tour : s
Si isItAIToPLay() === false :
    Attente du choix du joueur avec playCardReseau()
Sinon
    Passer a la suite l'IA a joué
Check des cartes spéciales sur le dessus avec room.checkEffectOfTopOfDeposit()
Pour changer le tour du joueur : changeTurnPlayer()
Vérifier si une manche est finie : On lance ifRoundFinished() et il renvoie true si le round et fini et le login du joueur qui a gagné le round
Vérifier si la partie est finie : On lance ifGameFinished() et il renvoie true si la partie est finie et le login du joueur qui a gagné la partie
Pour passer au round suivant changeRound()
*/
