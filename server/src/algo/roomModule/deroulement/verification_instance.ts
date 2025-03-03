import * as readlineSync from "readline-sync";
import { assert } from "console";
import Game from "../../gameModule/game";
import Room from "../room";
import Player from "../../playerModule/player";
import Real from "../../playerModule/real";
import IA from "../../playerModule/ia";
import Card from "../../cardModule/card";
import { stat } from "fs";

// /* Fonction permettant de récupérer les cartes contenues dans cardDeposit et de les placer dans drawStack */
// export function swapDrawStackAndCardDeposit(
//   drawStack: Card[],
//   cardDeposit: Card[],
// ): void {
//   assert(cardDeposit.length !== 0);
//   let cardOnTopOfCardDeposit: Card = cardDeposit.shift() as Card;
//   while (cardDeposit.length > 0) {
//     drawStack.unshift(cardDeposit.shift() as Card);
//   }
//   cardDeposit.unshift(cardOnTopOfCardDeposit);
// }

// /* Tirer dans la pioche */
// function drawInDrawStack(
//   cardDeposit: Card[],
//   drawStack: Card[],
//   p: Player,
// ): void {
//   /* Tester si la pioche est vide, si oui alors on prend toutes les cartes de cardDeposit à l'exception de celle du haut et on mélange de nouveau */
//   if (drawStack.length === 0) {
//     /* Tant que cardDeposit contient plus d'un élément alors on lui retire des cartes */
//     swapDrawStackAndCardDeposit(drawStack, cardDeposit);
//     /* Mélange de la pioche */
//     Game.shuffle(drawStack);
//   }
//   p.drawCard(drawStack, cardDeposit);
// }

// /* Checker le retour de clef information dans un switch case */
// function checkInformationStatus(
//   information: string,
//   cardDeposit: Card[],
//   drawStack: Card[],
//   p: Player,
// ): void {
//   /* switch case */
//   switch (information) {
//     /* Aucune carte n'est jouable */
//     case noCardCanBePlayed:
//       /* Piocher une carte si aucune carte dans la main d'est jouable */
//       drawInDrawStack(cardDeposit, drawStack, p);
//       break;
//     case cardIsNotPlayable:
//       //Si la carte n'est pas jouable
//       break;
//     default:
//       break;
//   }
// }

/* Fonction simulant le tour d'une IA */
export function turnIA(p: Player, cardDeposit: Card[], drawStack: Card[]): void {
  /* Si aucune carte n'est jouable alors priocher */
  let statusPlayCard: number = (p as IA).playableRandomCard(cardDeposit);
  if(statusPlayCard!= 2){
    p.drawCard(drawStack, cardDeposit);
  }
}

/* Fonction permettant de faire jouer un véritable joueur */
/*function turnReal(p: Player, cardDeposit: Card[], drawStack: Card[]): void {
  // Si le joueur est une instance de Real
  let indexCard: number = 0;
  let untilChoiceIsWrong: boolean = true;
  while (untilChoiceIsWrong) {
    let userInputChoice: string = readlineSync
      .question("Vous voulez vous jouer ou piocher [j/p]? ")
      .toLowerCase();
    switch (userInputChoice) {
      case "j":
        let returnOfAction: Status = {
          succes: false,
          information: cardIsNotPlayable,
        };
        do {
          /* Demander à l'utilisateur la carte à jouer 
          let inputCardInput: string = readlineSync.question(
            "Quelle carte voulez vous jouer ? ",
          );
          /* Récupérer la réponse et la convertir en entier 
          indexCard = parseInt(inputCardInput);
          /* Vérification 
          /*assert(!isNaN(indexCard));
        } while (indexCard < 0 || indexCard >= p.hand.length); // Tant que l'index n'est pas compris dans la longueur de la main
        returnOfAction = p.playCard(p.hand[indexCard], cardDeposit);
        console.log(returnOfAction)
        
        /* Si la clef succes est false alors checker la raison *
        if (!returnOfAction.succes) {
          if (returnOfAction.information === youNeedToDrawTwoCards) {
            console.log("Vous devez piocher 2 cartes !");
            untilChoiceIsWrong = false;
          } else {
            console.log("Impossible de jouer cette carte.");
          }
          checkInformationStatus(
            returnOfAction.information,
            cardDeposit,
            drawStack,
            p,
          );
        }
        else{
          untilChoiceIsWrong = false
        }
        break;
      case "p":
        /* Si le joueur décide de piocher directement 
        drawInDrawStack(cardDeposit, drawStack, p);
        untilChoiceIsWrong = false;
        break;
      default:
        console.log("Veuillez saisir une réponse valide.");
        break;
    }
  }
}

/* Fonction permettant la vérification de l'instance 
export function verificationInstancePlayer(room: Room): void {
  /* Si le joueur est une instance d'IA 
  if (room.playersList[room.whosTurn] instanceof IA) {
    turnIA(
      room.playersList[room.whosTurn],
      room.game.cardDeposit,
      room.game.drawStack,
    );
  } else if (room.playersList[room.whosTurn] instanceof Real) {
    turnReal(
      room.playersList[room.whosTurn],
      room.game.cardDeposit,
      room.game.drawStack,
    );
  }
}
*/