const quoteBtn = document.querySelector('.change-quote'),
    quoteText = document.querySelector('.quote'),
    quoteAuthor = document.querySelector('.author'),
    quoteBox = document.querySelector('.quote-box');

let quotesNumber;
let randomQuote;

async function getQuote (){
    const quotes = 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    const data = await res.json();
    quotesNumber = data.length;
    // console.log(data);
    getRandomQuote()

    quoteText.textContent = `"${data[randomQuote].text}"`;
    quoteAuthor.textContent = `${data[randomQuote].author}`;
}

getQuote();

function getRandomQuote() {
    randomQuote = Math.floor(Math.random() * quotesNumber + 1);
}

quoteBtn.addEventListener('click', getQuote)