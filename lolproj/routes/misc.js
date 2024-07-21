var express = require('express');
var router = express.Router();

/* GET misc page. */
router.get('/', function(req, res, next) {
  res.render('misc', { title: 'Express' });
});

module.exports = router;
