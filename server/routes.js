const path = require('path');

module.exports = function(app, express){
  let router = express.Router();
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  app.get('/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/styles.css'));
  });
  app.get('/js/game.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/game.js'));
  });
  app.get('/cards.min.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards.min.css'));
  });
  app.get('/LifeJack.png', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/LifeJack.png'));
  });
  // Getting each card individually, need to find efficient way to bring these images in...
  app.get('/cards/2S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/2S.svg'));
  });
  app.get('/cards/2C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/2C.svg'));
  });
  app.get('/cards/2D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/2D.svg'));
  });
  app.get('/cards/2H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/2H.svg'));
  });
  app.get('/cards/3S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/3S.svg'));
  });
  app.get('/cards/3C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/3C.svg'));
  });
  app.get('/cards/3D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/3D.svg'));
  });
  app.get('/cards/3H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/3H.svg'));
  });
  app.get('/cards/4S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/4S.svg'));
  });
  app.get('/cards/4C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/4C.svg'));
  });
  app.get('/cards/4D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/4D.svg'));
  });
  app.get('/cards/4H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/4H.svg'));
  });
  app.get('/cards/5S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/5S.svg'));
  });
  app.get('/cards/5C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/5C.svg'));
  });
  app.get('/cards/5D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/5D.svg'));
  });
  app.get('/cards/5H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/5H.svg'));
  });
  app.get('/cards/6S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/6S.svg'));
  });
  app.get('/cards/6C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/6C.svg'));
  });
  app.get('/cards/6D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/6D.svg'));
  });
  app.get('/cards/6H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/6H.svg'));
  });
  app.get('/cards/7S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/7S.svg'));
  });
  app.get('/cards/7C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/7C.svg'));
  });
  app.get('/cards/7D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/7D.svg'));
  });
  app.get('/cards/7H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/7H.svg'));
  });
  app.get('/cards/8S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/8S.svg'));
  });
  app.get('/cards/8C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/8C.svg'));
  });
  app.get('/cards/8D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/8D.svg'));
  });
  app.get('/cards/8H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/8H.svg'));
  });
  app.get('/cards/9S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/9S.svg'));
  });
  app.get('/cards/9C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/9C.svg'));
  });
  app.get('/cards/9D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/9D.svg'));
  });
  app.get('/cards/9H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/9H.svg'));
  });
  app.get('/cards/10S.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/10S.svg'));
  });
  app.get('/cards/10C.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/10C.svg'));
  });
  app.get('/cards/10D.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/10D.svg'));
  });
  app.get('/cards/10H.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/10H.svg'));
  });
  app.get('/cards/JS.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/JS.svg'));
  });
  app.get('/cards/JC.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/JC.svg'));
  });
  app.get('/cards/JD.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/JD.svg'));
  });
  app.get('/cards/JH.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/JH.svg'));
  });
  app.get('/cards/QS.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/QS.svg'));
  });
  app.get('/cards/QC.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/QC.svg'));
  });
  app.get('/cards/QD.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/QD.svg'));
  });
  app.get('/cards/QH.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/QH.svg'));
  });
  app.get('/cards/KS.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/KS.svg'));
  });
  app.get('/cards/KC.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/KC.svg'));
  });
  app.get('/cards/KD.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/KD.svg'));
  });
  app.get('/cards/KH.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/KH.svg'));
  });
  app.get('/cards/AS.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/AS.svg'));
  });
  app.get('/cards/AC.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/AC.svg'));
  });
  app.get('/cards/AD.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/AD.svg'));
  });
  app.get('/cards/AH.svg', (req, res) => {
    res.sendFile(path.join(__dirname, '../cards/AH.svg'));
  });
}
