var express = require('express');
var router = express.Router();

/* GET misc page. */
router.get('/', function(req, res, next) {
  res.render('skin_metrics', { title: 'Express' });
});

module.exports = router;