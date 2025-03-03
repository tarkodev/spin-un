/*
 * @author Hadi Nour El Dine, membre de l'équipe d'algorithmique
 * @author Thayssa Oulhaci, membre de l'equipe d'algorithmique
 */

/*
 * Objets dont on a besoin pour la suite du programme
 */
import Game from '../gameModule/game';
import Card from '../cardModule/card';
import Joker from '../cardModule/joker';
import SuperJoker from '../cardModule/superJoker';

/* Module assert pour vérification de condition */
import { strict as assert } from 'assert';

/*
 * Enum représentant les différents défis de la roue
 */
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

/*
 * Enum représentant les différents messages correspondant à l'action d'un joueur
 */
export enum informationsMessages {
  noCardCanBePlayed,
  cardIsNotPlayable,
  cardHasBeenPlayed,
  youNeedToDrawTwoCards,
  youNeedToDrawFourCards,
  youCantPlay,
  directionMustBeTurned,
}

export const challengeWon: string = 'tu as remporté le challenge.';
export const challengeLost: string = 'tu as perdu le challenge.';
export const challengeFalse: string = "la carte jouée n'est pas un SuperJoker.";

/*
 * Classe Player représentant un joueur réel ou une intelligence articificielle
 */
export default abstract class Player {
  /*
   * Attributs de la classe
   * _hand correspondant à la main d'un joueur
   * _points correspondant au nombre de points qu'il a gagné durant une partie
   * _isWinner attribut indiquant si le joueur est le gagnant de la partie ou pas
   * _isHandVisile indiquant si la main d'un joueur est visible par les autres joueurs ou pas
   */
  protected _hand: Card[];
  protected _points: number;
  protected _login: string;
  protected _isWinner: boolean;
  protected _isHandVisile: boolean;
  protected _mustSayUno: boolean;

  /*
   * @Summary Constructeur de la classe Player
   * @param {string} _login Argument correspondant au login d'un joueur
   */
  constructor(_login: string) {
    /*
     * Par défaut main vide
     */
    this._hand = [];
    /*
     * Par défaut 0 points
     */
    this._points = 0;
    /*
     * Le login sera à renseigner lors de la création de la l'instance, par défaut ""
     */
    this._login = _login;
    /*
     * Par défaut isWinner est false
     */
    this._isWinner = false;
    /*
     * Par défaut la main d'un joueur n'est pas visible
     */
    this._isHandVisile = false;

    /*
     * True si le joueur doit dire uno
     */
    this._mustSayUno = false;
  }

  /*
   * @Summary Méthode permettant à un joueur de priocher une carte
   * @param {Card[]} drawStack Argument correspondant à la pioche
   * @param {Card[]} cardDeposit Argument correspondant au dépôt.
   * Si la pioche est vide alors on re-mélange la pioche et le dépôt
   * @return {void} Ne retourne rien, tout est modifié en place
   */
  public drawCard(drawStack: Card[], cardDeposit: Card[]): void {
    /*
     * Si la pioche est vide alors il faut mélanger cardDeposit et drawStack avant de piocher dans celle-ci
     * */
    if (drawStack.length === 0) {
      /*la pioche est vide */
      const topCard = cardDeposit.shift() as Card; // Retire la première carte du dépot
      if (!topCard) {
        throw new Error('Le dépot de carte est vide');
      }
      while (cardDeposit.length > 0) {
        drawStack.unshift(cardDeposit.shift() as Card);
      }
      //drawStack = cardDeposit; // La pioche devient le dépot (à l'exception de la première carte)
      for (let c of drawStack) {
        c.effectToApply = true;
        c.loginPlayer = null;
      }
      /*
       * La pioche n'est pas vide
       */
      cardDeposit.unshift(topCard); // Le dépot ne contient que la première carte
      Game.shuffle(drawStack); // Mélange la nouvelle pioche
    }
    /* now la pioche n'est pas vide */
    if (drawStack.length !== 0) {
      const c = drawStack.shift() as Card; // Tirer une carte du haut de la pioche
      c.loginPlayer = this.login;
      this._hand.unshift(c); // Placer la nouvelle carte dans la main du joueur
      this._mustSayUno = false;
    }
  }

  // Permet au joueur de dire Uno
  public sayUno() {
    this._mustSayUno = false;
  }

