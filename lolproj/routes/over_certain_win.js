var express = require('express');
var router = express.Router();

/* GET misc page. */
router.get('/', function(req, res, next) {
  res.render('over_certain_win', { title: 'Express' });
});

module.exports = router;