import { 
  loadOfflineArticles,
  checkOfflineAvailability,
  saveOfflineArticle,
  removeOfflineArticle } from './indexedDB';

const fetchLatestHeadlines = () => {
  fetch('/api/v1/articles')
  .then(response => response.json())
  .then(articles => appendArticles(articles))
  .catch(error => console.log('error: ', error));
};

// Add event listeners on the window for
// when a user comes online & offline
// A. When the user is online:
//     1. update the text in the connection-status <p> to say 'online'
//     2. fetch headlines from the server
// B. When a user is offline:
//     1. update the text in the connection-status <p> to say 'offline'
//     2. add an 'offline' class to the connection-status <p>
//     3. display only the articles from indexedDB

export const appendArticles = (articles) => {
  $('#latest-headlines').html('');
  let articlesFrag = document.createDocumentFragment();

  articles.forEach(article => {
    let articleElem = document.createElement('li');

    let headline = document.createElement('p');
    headline.innerText = article.headline;
    headline.dataset.articleId = article.id;

    let byline = document.createElement('span');
    byline.innerText = article.byline;

    articleElem.appendChild(headline);
    articleElem.appendChild(byline);
    articlesFrag.appendChild(articleElem);
  });

  $('#latest-headlines').append(articlesFrag);
};

$('#latest-headlines').on('click', 'p', function(event) {
  let elem = event.currentTarget;

  let id = elem.dataset.articleId;
  let headline = elem.innerText;
  let byline = elem.nextSibling.innerText;

  elem.classList.toggle('starred');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    fetchLatestHeadlines();
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        // Registration was successful
        console.log('ServiceWorker registration successful');
      }).catch(err => {
        // registration failed :(
        console.log(`ServiceWorker registration failed: ${err}`);
      });
  });
}