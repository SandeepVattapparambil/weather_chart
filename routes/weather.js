var express = require('express');
var router = express.Router();

/* GET weather home. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather Forecast'
  });
});

module.exports = router;
