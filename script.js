
document.addEventListener('DOMContentLoaded', function() {


let quotesResponse = [];


// Fetch Quotes from API
const fetchQuotes = async() => {
    try {
        const apiURL = 'https://type.fit/api/quotes';
        const response = await fetch(apiURL);
        quotesResponse = await response.json()
        newQuote()
    } catch (error) {
        console.log(error);
    }
}

// DOM Manipulation
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Get Random New Quote

let newQuote = () => {
    loading()
    let quote = quotesResponse[Math.floor(Math.random() * quotesResponse.length)]  
    console.log(quote);


// replace null author with undefined
    if(quote.author === null){
        authorText.textContent = 'Unknown';
    } else {
    let onlyAuthor = quote.author.split(",")
    authorText.textContent = onlyAuthor[0];
    }

// check length of quote add style for font accordingly
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    completed()
}


// Post the quote as tweet 
const postTweet = () => {
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`

    window.open(twitterUrl, '_blank')
}

// Event Listener
twitterButton.addEventListener('click', postTweet)
newQuoteButton.addEventListener('click', newQuote)

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true
}

function completed(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

fetchQuotes()
});