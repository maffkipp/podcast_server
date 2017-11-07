// Dependencies
const express = require('express');
const axios = require('axios');
const Audiosearch = require('audiosearch-client-node');


require('dotenv').config();

// App Setup
const app = express();
const port = process.env.PORT || 3000;

const audiosearch = new Audiosearch(process.env.AUDIOSEARCH_APP_ID, process.env.AUDIOSEARCH_SECRET);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// Routes
app.get('/', (req, res) => {
  audiosearch.searchEpisodes('funny').then(response => {
    res.send(response);
  }).catch(error => {
    res.send(`Error: ${err}`);
  });
});

app.get('/random', (req, res) => {
  axios.get('//www.audiosear.ch/api/random_episode')
  .then(response => {
    res.send(response);
  }).catch(err => {
    console.log(`Error: $(err)`);
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
