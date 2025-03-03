/*
 * @author Hadi Nour El Dine, membre de l'équipe d'algorithmique
 * @author Thayssa Oulhaci, membre de l'equipe d'algorithmique
 */

import { printCardArray } from '../roomModule/deroulement/fonctions_affichages';
import { SpinUnChallengeWheel } from './player';
import War from './war';
/*
 * Récupérer les instances possibles pour une carte
 */
import Card from '../cardModule/card';

/*
 * Objets dont on a besoin pour la suite du programme
 */
import Player from './player';

/*
 * Modules utils
 */
import { strict as assert } from 'assert';
import * as readlineSync from 'readline-sync';
import { compareSync } from 'bcrypt';

/*
 * Classe Real correspondant à un joueur réel héritant de la classe Player
 */
export default class Real extends Player {
  /*
   * @Summary Constructeur de la classe Real
   * @param {string} _login Argument correspondant au login d'un joueur
   */
  constructor(_login: string = '') {
    /*
     * Appel au Constructeur de la classe mère
     */
    super(_login);
  }

  /*
   *
   */
  public playAfterEndOfTheTimer() { }

  /*
   * @Summary Méthode permettant à un joueur réel d'essayer de jouer une carte
   * @param {Card} c Argument correspondant à la carte que le joueur tente de jouer
   * @param {Card[]} cardDeposit Argument correspondant au dépôt
   * @return {number} Retourne un message d'information
   */
  // public tryPlayCard(c: Card, cardDeposit: Card[]): number {
  //   const cOnTopOfCardDeposit = cardDeposit[0] as Card;
  //
  //   /*
  //    * Tester différentes instances de la carte sur le haut du dépôt
  //    */
  //   if (cOnTopOfCardDeposit instanceof NumerotedCard) {
  //     return this.checkNumerotedCard(c, cOnTopOfCardDeposit, cardDeposit);
  //   } else if (cOnTopOfCardDeposit instanceof AddTwo) {
  //     return this.checkAddTwo(c, cOnTopOfCardDeposit, cardDeposit);
  //   } else if (cOnTopOfCardDeposit instanceof Joker) {
  //     return this.checkJoker(c, cOnTopOfCardDeposit, cardDeposit);
  //   } else if (cOnTopOfCardDeposit instanceof SuperJoker) {
  //     return this.checkSuperJoker(c, cOnTopOfCardDeposit, cardDeposit);
  //   } else if (cOnTopOfCardDeposit instanceof Skip) {
  //     return this.checkSkip(c, cOnTopOfCardDeposit, cardDeposit);
  //   } else if (cOnTopOfCardDeposit instanceof TurnDirection) {
  //     return this.checkTurnDirection(c, cOnTopOfCardDeposit, cardDeposit);
  //   }
  //
  //   /*
  //    * La carte n'est pas jouable
  //    */
  //   return informationsMessages.cardIsNotPlayable;
  // }

  /*
   * @Summary  Méthode permettant à un player de faire tourner la roue des défis
   * @param {number} challengewheel Argument représentant le défi à traiter
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
          this.drawCard(drawStack, cardDeposit);
        } while (this.hand[0].color !== 'red');
        break;
      case SpinUnChallengeWheel.DRAWBLUE:
        /*
         * Piocher jusqu'à ce que le joueur obtienne une carte bleue
         */
        do {
          this.drawCard(drawStack, cardDeposit);
        } while (this.hand[0].color !== 'blue');
        break;
      case SpinUnChallengeWheel.ALMOSTUN:
        /*
         * Permet à un joueur de vider sa main à l'exception de deux cartes
         */
        let cardsToDiscard: number[] = additionnalParameter;

        // Joue toutes les cartes qu'il a choisi
        for (let index: number = this.hand.length - 1; index >= 0; index--) {
          if (cardsToDiscard.includes(index)) {
            this.playCard(this.hand[index], cardDeposit); // Joue la carte à l'index correspondant
          }
        }

        break;
      case SpinUnChallengeWheel.SHOWHAND:
        /*
         * Rendre la main visible à tous pour l'IHM, faire en sorte que ça ne dure qu'un tour
         */
        this._isHandVisile = true;
        break;
      case SpinUnChallengeWheel.TRADEHANDS:
        /*
         * Chaque joueur doit échanger sa main avec celui de gauche
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
         * Permet à un joueur de vider toutes les cartes de sa main d'une même couleur
         */
        let inputColor: string = additionnalParameter;
        /*
         * Jouer les cartes
         */
        for (let index: number = this.hand.length - 1; index >= 0; index--) {
          if (this.hand[index].color == inputColor) {
            this.playCard(this.hand[index], cardDeposit);
          }
        }

        break;
      case SpinUnChallengeWheel.DISCARDNUMBER:
        /*
         * Permet à un joueur de vider ou non toutes les cartes de sa main d'un même nombre
         */
        let numberDiscard: number = additionnalParameter;
        /*
         * Jouer les cartes
         */
        for (let index: number = this.hand.length - 1; index >= 0; index--) {
          if (this.hand[index].number == numberDiscard) {
            this.playCard(this.hand[index], cardDeposit);
          }
        }
        break;
    }
  }
}
