var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main')
var trigger = require('./trigger/trigger')
var monitoring = require('./monitoring/monitoring')
var elasticsearch = require('elasticsearch');


var client = elasticsearch.Client({
  host: '169.56.93.139:9200'
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
// client.search({
// index: 'basketball'
// },function(err,resp,status) {
// var hits = resp.hits.hits;
//
// if(err) {
// 	console.log("Console already exists.");
// }
// else {
// 	console.log(hits);
// }
// });

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


router.get('/', function(req,res) {
	res.render('main.ejs', {
    title : 'Snapshot UI'
  });
});

router.get('/error', function(req,res) {
  console.log(JSON.stringify(req.query))
	res.render('error.ejs', {
    title : 'Snapshot error',
    task_name : '조회',
    error_msg : req.query.data.error.root_cause.reason,
    error_code : req.query.data.status
  });
});





function getapisummarycnt(month,startdt, enddt,log_fg,controller){
  return new Promise(function(resolve, reject){
    client.count({
     index: 'gw_log-'+month,
     body: {
       query: {
         bool: {
           must: [
              { match: { "Controller"    : controller } },
              { match: { "Log_fg" : log_fg } },
              { range: {
                "date": {
                  "gte": startdt,
                  "lte": enddt,
                  "format": "yyyy-MM-dd"
                  }
                }
              }
            ]
          }
        }
   }}, function(err, resp, status){
           resolve(resp);
  }
)}
)}





router.get('/api_summary_count', function(req,res){

 var fg = req.query.tdid
 var startdt = req.query.startdt
 var month = startdt.substr(0,7)
 var enddt = req.query.enddt
 if (fg=="api_delete_total_cnt") {
   var log_fg = "delete_obj error_log"
   var controller = "snapshotDeleteController"
 } else if (fg=="api_delete_total_success_cnt") {
   var log_fg = "delete_obj"
   var controller = "snapshotDeleteController"
 } else if (fg=="api_delete_total_fail_cnt") {
   var log_fg = "error_log"
   var controller = "snapshotDeleteController"
 } else if (fg=="api_create_total_cnt") {
   var log_fg = "create_obj error_log"
   var controller = "snapshotcreateController"
 } else if (fg=="api_create_total_success_cnt") {
   var log_fg = "create_obj"
   var controller = "snapshotcreateController"
 } else if (fg=="api_create_total_fail_cnt") {
   var log_fg = "error_log"
   var controller = "snapshotcreateController"
 } else if(fg=="api_result_total_cnt") {
   var log_fg = "result_obj error_log"
   var controller = "snapshotSelectController"
 } else if (fg=="api_result_total_success_cnt") {
   var log_fg = "result_obj"
   var controller = "snapshotSelectController"
 } else if (fg=="api_result_total_fail_cnt") {
   var log_fg = "error_log"
   var controller = "snapshotSelectController"
 }
       getapisummarycnt(month,startdt,enddt,log_fg,controller).then(function(resp){
        resp.tdid=fg
        res.send(resp)
      })
})

function getapierrorcnt(month,startdt, enddt,log_fg,controller,search_fg){
  return new Promise(function(resolve, reject){
    if (search_fg=="system_error"){
    client.count({
     index: 'gw_log-'+month,
     body: {
       query: {
         bool: {
           must: [
              { match: { "Controller"    : controller } },
              { match: { "Log_fg" : log_fg } },
              { match: { "code" : "800 500" } },
              { range: {
                "date": {
                  "gte": startdt,
                  "lte": enddt,
                  "format": "yyyy-MM-dd"
                  }
                }
              }
            ]
          }
        }
   }}, function(err, resp, status){
           resolve(resp);
         }
       )
    } else if (search_fg=="value_error"){
      client.count({
        index: 'gw_log-'+month,
        body: {
          query: {
            bool: {
              must: [
                 { match: { "Controller"    : controller } },
                 { match: { "Log_fg" : log_fg } },
                 { range: {
                   "date": {
                     "gte": startdt,
                     "lte": enddt,
                     "format": "yyyy-MM-dd"
                     }
                   }
                 }
               ],
              must_not: {
                match: { "code" : "800 500" }
              }
             }
           }
      }}, function(err, resp, status){
              resolve(resp);
            }
          )
      }
     })
}


router.get('/api_error_count', function(req,res){
  var fg = req.query.tdid
  var startdt = req.query.startdt
  var month = startdt.substr(0,7)
  var enddt = req.query.enddt
  if (fg=="api_create_errtype1_count") {
    var log_fg = "error_log"
    var controller = "snapshotcreateController"
    var search_fg = "value_error"
  } else if (fg=="api_create_errtype2_count") {
    var log_fg = "error_log"
    var controller = "snapshotcreateController"
    var search_fg = "system_error"
  } else if (fg=="api_result_errtype1_count") {
    var log_fg = "error_log"
    var controller = "snapshotSelectController"
    var search_fg = "value_error"
  } else if (fg=="api_result_errtype2_count") {
    var log_fg = "error_log"
    var controller = "snapshotSelectController"
    var search_fg = "system_error"
  } else if (fg=="api_delete_errtype1_count") {
    var log_fg = "error_log"
    var controller = "snapshotDeleteController"
    var search_fg = "value_error"
  } else if (fg=="api_delete_errtype2_count") {
    var log_fg = "error_log"
    var controller = "snapshotDeleteController"
    var search_fg = "system_error"
  }
  getapierrorcnt(month,startdt,enddt,log_fg,controller,search_fg).then(function(resp){
   resp.tdid=fg
   res.send(resp)
 })
})



function getsssummarycnt(month,startdt, enddt,success){
  return new Promise(function(resolve, reject){
    client.count({
     index: 'ss_log-'+month,
     body: {
       query: {
         bool: {
           must: [
              { match: { "success"    : success } },
              { range: {
                "startTime": {
                  "gte": startdt,
                  "lte": enddt,
                  "format": "yyyy-MM-dd"
                  }
                }
              }
            ]
          }
        }
   }}, function(err, resp, status){
           resolve(resp);
  }
)}
)}

function getsstotalcnt(month,startdt, enddt){
  return new Promise(function(resolve, reject){
    client.count({
     index: 'ss_log-'+month,
     body: {
       query: {
         bool: {
           must: [
              { range: {
                "startTime": {
                  "gte": startdt,
                  "lte": enddt,
                  "format": "yyyy-MM-dd"
                  }
                }
              }
            ]
          }
        }
   }}, function(err, resp, status){
           resolve(resp);
  }
)}
)}



router.get('/ss_summary_count', function(req,res){
  var fg = req.query.tdid
  var startdt = req.query.startdt
  var month = startdt.substr(0,7)
  var enddt = req.query.enddt
  if (fg=="ss_create_total_cnt") {
    getsstotalcnt(month,startdt,enddt).then(function(resp){
     resp.tdid=fg
     res.send(resp)
   })
  } else if (fg=="ss_create_total_success_cnt") {
    var success = "true"
    getsssummarycnt(month,startdt,enddt,success).then(function(resp){
     resp.tdid=fg
     res.send(resp)
   })
  } else if (fg=="ss_create_total_fail_cnt") {
    var success = "false"
    getsssummarycnt(month,startdt,enddt,success).then(function(resp){
     resp.tdid=fg
     res.send(resp)
   })
  }

})



function getsserrorcnt(month,startdt,enddt,success,reason){
  return new Promise(function(resolve, reject){
    client.count({
     index: 'ss_log-'+month,
     body: {
       query: {
         bool: {
           must: [
              { match: { "success"    : success } },
              { match: { "failReason"    : reason } },
              { range: {
                "startTime": {
                  "gte": startdt,
                  "lte": enddt,
                  "format": "yyyy-MM-dd"
                  }
                }
              }
            ]
          }
        }
   }}, function(err, resp, status){
           resolve(resp);
  }
)}
)}

router.get('/ss_error_count', function(req,res){
  var fg = req.query.tdid
  var startdt = req.query.startdt
  var month = startdt.substr(0,7)
  var enddt = req.query.enddt
  if (fg=="ss_create_errtype1_count") {
    var success = "false"
    var reason = "html"
  } else if (fg=="ss_create_errtype2_count") {
    var success = "false"
    var reason = "유효하지않은페이지!!"
  } else if (fg=="ss_create_errtype3_count") {
    var success = "false"
    var reason = "retry"
  } else if (fg=="ss_create_errtype4_count") {
    var success = "false"
     var reason = "failure"
  } else if (fg=="ss_create_errtype5_count") {
    var success = "false"
    var reason = "White"
  }
  getsserrorcnt(month,startdt,enddt,success,reason).then(function(resp){
    console.log("RESP"+JSON.stringify(resp))
   resp.tdid=fg
   res.send(resp)
 })
})




router.use('/main', main)
router.use('/trigger', trigger)
router.use('/monitoring', monitoring)

module.exports = router;
