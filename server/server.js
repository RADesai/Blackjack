const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 2121;
const routes = require('./routes');

// var db = require('./config/db');

// connect to our mongoDB database
// (uncomment after you enter credentials in config/db.js)
// mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(express.static(path.join(__dirname + '../public')));
app.use(express.static(path.join(__dirname + '/public')));

app.use(cors());
app.options('*', cors());
app.delete('*', cors());

routes(app, express);
app.listen(port, () => console.log(`Magic happens on port ${port}`));

exports = module.exports = app;
