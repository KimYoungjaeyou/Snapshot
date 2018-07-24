var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


router.get('/', function(req,res) {
	res.render('monitoring.ejs',{
    title : 'CLOUDZ 모니터링'
  });
});
module.exports = router;
