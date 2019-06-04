const cardSuits = ['spades', 'diams', 'hearts', 'clubs'];
const cardFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let table = [[], [], []];
let playerOneAllHands = [];
let playerTwoAllHands = [];
let prepareButton = document.getElementById('prepare');

prepareButton.addEventListener('click', prepare);

function prepare() {
  buildCards();
  shuffle(deck);
  deal(deck);
  playerOneAllHands = allPossibleHands(table[0], table[2]);
  playerTwoAllHands = allPossibleHands(table[1], table[2]);
  console.log(table);
  console.log(playerOneAllHands);
  console.log(playerTwoAllHands);
  console.log(isItFlush(playerOneAllHands));
}

function deal(array) {
  table = [[], [], []];

  table[0].push(array[0]);
  table[0].push(array[2]);
  table[1].push(array[1]);
  table[1].push(array[3]);
  table[2].push(array[5]);
  table[2].push(array[6]);
  table[2].push(array[7]);
  table[2].push(array[9]);
  table[2].push(array[11]);

  return table;
}
// pabandyti su isoriniu filter.ir vidiniu every
function isItFlush(array) {
  let flushArray = [];
  for (let i = 0; i < array.length; i++) {
    let cards = array[i];
    for (let z = 0; z < cards.length; z++) {
      let flush = cards.filter(flushCard => flushCard.suit == cards[z].suit);
      if (flush.length === 5) {
        flushArray.push(flush);
      }
    }
  }
  if (flushArray.length > 0) {
    return flushArray;
  } else {
    return null;
  }
}
// let handTest = [1, 2];
// let tableTest = [3, 4, 5, 6, 7];

function createBestHandfromOneCard(hand, table) {
  let allPossibleHands = [];
  for (z = 0; z < hand.length; z++) {
    let card = hand[z];
    for (i = 0; i < table.length; i++) {
      let array = [...table];
      array.splice(i, 1, card);
      allPossibleHands.push(
        array.sort(function(a, b) {
          // su objetais reikes a.value, a.value
          return a.value - b.value;
        }),
      );
    }
  }
  // console.log(allPossibleHands);
  return allPossibleHands;
}

// console.log(tableTest.splice(1, 1, handTest[1]));
// console.log(tableTest);
// console.log(createBestHandfromOneCard(handTest, tableTest));

function createBestHandfromTwoCards(hand, table) {
  let allPossibleHands = [];
  for (z = 0; z < table.length; z++) {
    let array = [...table];
    array.splice(z, 1, hand[0]);
    // console.log(array);

    for (i = 0; i < array.length; i++) {
      let array1 = [...array];
      array1.splice(i, 1, hand[1]);
      // console.log(array1);
      if (array[i] !== hand[0]) {
        let array2 = [...array1].sort(function(a, b) {
          // su objetais reikes a.value, a.value
          return a.value - b.value;
        });
        if (
          !allPossibleHands.some(function(hand) {
            return hand.every(function(card, index) {
              return card === array2[index];
            });
          })
        ) {
          allPossibleHands.push(array2);
        }
      }
    }
  }

  return allPossibleHands;
}

function allPossibleHands(hand, table) {
  let array = [];
  array = createBestHandfromOneCard(hand, table).concat(createBestHandfromTwoCards(hand, table));

  return array;
}

