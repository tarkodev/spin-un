// /* Importe des fichiers utils */
// //import Real from "../../playerModule/real";
// import Player from "../../playerModule/player";
// //import NumerotedCard from "../numerotedCard";
 import Room from "../room";
// import { printInfo } from "./fonctions_affichages";
// import { verificationInstancePlayer } from "./verification_instance";

// /*

export function changeTurnPlayer(room : Room){
    room.whosTurn += room.game.direction;
    room.whosTurn =((room.whosTurn % room.playersList.length) + room.playersList.length) % room.playersList.length;
}


// export function deroulement_tour(room : Room){
//     /* Afficher des informations */
//     console.log("Before play :");
//     printInfo(room.game.cardDeposit, room.playersList[room.whosTurn]);

//     /* Vérification de l'instance d'un joueur */
//     verificationInstancePlayer(room);

//     /* Afficher des informations */
//     console.log("After play :");
//     printInfo(room.game.cardDeposit, room.playersList[room.whosTurn]);

//     //seb
//     //room.checkEffectOfTopOfDepositJokerOrSuperJoker("blue");

//     room.checkEffectOfTopOfDeposit("blue");
    
//     /* Au joueur suivant */
//     changeTurnPlayer(room);

//     console.log("######################################");
// }

// /* Fonction main, là où tout se déroule */
// export function main(): void {
//   let room: Room = new Room(0, 10, 4);
//   room.gameStart();

//   /* Tant qu'il n'y a pas de gagnant la partie continue */
//   while (!room.isEnd()) {
//     /* Tant que le round n'est pas terminé */
//     console.log(
//       "#####################################################################################################",
//     );
//     console.log("round: ", room.numberRound);
//     console.log(
//       "#####################################################################################################",
//     );
//     while (!room.game.isEndRound()) {
//         deroulement_tour(room);
//     }

//     /* Fin du round */
//     room.game.endRound();
//     room.nextRound();
//   }

//   console.log("Fin de partie");
//   for (const player of room.game.players) {
//     if (player.isWinner) {
//       console.log("Gagnant : " + player.login + " avec " + player.points);
//     } else {
//       console.log("Perdant : " + player.login + " avec " + player.points);
//     }
//   }
// }

// //main();




// export function new_main() : Player{
//     let room = new Room(0,10, 4);

//     room.gameStart();

//     while (1){
//       /* Vérification de l'instance d'un joueur et le joueur joue */
//       verificationInstancePlayer(room);

//       //seb
//       //room.checkEffectOfTopOfDepositJokerOrSuperJoker("blue");

//       room.checkEffectOfTopOfDeposit("blue");

//       /* Au joueur suivant */
//       changeTurnPlayer(room);

//         if(room.game.isEndRound()){
//             room.game.endRound();
//             room.nextRound();
//             if(room.isEnd()){
//                 for(let p of room.playersList){
//                     if(p.points > room.pointsNumber){
//                         return p;
//                     }
//                 }
//             }
//         }
//     }  
//     return room.playersList[0]
// }
