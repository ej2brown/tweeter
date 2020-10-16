'use strict';

// Basic express setup:
const PORT = process.env.PORT || 8000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// app.use(express.static('public'));

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require('./lib/in-memory-db');
// const db = [
//   {
//     'user': {
//       'name': 'Newton',
//       'avatars': 'https://i.imgur.com/73hZDYK.png',
//       'handle': '@SirIsaac',
//     },
//     'content': {
//       'text': 'If I have seen further it is by standing on the shoulders of giants',
//     },
//     'created_at': 1461116232227,
//   },
//   {
//     'user': {
//       'name': 'Descartes',
//       'avatars': 'https://i.imgur.com/nlhLi3I.png',
//       'handle': '@rd'},
//     'content': {
//       'text': 'Je pense , donc je suis',
//     },
//     'created_at': 1461113959088,
//   },
// ];
// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
// const DataHelpers = require('./lib/data-helpers.js')(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` obj
// so it can define routes that use it to interact with the data layer.
// const tweetsRoutes = require('./routes/tweets')(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
// app.use('/tweets', tweetsRoutes);
app.get('/', (req, res) => {
  res.json({response: 'it worked!!'});
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});