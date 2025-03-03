import NumerotedCard from "../../cardModule/numerotedCard";
import Player from "../../playerModule/player";
import Card from "../../cardModule/card";
import AddTwo from "../../cardModule/addTwo";
import TurnDirection from "../../cardModule/turnDirection";
import Skip from "../../cardModule/skip";
import Joker from "../../cardModule/joker";
import SuperJoker from "../../cardModule/superJoker";

/* Fonction pour obtenir le code ANSI de couleur en fonction du nom de la couleur */
function colorCode(color: string): string {
  switch (color.toLowerCase()) {
    case "green":
      return "\x1b[32m"; // Vert
    case "red":
      return "\x1b[31m"; // Rouge
    case "blue":
      return "\x1b[34m"; // Bleu
    case "yellow":
      return "\x1b[33m"; // Jaune
    case "black":
      return "\x1b[5;35m";
    default:
      return "\x1b[0m"; // Par défaut, réinitialisation des styles
  }
}

/* Affiche d'un tableau de cartes */
export function printCardArray(cardArray: Card[]): void {
  const reset = "\x1b[0m";
  let count: number = 0;
  console.log("Number of cards :", cardArray.length);
  for (const card of cardArray) {
    const color: string = colorCode(card.color);
    /* Affichage NumerotedCard */
    if (card instanceof NumerotedCard) {
      console.log(
        `${count} ${color}${card.color}, ${card.number} ${reset} ${card.loginPlayer}`,
      );
    } else if (card instanceof AddTwo) {
      /* Affichage différent que pour les NumerotedCard */
      console.log(
        `${count} ${color}${card.color}, "+2" ${reset} ${card.loginPlayer}`,
      );
    } else if (card instanceof TurnDirection) {
      /* Affichage différent que pour les NumerotedCard */
      console.log(
        `${count} ${color}${card.color}, "<->" ${reset} ${card.loginPlayer}`,
      );
    } else if (card instanceof Skip) {
      /* Affichage différent que pour les NumerotedCard */
      console.log(
        `${count} ${color}${card.color}, "O/" ${reset} ${card.loginPlayer}`,
      );
    } else if (card instanceof Joker) {
      /* Affichage différent que pour les NumerotedCard */
      if (card instanceof SuperJoker) {
        console.log(
          `${count} ${color}${card.chosenColor}, "SUPER JOKER" ${reset} ${card.loginPlayer}`,
        );
      } else {
        console.log(
          `${count} ${color}${card.chosenColor}, "JOKER" ${reset} ${card.loginPlayer}`,
        );
      }
    }
    /* Incrémenter le compteur */
    count++;
  }
  console.log();
}

/* Fonction permettant l'affichage d'info à l'écran */
export function printInfo(cardDeposit: Card[], player: Player): void {
  console.log("card deposit :");
  printCardArray(cardDeposit);
  console.log(player.login, "hand: ");
  printCardArray(player.hand);
}
