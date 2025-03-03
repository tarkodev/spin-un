/*
 * @author Hadi Nour El Dine, membre de l'équipe d'algorithmique
 * @author Thayssa Oulhaci, membre de l'equipe d'algorithmique
 */

/*
 * Objets dont on a besoin pour la suite du programme
 */
import Player from './player';
import { informationsMessages, SpinUnChallengeWheel } from './player';
import War from './war';

import { strict as assert } from 'assert';

/*
 * Instances possibles pour une carte
 */
import Card from '../cardModule/card';
import NumerotedCard from '../cardModule/numerotedCard';
import AddTwo from '../cardModule/addTwo';
import Skip from '../cardModule/skip';
import TurnDirection from '../cardModule/turnDirection';
import Joker from '../cardModule/joker';
import SuperJoker from '../cardModule/superJoker';
import Spin from '../cardModule/spin';

/*
 * Classe IA représentant une intelligence articielle héritant de la classe Player
 */
export default class IA extends Player {
  /*
   * @Summary Constructeur de la classe Real
   * @param {string} _login Argument correspondant au login d'un joueur
   */
  constructor(_login: string = '') {
    super(_login); /* Appel au constructeur de la classe mère */
  }

  /*
   * @Summary Méthode permettant à une intelligence articielle (ou Real pour simuler le comportement
   * d'une IA à la fin du timer) d'essayer de jouer une carte
   * @param {Card[]} cardDeposit Argument correspondant au dépôt
   * @return {number} Retourne un message d'information
   */
  public playableRandomCard(cardDeposit: Card[]): number {
    if (this._hand.length > 0) {
      // Vérifier que la main n'est pas vide
      const cOnTopOfCardDeposit = cardDeposit[0] as Card; // Récuperer la carte en haut du dépot

      let returnMessage: number = informationsMessages.noCardCanBePlayed;

      /*
       * Tenter de joueur n'importe quelle carte présente dans la main
       */
      for (const cHand of this._hand) {
        /*
         * Selon l'instance de la carte du haut du dépot, différentes actions sont possibles
         */
        if (
          cOnTopOfCardDeposit instanceof NumerotedCard ||
          cOnTopOfCardDeposit instanceof Spin
        ) {
          returnMessage = this.checkNumerotedCardOrSpin(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        if (cOnTopOfCardDeposit instanceof AddTwo) {
          returnMessage = this.checkAddTwo(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        if (cOnTopOfCardDeposit instanceof Joker) {
          returnMessage = this.checkJoker(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        if (cOnTopOfCardDeposit instanceof SuperJoker) {
          returnMessage = this.checkSuperJoker(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        if (cOnTopOfCardDeposit instanceof Skip) {
          returnMessage = this.checkSkip(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        if (cOnTopOfCardDeposit instanceof TurnDirection) {
          returnMessage = this.checkTurnDirection(
            cHand,
            cOnTopOfCardDeposit,
            cardDeposit,
          );
        }
        /*
         * Si une carte a réussi à être joué alors quitter la boucle
         */
        if (returnMessage === informationsMessages.cardHasBeenPlayed) {
          if (this.hand.length == 1) {
            this.sayUno();
          }
          break;
        }
      }

      return returnMessage === informationsMessages.cardIsNotPlayable
        ? informationsMessages.noCardCanBePlayed
        : returnMessage;
    }
  }
  /*
   * @Summary  Méthode permettant à un player de faire tourner la roue des défis
   * @param {number} challengewheel Argument le défi à traiter
   * @param {Player[]} playersList Argument correspondant à la liste de joueurs présents dans la partie
   * @param {Card[]} drawStack Argument correspondant à la pioche
   * @param {Card[]} cardDeposit Argument correspondant au dépôt
   * @return {void} Ne retourne rien, tout est modifié en place
   */
  public treatmentChallengeWheel(
    challengeWheel: number,
    playersList: Player[],
    drawStack: Card[],
    cardDeposit: Card[],
    additionnalParameter,
  ): void {
    additionnalParameter = null;
    /*
     * Traitetement des différents défis
     */
    switch (challengeWheel) {
      case SpinUnChallengeWheel.WAR:
        /**
         * création d'une instance de la classe War
         */
        const war = new War(playersList, cardDeposit);
        /**
         *Appelez la méthode pertinente de la classe War
         */
        war.startWar([], 0);

        break;
      case SpinUnChallengeWheel.UNSPIN:
        break;
      case SpinUnChallengeWheel.DRAWRED:
        /*
         * Piocher jusqu'à ce que le joueur obtienne une carte rouge
         */
        do {
          /*
           * Tirer une carte
           */
          this.drawCard(drawStack, cardDeposit);
        } while (this.hand[0].color !== 'red');
        break;
      case SpinUnChallengeWheel.DRAWBLUE:
        /*
         * Piocher jusqu'à ce que le joueur obtienne une carte bleue
         */
        do {
          /*
           * Tirer une carte
           */
          this.drawCard(drawStack, cardDeposit);
        } while (this.hand[0].color !== 'blue');
        break;
      case SpinUnChallengeWheel.ALMOSTUN:
        /*
         * Permet à un joueur de vider sa main à l'exception de deux cartes
         */
        while (this.hand.length > 2) {
          this.playCard(this.hand[0], cardDeposit);
        }

        break;
      case SpinUnChallengeWheel.SHOWHAND:
        /*
         * Rendre la main visible à tous pour l'IHM, faire en sorte que ça ne dure qu'un tour
         */
        this._isHandVisile = true;
        break;
      case SpinUnChallengeWheel.TRADEHANDS:
        /* Chaque joueur doit échanger sa main avec celui de gauche
         * Vérifier que la liste de joueur n'est pas vide
         */
        assert(playersList.length > 0);
        let handLastPlayer: Card[] = playersList[playersList.length - 1].hand;
        for (let index: number = playersList.length - 1; index > 0; index--) {
          /*
           * La main du joueur d'indice index prend la main du joueur d'indice index -1
           */
          playersList[index].hand = playersList[index - 1].hand;
        }
        /*
         * Le joueur d'indice 0 prend la main du joueur d'indice playersList.length - 1
         */
        playersList[0].hand = handLastPlayer;
        break;
      case SpinUnChallengeWheel.DISCARDCOLOR:
        /*
         * tirer la couleur des cartes à jouer
         */
        let listColors: string[] = ['red', 'blue', 'yellow', 'green'];
        let randomColorIndex: number = Math.floor(Math.random() * 4);
        for (let i = 0; i < this.hand.length; i++) {
          if (this.hand[i] instanceof Card) {
            if (this._hand[i].color === listColors[randomColorIndex]) {
              this.playCard(this._hand[i], cardDeposit);
            }
          }
        }
      case SpinUnChallengeWheel.DISCARDNUMBER:
        /*
         * tirer le numero des cartes à jouer  entre 0 et 9
         */
        let randomNumber: number = Math.floor(Math.random() * 10);
        /*
         * Initialiser l'indice de la carte trouvée à -1, ce qui signifie que la carte n'a pas été trouvée
         */
        for (let i = 0; i < this.hand.length; i++) {
          if (this.hand[i] instanceof NumerotedCard) {
            if (this._hand[i].number === randomNumber) {
              this.playCard(this._hand[i], cardDeposit);
            }
          }
        }
        break;
    }
  }
}
