var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main')
var trigger = require('./trigger/trigger')
var monitoring = require('./monitoring/monitoring')

//url routing
router.get('/', function(req,res) {
	res.render('main.ejs', { 
    title : 'test'
  });
});

router.use('/main', main)
router.use('/trigger', trigger)
router.use('/monitoring', monitoring)

module.exports = router;
