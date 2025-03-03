import Player from '../playerModule/player';
import IA from '../playerModule/ia';
import Card from '../cardModule/card';
import NumerotedCard from '../cardModule/numerotedCard';
import { printCardArray } from '../roomModule/deroulement/fonctions_affichages';
import * as readlineSync from 'readline-sync';
import { strict as assert } from 'assert';

export default class War {
  /*
   * L'attribut _allPlayer est une copie de la liste des joueurs, accessible en lecture seul
   * L'attribut __playersList correspond à la liste des joueurs qui
   * sera mise à jour à chaque étape de starWar()
   * L'attribut __cardDeposit correspond au dépôt de cartes
   */
  private readonly __allPlayers: Player[];
  private __playersList: Player[];
  private __cardDeposit: Card[];

  /*
   * @Summary Constructeur de la classe War
   * @param {Player[]} __playersList Argument correspondant à la liste des joueurs
   * @param {Card[]} __cardDeposit Argument correspondant au dépôt de cartes
   */
  constructor(__playersList: Player[], __cardDeposit: Card[]) {
    this.__playersList = this.__allPlayers = __playersList;
    this.__cardDeposit = __cardDeposit;
  }

  /*
   * @Summary Méthode permettant de sélectionner seulement les joueurs qui
   * ont des cartes numérotées dans leur main
   * @return {Player[]} Retourne une liste de joueurs
   */
  public playersWithCardNumeroted(): Player[] {
    let players: Player[] = [];
    /*
     * Parcours de la liste des joueurs
     */
    for (let player of this.__playersList) {
      /*
       * Utilisation de Array.find() pour rechercher une carte numérotée dans la main du joueur
       */
      const hasNumerotedCard = player.hand.find(
        (card) => card instanceof NumerotedCard,
      );
      /*
       * Si le joueur possède au moins une carte numérotée, on l'ajoute à la liste
       */
      if (hasNumerotedCard) {
        players.unshift(player);
      }
    }
    return players;
  }

  /*
   * @Summary Méthode permettant de choisir la plus grande carte numérotée
   * dans la main d'un joueur selon son instance
   * @param {Card[]} maxCardsArray Argument correspondant à la liste des cartes
   * max de chacun des joueurs
   * @return {Card[]} Retourne une liste de cartes
   */
  public init(maxCardsArray: Card[]): Card[] {
    /*
     * Sélection des joueurs ont au moins une carte numérotée dans leur main
     */
    this.__playersList = this.playersWithCardNumeroted();
    /*
     * Parcours de la liste des joueurs
     */
    for (
      let indexPlayer: number = 0;
      indexPlayer < this.__playersList.length;
      indexPlayer++
    ) {
      let player: Player = this.__playersList[indexPlayer];
      /*
       * Si le joueur est une intelligence artificielle
       */
      if (this.__playersList[indexPlayer] instanceof IA) {
        let indexCard: number = 0;
        let maxCard: Card = player.hand[indexCard];

        /*
         * Recherche de la première carte numérotée en supposant qu'elle est le max
         */
        for (; indexCard < player.hand.length; indexCard++) {
          if (player.hand[indexCard] instanceof NumerotedCard) {
            /*
             * Première carte numérotée trouvée
             */
            maxCard = player.hand[indexCard];
            break;
          }
        }
        indexCard++;

        /*
         * Parcours de la main du joueur à partir de l'indice + 1 de la première carte
         * numérotée pour éviter de parcourir des éléments du tableau pour rien
         */
        for (; indexCard < player.hand.length; indexCard++) {
          /*
           * Vérifier d'abord l'instance puis l'attribut le numéroté de la carte
           */
          if (
            player.hand[indexCard] instanceof NumerotedCard &&
            player.hand[indexCard].number > maxCard.number
          ) {
            /*
             * Mise à jour du max
             */
            maxCard = player.hand[indexCard];
          }
        }
        /*
         * Ajouter la carte dans le tableau des cartes pour comparaison
         */
        maxCardsArray.push(maxCard);
      } else {
        /*
         * Cas où le joueur est un vrai joueur
         */
        let indexCard: number = 0;
        /*
         * Afficher la main pour permettree à un joueur de choisir les cartes qu'il veut poser sur le dépôt
         */
        printCardArray(player.hand);
        do {
          /*
           * Demander à l'utilisateur la carte à jouer
           */
          let inputCardInput: string = readlineSync.question(
            'Quelle carte voulez vous choisir ? ',
          );
          indexCard = parseInt(inputCardInput);
          assert(!isNaN(indexCard));
        } while (
          indexCard < 0 ||
          indexCard >= player.hand.length ||
          !(player.hand[indexCard] instanceof NumerotedCard)
        );
        /*
         * Ajouter la carte dans le tableau des cartes pour comparaison
         */
        maxCardsArray.push(player.hand[indexCard]);
      }
    }
    return maxCardsArray;
  }