  /*
   * @Summary Méthode permettant de jouer une carte sur le dépôt
   * @param {Card} c Argument représentant la carte à jouer
   * @param {Card[]} cardDeposit Argument le dépôt de carte
   * @return {void} Ne retourne rien, modifie tout en place
   */
  public playCard(c: Card, cardDeposit: Card[]): void {
    const indexC = this._hand.indexOf(c);
    this.hand.splice(indexC, 1);
    if (this.hand.length == 1) {
      this._mustSayUno = true;
    }
    cardDeposit.unshift(c);
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte numérotée
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkNumerotedCardOrSpin(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Tester si l'on peut jouer sur la couleur ou sur le numéro
     */
    let checkNumberOrColor: boolean =
      c.color === cOnTopOfCardDeposit.color ||
      c.number === cOnTopOfCardDeposit.number;
    if (checkNumberOrColor) {
      this.playCard(c, cardDeposit);
      return informationsMessages.cardHasBeenPlayed;
    } else {
      return informationsMessages.cardIsNotPlayable;
    }
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte +2
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkAddTwo(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Si l'effet est actif alors on doit tirer deux cartes car la carte nous est destiné
     */
    if (cOnTopOfCardDeposit.effectToApply) {
      cOnTopOfCardDeposit.effectToApply = false;
      return informationsMessages.youNeedToDrawTwoCards;
    } else {
      /*
       * Tester si l'on peut jouer sur la couleur
       */
      let checkColor: boolean = c.color === cOnTopOfCardDeposit.color;
      if (checkColor) {
        this.playCard(c, cardDeposit);
        return informationsMessages.cardHasBeenPlayed;
      } else {
        return informationsMessages.cardIsNotPlayable;
      }
    }
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte Joker
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkJoker(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Tester si l'on peut jouer la carte sur la couleur choisie par l'adversaire
     */
    let checkColor: boolean =
      c.color === (cOnTopOfCardDeposit as Joker).chosenColor;
    if (checkColor) {
      this.playCard(c, cardDeposit);
      return informationsMessages.cardHasBeenPlayed;
    } else {
      return informationsMessages.cardIsNotPlayable;
    }
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte SuperJoker
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkSuperJoker(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Si l'effect est actif alors piocher 4 cartes
     */
    if (cOnTopOfCardDeposit.effectToApply) {
      cOnTopOfCardDeposit.effectToApply = false;
      return informationsMessages.youNeedToDrawFourCards;
    } else {
      /*
       * Tester si l'on peut jouer la carte sur la couleur choisie par l'adversaire
       */
      let checkColor: boolean =
        c.color === (cOnTopOfCardDeposit as SuperJoker).chosenColor;
      if (checkColor) {
        this.playCard(c, cardDeposit);
        return informationsMessages.cardHasBeenPlayed;
      } else {
        return informationsMessages.cardIsNotPlayable;
      }
    }
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte tourne-sens
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkTurnDirection(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Si l'effect est actif alors la carte nous est destiné et nous empêche de jouer car le sens doit changer
     */
    if (cOnTopOfCardDeposit.effectToApply) {
      cOnTopOfCardDeposit.effectToApply = false;
      return informationsMessages.directionMustBeTurned;
    } else {
      /*
       * Tester si l'on peut jouer la carte sur la couleur choisie par l'adversaire
       */
      let checkColor: boolean = c.color === cOnTopOfCardDeposit.color;
      if (checkColor) {
        this.playCard(c, cardDeposit);
        return informationsMessages.cardHasBeenPlayed;
      } else {
        return informationsMessages.cardIsNotPlayable;
      }
    }
  }

  /*
   * @Summary Méthode qui permet de tenter de jouer une carte sachant que la carte du
   * haut du dépôt est une carte stop
   * @param {Card} c Argument représentant la carte que l'on tente de jouer
   * @param {Card} cOnTopOfCardDeposit Argument représentant la carte sur laquelle on tente de jouer
   * @return {string} Retourne une chaîne indiquant si la carte a pu être joué
   */
  protected checkSkip(
    c: Card,
    cOnTopOfCardDeposit: Card,
    cardDeposit: Card[],
  ): number {
    /*
     * Si l'effect est actif alors la carte nous est destiné et nous empêche de jouer
     */
    if (cOnTopOfCardDeposit.effectToApply) {
      cOnTopOfCardDeposit.effectToApply = false;
      return informationsMessages.youCantPlay;
    } else {
      /*
       * Si l'effet est actif alors la direction doit être changé
       */
      let checkColor: boolean = c.color === cOnTopOfCardDeposit.color;
      if (checkColor) {
        this.playCard(c, cardDeposit);
        return informationsMessages.cardHasBeenPlayed;
      } else {
        return informationsMessages.cardIsNotPlayable;
      }
    }
  }

  /*
   * @Summary  Méthode permettant à un player de faire tourner la roue des défis
   * @param {number[]} wheel Argument représentant la roue de défis
   * @param {Player[]} playersList Argument correspondant à la liste de joueurs présents dans la partie
   * @param {Card[]} drawStack Argument correspondant à la pioche
   * @param {Card[]} cardDeposit Argument correspondant au dépôt
   * @return {void} Ne retourne rien, tout est modifié en place
   */
  public abstract treatmentChallengeWheel(
    challengeWheel: number,
    playersList: Player[],
    drawStack: Card[],
    cardDeposit: Card[],
    additionnalParameter,
  ): void;

  /*
   * @Summary Méthode permettant à un joueur de défier un autre joueur qui vient de poser un SuperJoker
   * @param {Player} p Argument correspondant au joueur que l'on défie
   * @param {Card[]} cardDeposit Argument correspondant au dépôt
   * @param {Card[]} drawStack Argument correspondant à la pioche
   * @return {void} Ne retourne rien, tout est modifié en place
   */
  public challenge(p: Player, cardDeposit: Card[], drawStack: Card[]): void {
    /*
     * Checker si la le dépôt contient au moins deux cartes
     */
    assert(cardDeposit.length >= 2);
    for (let i = 0; i < p.hand.length; i++) {
      /*
       * Checker si le joueur a une carte de même couleur que la carte du haut dépôt
       * avant qu'il ne pose son SuperJoker
       */
      if (p.hand[i].color === cardDeposit[1].color) {
        /*
         * Faire piocher 6 cartes à l'adversaire
         */
        for (let j = 0; i < 6; j++) {
          p.drawCard(drawStack, cardDeposit);
        }
        return;
      }
    }
    /*
     * On a perdu le challenge, l'adversaire n'avait vraiment de bonne couleur
     */
    for (let j = 0; j < 4; j++) {
      this.drawCard(drawStack, cardDeposit);
    }
  }

  /*
   * @Summary Méthode permettant à un joueur de contrer un oublie d'UNO
   * @return {void} Ne retourne rien
   */
  // public conterLast(): void {
  //   //là on verifie le nombre de carte que contient chaque joueur, si un joueur à 1 seule carte et ce joueur n'a pas encore appellé la methode lastCad,
  //   // idee : ajouter une variable si un joueur appelle lastCard alors la variable est à vrai , si cette var est à vrai alors le counterLast je fonctionnera pas
  // }

  public spinWheel(wheel: number[]): number {
    /*
     * Tirer un nombre aléatoire entre 0 et la taille du tableau wheel - 1
     * pour émuler le fait de tourner la roue
     */
    let randomIndex: number = Math.floor(Math.random() * wheel.length - 1);
    let challengeWheel: number = wheel[randomIndex];
    return challengeWheel;
  }

  public get mustSayUno(): boolean {
    return this._mustSayUno;
  }

  public set mustSayUno(b: boolean) {
    this._mustSayUno = b;
  }

  /*
   * Getter _hand
   */
  public get hand(): Card[] {
    return this._hand;
  }

  /*
   * Setter_hand
   */
  public set hand(h: Card[]) {
    this._hand = h;
  }

  /*
   * Getter _login
   */
  public get login(): string {
    return this._login;
  }

  /*
   * Getter _points
   */
  public get points(): number {
    return this._points;
  }

  /*
   * Setter _points
   */
  public set points(v: number) {
    this._points = v;
  }

  /*
   * Getter _isWinner
   */
  public get isWinner(): boolean {
    return this._isWinner;
  }

  /*
   * Setter _isWinner
   */
  public set isWinner(v: boolean) {
    this._isWinner = v;
  }

  /*
   * Getter _isHandVisile
   */
  public get isHandVisible(): boolean {
    return this._isHandVisile;
  }
}
