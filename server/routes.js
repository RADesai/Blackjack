const path = require('path');

module.exports = function(app, express){
  let router = express.Router();
  app.get('/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/styles.css'));
  });
  app.get('/js/game.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/game.js'));
  });
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}
