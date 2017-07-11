import Dexie from 'dexie';
import { appendArticles } from './main.js';

let db = new Dexie('fakeNews');

db.version(1).stores({
  articles: 'id, headline, byline'
});

export const saveOfflineArticle = (article) => {
  // save article to IndexedDB
}

export const checkOfflineAvailability = (id) => {
  // get article from IndexedDB
}

export const removeOfflineArticle = (id) => {
  // remove article from IndexedDB
}

export const loadOfflineArticles = () => {
  db.articles.toArray()
  .then(articles => appendArticles(articles))
  .catch(error => console.log('error: ', error));
}; 