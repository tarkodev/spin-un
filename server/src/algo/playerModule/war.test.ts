import War from './war';
import Real from '../playerModule/real';
import IA from '../playerModule/ia';
import Card from '../cardModule/card';
import NumerotedCard from '../cardModule/numerotedCard';


describe('War Class', () => {
  let real1: Real;
  let real2: Real;
  let ia1: IA;
  let ia2: IA;
  let card1: NumerotedCard;
  let card2: NumerotedCard;
  let card3: NumerotedCard;
  let card4: NumerotedCard;
  let cardDeposit: Card[];
  let war: War;

  beforeEach(() => {
    // Créer des instances de joueurs et de cartes
    real1 = new Real('Player1');
    real2 = new Real('Player2');
    ia1 = new IA('IA1');
    ia2 = new IA('IA2');

    card1 = new NumerotedCard('red', 1);
    card2 = new NumerotedCard('blue', 2);
    card3 = new NumerotedCard('green', 3);
    card4 = new NumerotedCard('yellow', 4);

    cardDeposit = [];

    // Attribuer des cartes aux mains des joueurs
    real1.hand = [card1, card2];
    real2.hand = [card3];
    ia1.hand = [card4];
    ia2.hand = [card1, card3];

    // Créer une instance de la classe War
    war = new War([real1, real2, ia1, ia2], cardDeposit);
  });

  it('playersWithCardNumeroted should return players with numeroted cards', () => {
    const playersWithCards = war.playersWithCardNumeroted();
    expect(playersWithCards).toContain(real1);
    expect(playersWithCards).toContain(real2);
    expect(playersWithCards).toContain(ia1);
    expect(playersWithCards).toContain(ia2);
  });

//   it('init should populate maxCardsArray correctly', () => {
//     const maxCardsArray: Card[] = [];
//     war.init(maxCardsArray);
//     expect(maxCardsArray).toContain(card2);
//     expect(maxCardsArray).toContain(card3);
//     expect(maxCardsArray).toContain(card4);
//     expect(maxCardsArray).toContain(card3);
//   });

//   test('startWar should correctly update cardDeposit and players hands', () => {
//     const maxCardsArray: Card[] = [];
//     war.init(maxCardsArray);
//     war.startWar(maxCardsArray, 0);

//     // Vérifiez l'état final attendu
//     expect(cardDeposit.length).toBeGreaterThan(0);
//     expect(real1.hand.length).toBeLessThan(2);
//     expect(real2.hand.length).toBe(0);
//     expect(ia1.hand.length).toBeLessThan(2);
//     expect(ia2.hand.length).toBeLessThan(2);
//   });
});
