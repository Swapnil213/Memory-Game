const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let matchedCards = 0;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImage = cardOne.querySelector("img").src;
        cardTwoImage = cardTwo.querySelector("img").src;
        matchCards(cardOneImage, cardTwoImage);
    }
}

function matchCards(img1, img2) {
    //if cards matches
    if (img1 === img2) {
        matchedCards++; // incrment value of matched cards
        // When user matched all the cards
        if (matchedCards == 8) {
            setTimeout(() => {
                return shuffleCard(); 
            }, 1000);//calling shuffle catrds function after 1s
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting card values to blank
        return disableDeck = false;
    }
    
    // if cards are not matched
    setTimeout(() => {
        //adding shake class to both cards after 0.4s
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        //removing both shake and flip class from cards
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";//setting card values to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCards = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    //creating array for all cards
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);// sorting arrayitems randomly
    cards.forEach((card, index) => {
        //adding click event to all cards
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard)
    });
}

shuffleCard();

cards.forEach(card => {
    //adding click event to all cards
    card.addEventListener("click", flipCard)
});