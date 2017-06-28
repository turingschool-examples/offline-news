const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const requireHTTPS = (req, res, next) => {
  if (!req.secure) {
    console.log('is NOT secure: ', req);
      //FYI this should work for local development as well
      return res.redirect('https://' + req.get('host') + req.url);
  }
  console.log('IS secure');
  next();
};

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.articles = [
  { id: 1, headline: 'Penguins defeat Senators in 2OT of Game 7, return to Cup Final', byline: 'Bob Loblaw' },
  { id: 2, headline: 'Penguins will play Predators in Stanley Cup Final', byline: 'Bob Loblaw' },
  { id: 3, headline: 'Playoff Buzz: What we learned Thursday', byline: 'Bob Loblaw' },
];

app.get('/', (request, response) => {
  response.sendFile('index.html')
});

app.get('/api/v1/articles', requireHTTPS, (request, response) => {
  response.status(200).json(app.locals.articles);
});

app.post('/api/v1/articles', requireHTTPS, (request, response) => {
  app.locals.articles.push(request.body);
  response.status(201).json(app.locals.articles);
});

app.listen(app.get('port'), () => { 
  console.log(`App running on port ${app.get('port')}`);
});

module.exports = app;