  /*
   * @Summary Méthode récursive permettant de déterminer gagnant du défi War
   * @param {Card[]} maxCardsArray Argument correspondant à la liste des cartes max donnée par la fonction init()
   * @param {number} searchPosition Argument permettant de chercher le(s) nouveau(x) max à partir d'une certaine position
   * @return {Card[]} Renvoie le dépôt de carte mise à jour
   */
  public startWar(maxCardsArray: Card[], searchPosition: number): void {
    /*
     * Condition d'arrêt, si la liste des joueurs est vide alors quitter
     */
    if (this.__playersList.length === 0) {
      return;
    }

    /*
     * Si la liste des joueurs ne contient qu'un seul joueur alors ajouter les cartes de ce joueur là à __cardDeposit
     */
    if (this.__playersList.length === 1) {
      /*
       * Parcours de la liste de cartes
       */
      for (let index = 0; index < maxCardsArray.length; index++) {
        /*
         * Remettre la carte dans la main de son propriétaire et la retirer de la liste des cartes max
         */
        if (maxCardsArray[index].loginPlayer !== this.__playersList[0].login) {
          for (let player of this.__allPlayers) {
            if (maxCardsArray[index].loginPlayer === player.login) {
              const card = maxCardsArray.splice(index, 1)[0];
              player.hand.unshift(card);
              break;
            }
          }
        }
      }
      /*
       * Retourner la concaténation de la liste des cartes max avec __cardDeposit
       */
      for (let index: number = 0; index < maxCardsArray.length; index++) {
        this.__cardDeposit.unshift(maxCardsArray[index]);
      }
    }
    /*
     * Représente le tableau des cartes choisis où on devra chercher la carte gagnante
     */
    maxCardsArray = this.init(maxCardsArray);

    /*
     * Trouver le numero le plus grand dans la liste
     */
    let max: NumerotedCard = maxCardsArray[searchPosition];
    for (let i: number = searchPosition + 1; i < maxCardsArray.length; i++) {
      if (maxCardsArray[i].number > max.number) {
        max = maxCardsArray[i];
      }
    }

    /*
     * Trouver les indices des cartes avec les plus grands numéros
     */
    let maxNumber: number = max.number;
    let indicesMax: number[] = [];
    maxCardsArray.forEach((card, indexCard) => {
      if (card.number === maxNumber) {
        indicesMax.unshift(indexCard);
      }
    });

    /*
     *  Filtrer les joueurs dont les cartes ne sont pas des max
     */
    const playersWithoutMaxCards = this.__playersList.filter(
      (_, index) => !indicesMax.includes(index),
    );

    /*
     * remettre les cartes qui ne sont pas des max dans la main de son joueur
     */
    playersWithoutMaxCards.forEach((player, index) => {
      const card = maxCardsArray.splice(index, 1)[0]; // Retirer la carte de maxCardsArray
      player.hand.unshift(card); // Ajouter la carte à la main du joueur
    });
    /*
     *  Filtrer les joueurs dont les cartes jouées sont des max
     */
    this.__playersList = this.__playersList.filter((_, index) =>
      indicesMax.includes(index),
    );

    /*
     * Récursion à partir de
     */
    this.startWar(maxCardsArray, this.__playersList.length);
  }
}
