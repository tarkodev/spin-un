import Room, { Mode } from './room';
import Card from '../cardModule/card';
import NumerotedCard from '../cardModule/numerotedCard';
import AddTwo from '../cardModule/addTwo';
import TurnDirection from '../cardModule/turnDirection';
import Skip from '../cardModule/skip';
import Joker from '../cardModule/joker';
import { turnIA } from './deroulement/verification_instance';
import IA from '../playerModule/ia';
import { changeTurnPlayer } from './deroulement/deroulement';
import Spin from '../cardModule/spin';
import SpinUn from '../gameModule/spinUn';
import Player from '../playerModule/player';
import Real from '../playerModule/real';

export type Status = {
  information: String;
  succes: boolean;
};

export default class GameReseau {
  room: Room;
  roundWinner: String;
  protected _wheelEffect: number;
  isRealToPlay : boolean;

  constructor(
    modeGame: Mode,
    pointsNumber: number,
    nbMaxPlayers: number,
    playerList: Player[],
  ) {
    this.room = new Room(modeGame, pointsNumber, nbMaxPlayers);
    this.room.playersList = playerList;
    this.room.gameStart();
  }

  public set wheelEffect(n: number) {
    this._wheelEffect = n;
  }

  public get wheelEffect(): number {
    return this._wheelEffect;
  }


  public updateisRealToPlay(){
    if(this.room.playersList[this.room.whosTurn] instanceof Real){
      this.isRealToPlay = true;
    }
    else this.isRealToPlay = false;
  }

  /* Si la carte c est posable sur le haut du dépot alors la fonction retourne true */
  public playableCard(c: Card): boolean {
    let cOnTopCardDeposit = this.room.game.cardDeposit[0];
    return (
      (cOnTopCardDeposit instanceof NumerotedCard &&
        c instanceof NumerotedCard &&
        cOnTopCardDeposit.number === c.number) ||
      cOnTopCardDeposit.color === c.color ||
      (cOnTopCardDeposit instanceof AddTwo && c instanceof AddTwo) ||
      (cOnTopCardDeposit instanceof TurnDirection &&
        c instanceof TurnDirection) ||
      (cOnTopCardDeposit instanceof Skip && c instanceof Skip) ||
      c instanceof Joker ||
      (cOnTopCardDeposit instanceof Joker &&
        cOnTopCardDeposit.chosenColor === c.color)
    );  
  }

  /*Si c'est au tour de l'IA alors l'IA joue */
  public isItIAToPlay(): boolean {
    if (this.room.playersList[this.room.whosTurn] instanceof IA) {
        turnIA(
          this.room.playersList[this.room.whosTurn],
          this.room.game.cardDeposit,
          this.room.game.drawStack,
        );
      return true;
    } else return false;
  }

  /* p va essayer de jouer une carte et on renvoie un statut pour voir si on a réussi a la jouer ou non */
  public playCardReseau(p: Player, indexCard: number): Status {
    let c = p.hand[indexCard];
    let s: Status = { succes: false, information: '' };
    if (this.room.playersList[this.room.whosTurn].login === p.login) {
      if (0 > indexCard || indexCard >= p.hand.length) {
        s.information = 'Index invalide';
      }
      if (this.playableCard(c)) {
        p.playCard(c, this.room.game.cardDeposit);
        s.succes = true;
      }
    } else {
      s.information = "Ce n'est pas à toi de jouer";
    }
    return s;
  }

  /* p va essayer de piocher et si il a le droit il pioche et on renvoie true */
  public drawCardReseau(p: Player): Status {
    let s: Status = { succes: false, information: '' };
    if (this.room.playersList[this.room.whosTurn].login === p.login) {
      p.drawCard(this.room.game.drawStack, this.room.game.drawStack);
      s.information = 'Carte piochée';
      s.succes = true;
    } else {
      s.information = "Ce n'est pas à toi de jouer";
    }
    return s;
  }

  /* Si la manche est terminée on passe à la suivante et on revoie true et si la partie est finie on revoie une info en + */
  public changeRound(): void {
    this.room.nextRound();
  }

  /* Retourne true et le nom du gagnant si le round est fini */
  public isRoundFinished(): Status {
    let s: Status = { succes: false, information: "Le round n'est pas fini" };
    if (this.room.game.isEndRound()) {
      s.succes = true;
      for (let p of this.room.playersList) {
        if (p.hand.length === 0) {
          s.information = p.login;
          this.roundWinner = p.login;
        }
      }
    }
    return s;
  }

  public isGameFinished(): Status {
    let s: Status = { succes: false, information: "La partie n'est pas finie" };
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
  public checkEffectOfTopOfDeposit(color: string): void {
    this.room.checkEffectOfTopOfDeposit(color);
  }

  //fonctions rajoutées par seb/////////
  public checkEffectOfTopOfDepositJokerOrSuperJoker(color: string): void {
    this.room.checkEffectOfTopOfDepositJokerOrSuperJoker(color);
  }

  public checkIfJokerOrSuperJoker(): boolean {
    return this.room.checkIfJokerOrSuperJoker();
  }
  ///////////////////////////////////

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /*Pour changer le tour*/
  public async changeTurnPlayer() {

    if (!this.finishRoundOrGame()) {
      changeTurnPlayer(this.room);
      this.updateisRealToPlay();
      await this.delay(3000);
      if(!this.room.isBlocked){
        if (this.isItIAToPlay()) {
          if (!this.finishRoundOrGame()) {
            this.checkEffectOfTopOfDeposit('blue');
            this.changeTurnPlayer();
          }
        }
      }
    }
  }

  public spinWheel(): number {
    if (this.room.game instanceof SpinUn)
      return this.room.playersList[this.room.whosTurn].spinWheel(
        this.room.game.wheel,
      );
    else console.log('Pas une game spin');
  }

  public finishRoundOrGame(): boolean {
    if (this.isRoundFinished().succes) {
      this.room.game.endRound();
      let st = this.isGameFinished();
      if (st.succes) {
        console.log(st.information + ' est le gagnant');
      } else {
        this.roundWinner = st.information;
        this.changeRound();
      }
      return true;
    } else return false;
  }

  public replacePlayerByIa(players: (Real | IA)[], login: string): void {
    // Finding the player with the given login
    const playerToReplace = players.find(player => player instanceof Real && player.login === login);
    
    if (!playerToReplace) {
        console.log("The specified player does not exist.");
        return;
    }
    
    // Creating the IA and transferring the player's cards
    const ia = new IA();
    if (playerToReplace instanceof Real) {
        ia.hand = playerToReplace.hand;
    }
    
    // Replacing the player in the list
    const indexPlayer = players.indexOf(playerToReplace);
    if (indexPlayer !== -1) {
        players[indexPlayer] = ia;
    }
}
}

