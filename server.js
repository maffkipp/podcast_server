// Dependencies
const express = require('express');
const axios = require('axios');
const Audiosearch = require('audiosearch-client-node');


require('dotenv').config();

// App Setup
const app = express();
const port = process.env.PORT || 3000;


// Added new method to audiosearch prototype for random episode
Audiosearch.prototype.getRandom = function () {
  return this.get('/random_episode');
};

const audiosearch = new Audiosearch(process.env.AUDIOSEARCH_APP_ID, process.env.AUDIOSEARCH_SECRET);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// Routes
app.get('/', (req, res) => {
  audiosearch.searchEpisodes('funny').then(response => {
    res.send(response);
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

app.get('/random', (req, res) => {
  audiosearch.getRandom().then(response => {
    res.send(response);
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

app.get('/categories/:query', (req, res) => {
  audiosearch.searchEpisodes(req.params.query).then(response => {
    res.send(response);
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

app.get('/trending', (req, res) => {
  audiosearch.getTrending().then(response => {
    res.send(response);
  }).catch(err => {
    res.send(`Error: ${err}`);
  });
});

// App Start
app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`App running on port ${port}`);
  }
});
