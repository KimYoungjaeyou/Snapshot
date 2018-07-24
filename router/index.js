var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main')
var trigger = require('./trigger/trigger')
var monitoring = require('./monitoring/monitoring')
var elasticsearch = require('elasticsearch');


var client = elasticsearch.Client({
  host: 'localhost:9200'
});


// client.indices.create({
// index: 'test1'
// },function(err,resp,status) {
// if(err) {
// 	console.log("Console already exists.");
// }
// else {
// 	console.log("create",resp.index);
// }
// });
client.search({
index: 'basketball'
},function(err,resp,status) {
var hits = resp.hits.hits;

if(err) {
	console.log("Console already exists.");
}
else {
	console.log(hits);
}
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.search({
  q: 'basketball'
}).then(function (body) {
  var hits = body.hits.hits;
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log(hits);
  }
});



//url routing
client.search({
	index: 'basketball'
})

router.get('/', function(req,res) {
	res.render('main.ejs', {
    title : 'test'
  });
});

router.use('/main', main)
router.use('/trigger', trigger)
router.use('/monitoring', monitoring)

module.exports = router;
