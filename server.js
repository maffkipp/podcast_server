// Dependencies
const express = require('express');
const axios = require('axios');
const Audiosearch = require('audiosearch-client-node');


require('dotenv').config();

// App Setup
const app = express();
const port = process.env.PORT || 3000;

const audiosearch = new Audiosearch(process.env.AUDIOSEARCH_APP_ID, process.env.AUDIOSEARCH_SECRET);


// Routes
app.get('/', (req, res) => {
  audiosearch.searchEpisodes('funny').then(results => {
    res.send(results);
  }).catch(error => {
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
