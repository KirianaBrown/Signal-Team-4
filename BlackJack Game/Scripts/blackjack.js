// Variables to be used when declaring new classes and resetting the program
var user
var computer
var newDeck
var imageCounter =  5


// Variables used for storing data
var playerArray = []
var playerWinCounter = 0
var computerWinCounter = 0
var userWinCount
var firstTime = true;
var winner

// To be used for when the player wants to draw a new card
function hitButton () {
  bleep.play()
  var card = user.cardDraw(newDeck)
  // Displays the card on the html
  document.getElementById('image' + imageCounter).src = user.displayCard(card)
  imageCounter++

  document.getElementById('playerScore').innerHTML = user.handCount
  if (user.handCount > 21) {

    document.getElementById('overlay').style.display = "block"
    document.getElementById('bust').innerHTML = compareScore()

    //var result = compareScore()
    //document.getElementById('bust').innerHTML = compareScore()
    //document.getElementById('bust').innerHTML = result

  }

}

// To be used at the start of the game, gives two cards to the player and enables the hit and stand buttons
function dealButton () {
  document.getElementById('deal_button').style.display = 'none';
  document.getElementById('replay_button').style.display = 'block';
  bleep.play()
  document.getElementById("deal_button").disabled = true;
  document.getElementById("hit_button").disabled = false;
  document.getElementById("stand_button").disabled = false;
  // Decalring new instances of classes to reset the attributes so the game begins from fresh again
  user = new Player()


var str = (document.getElementById("playerName").value);
user.name = str.toUpperCase();

if (firstTime) {

  recallData(user.name)
}
  //user.name = document.getElementById("playerName").value
  //recallData(user.name)
  computer = new Player()
  computer.name = "Dealer"
  newDeck = new Deck()

  document.getElementById('computerScore').innerHTML = computer.handCount
  imageCounter = 5
  // creates two new cards and displays them on the board
  var card = user.cardDraw(newDeck)
  document.getElementById('image3').src = user.displayCard(card)
  card = user.cardDraw(newDeck)
  document.getElementById('playerScore').innerHTML = user.handCount
  document.getElementById('image4').src = user.displayCard(card)

}

// To be used when the player is finished drawing Cards
// Will give two cards to the computer and then compare the score of the player and computer
function standButton () {

  bleep.play()
  // Reenables the hit and stand buttons and diables the replay button
  document.getElementById("stand_button").disabled = true;
  document.getElementById("hit_button").disabled = true;
  document.getElementById("replay_button").disabled = false;

  // Creates two new cards and adds them to the computer's hand and displays them on the board
  var card = computer.cardDraw(newDeck)
  document.getElementById('image1').src = computer.displayCard(card)
  card = computer.cardDraw(newDeck)
  document.getElementById('image2').src = computer.displayCard(card)

  document.getElementById('computerScore').innerHTML = computer.handCount
    document.getElementById('overlay').style.display = "block"
  document.getElementById('bust').innerHTML = compareScore()



}

function off(){
  document.getElementById("overlay").style.display ="none"
}




// TO be used when the user wants to replay the game, resets the game board by
// Removing all the card images

function replayButton () {
  bleep.play()
  document.getElementById('replay_button').style.display = 'none';
  document.getElementById('deal_button').style.display = 'block';

  document.getElementById('image1').src = computer.displayReset()
  document.getElementById('image2').src = computer.displayReset()
  document.getElementById('image3').src = user.displayReset()
  document.getElementById('image4').src = user.displayReset()
  document.getElementById('image5').src = user.displayReset()
  document.getElementById('image6').src = user.displayReset()
  document.getElementById('image7').src = user.displayReset()
  document.getElementById('bust').innerHTML = user.displayReset()
  user.handCount = 0
  computer.handCount = 0
  document.getElementById('playerScore').innerHTML = user.handCount
  document.getElementById('computerScore').innerHTML = computer.handCount
  document.getElementById("deal_button").disabled = false;
  document.getElementById("hit_button").disabled = true;
  document.getElementById("stand_button").disabled = true;
  document.getElementById("replay_button").disabled = true;
}

function compareScore () {
  var winner
  if (user.handCount > 21) {
    computerWinCounter = computerWinCounter + 1
    storeData(playerWinCounter, computerWinCounter);
    winner = user.name + " Bust!!"
    console.log(winner)
    document.getElementById("stand_button").disabled = true;
    document.getElementById("hit_button").disabled = true;
    document.getElementById("replay_button").disabled = false;
    //return winner
  }
  else if (user.handCount == computer.handCount) {
     winner = "Draw!!"
     console.log(user.handCount)
     console.log(computer.handCount)
     console.log(winner)
     //return winner
   }

   else if (user.handCount < computer.handCount) {
     computerWinCounter = computerWinCounter + 1
     storeData(playerWinCounter,computerWinCounter);
     winner = "Dealer wins!!"
     console.log(winner)
     console.log(user.handCount)
     console.log(computer.handCount)
   }
   else {
    playerWinCounter = playerWinCounter + 1
    //console.log(playerWinCounter)
    storeData(playerWinCounter,computerWinCounter);
     winner = user.name + " wins!!"
   }
  return winner
}

function storeData(playerWinsCounter1,computerWinCounter1)
{
  var userName= user.name
  var userScore = playerWinsCounter1
  var computerName = "Dealer"
  var computerScore = computerWinCounter1
  //var playerArray = []


  var plyObj = [{"playerName": userName, "playerScore": userScore},{"playerName":computerName,"playerScore": computerScore}];
  playerArray.push(plyObj);
  localStorage.playerRecord = JSON.stringify(plyObj);
  playerArray = JSON.parse(localStorage.playerRecord);
  console.log(playerArray)
  document.getElementById('playerWins').innerHTML = playerArray[0].playerScore
  document.getElementById('computerWins').innerHTML = playerArray[1].playerScore
}

function recallData(userName)
    {
      firstTime = false;
      playerArray = JSON.parse(localStorage.playerRecord);
        if (playerArray[0].playerName == userName)
        {
          window.alert("Last top score : " +userName +' '+ playerArray[0].playerScore + " Dealer "+ playerArray[1].playerScore  )
            document.getElementById('playerWins').innerHTML = playerArray[0].playerScore
          }
        else
        {

        window.alert("No data avaiable. Please continue playing")

        }
   }

   function userName()
   {
     window.alert("Please enter your name")
   }
