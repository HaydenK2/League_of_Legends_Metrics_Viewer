var express = require('express');
var router = express.Router();

/* GET transcation page. */
router.get('/', function(req, res, next) {
  res.render('transaction', { title: 'Express' });
});

module.exports = router;