function buildCards() {
  deck = [];
  for (i = 0; i < cardSuits.length; i++) {
    let newSuit = cardSuits[i][0].toUpperCase();
    for (z = 0; z < cardFace.length; z++) {
      let card = {
        suit: cardSuits[i],
        num: cardFace[z],
        value: parseInt(z) + 2,
        icon: newSuit,
        isReversed: false,
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffle(array) {
  for (i = array.length - 1; i > 0; i--) {
    let randomDigit = Math.floor(Math.random() * (i + 1));
    let temporaryPlace = array[i];
    array[i] = array[randomDigit];
    array[randomDigit] = temporaryPlace;
  }
  return array;
}

let fightButton = document.getElementById('fight');
fightButton.addEventListener('click', fight);

function fight() {
  console.log('fight', winner(playersHands));
  // clearList("scoreMy1");
  // clearList("scoreMy2");
  battle();
  if (!winner(playersHands)) {
    console.log('winner(playersHands)');
    // let pot = [player1FirstCard,player2FirstCard];

    player1Hand.innerHTML = renderCard(playersHands[0][0], 0);
    player2Hand.innerHTML = renderCard(playersHands[1][0], 0);
    player1Score.innerHTML = playersHands[0].length;
    player2Score.innerHTML = playersHands[1].length;
    // let player1Div = document.getElementById("scoreMy1");
    // let player2Div = document.getElementById("scoreMy2");
    // player1Div.appendChild(renderCardAndScore(playersHands[0],playersHands[0][0]));
    // player2Div.appendChild(renderCardAndScore(playersHands[1],playersHands[1][0]));
  } else {
    console.log('kazkas laimejo');
  }
}

function battle() {
  let player1FirstCard = playersHands[0].shift();
  let player2FirstCard = playersHands[1].shift();
  let temporaryArray = [];

  console.log(player2FirstCard);

  if (player1FirstCard.value > player2FirstCard.value) {
    playersHands[0].push(player1FirstCard, player2FirstCard);
  } else if (player1FirstCard.value < player2FirstCard.value) {
    playersHands[1].push(player1FirstCard, player2FirstCard);
  } else {
    while (player1FirstCard.value === player2FirstCard.value) {
      temporaryArray.push(player1FirstCard);
      temporaryArray.push(player2FirstCard);
      player1FirstCard = playersHands[0].length ? playersHands[0].shift() : playersHands[1].shift();
      player2FirstCard = playersHands[1].length ? playersHands[1].shift() : playersHands[0].shift();
      console.log(1, temporaryArray);
    }
    temporaryArray.push(player1FirstCard);
    temporaryArray.push(player2FirstCard);
    console.log(2, temporaryArray);
    if (player1FirstCard.value > player2FirstCard.value) {
      playersHands[0] = playersHands[0].concat(temporaryArray);
    } else {
      playersHands[1] = playersHands[1].concat(temporaryArray);
    }
    console.log(3, playersHands);
  }
  return playersHands;
}

// function renderCardAndScore(array, obj){
//   let list = document.createElement("ul");
//   let listItemScore = document.createElement("li");
//   let listItemSuit = document.createElement("li");
//   let listItemFace = document.createElement("li");
//   let score = array.length;
//   let suit = obj.suit;
//   let face = obj.num;
//   listItemScore.textContent = score;
//   listItemSuit.textContent = suit;
//   listItemFace.textContent = face;
//   list.appendChild(listItemScore);
//   list.appendChild(listItemSuit);
//   list.appendChild(listItemFace);
//   return list;
// };
function clearList(id) {
  document.getElementById(id).innerHTML = ' ';
}

function winner(array) {
  if (array[0].length === 52) {
    console.log('player 1 won');
    gameIsOver = true;
    return gameIsOver;
  } else if (array[1].length === 52) {
    console.log('player 2 won');
    gameIsOver = true;
    return gameIsOver;
  } else {
    return gameIsOver;
  }
}

//  function renderCard(card, position){
//   let move = position * 40;
//   let backgroundColor = (card.icon == "H" || card.icon == "D" ? "red" : "black")
//   let buildCard ='<div class = "dcard" '+card.suit+' style = "color:'+backgroundColor+'">'+ card.num + '&' + card.suit + ';';
//   console.log(card, move);
//   return buildCard ;
// }
function renderCard(card, position) {
  let move = position * 40;
  // let backgroundColor = (card.icon == "H" || card.icon == "D" ? "red" : "black")
  let buildCard = '<div class="dcard ' + card.suit + ' "style = "left:' + move + 'px">';
  buildCard += '<div class="cardtop suit"> ' + card.num + ' <br></div>';
  buildCard += '<div class="cardmid suit"></div>';
  buildCard += '<div class="cardbottom suit"> ' + card.num + ' <br></div></div>';
  console.log(card, move);
  return buildCard;
}
