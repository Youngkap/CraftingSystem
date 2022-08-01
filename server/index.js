const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const config = require('../config.js');
const morgan = require('morgan');
const { client } = require('../database/index.js');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));




app.listen(PORT, () => {
    console.log(`Server listening at localhost:${PORT}!`);
  });
  