import Dexie from 'dexie';
import { appendArticles } from './main.js';

// Creates a new IndexedDB database
let db = new Dexie('fakeNews');

// Creates an initial version of our database schema
// And defines an 'articles' table with columns for
// an id, headline and byline
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
  .catch(error => console.log({ error });
}; 