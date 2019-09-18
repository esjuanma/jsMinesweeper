const path = require('path');

// Express
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/player', require('./server/routes/player'));

app.listen(process.env.PORT || 8080);
