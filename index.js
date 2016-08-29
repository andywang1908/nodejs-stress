require('events').EventEmitter.prototype._maxListeners = 100
var util = require('./util.js')

/*
var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "s2i_hot",
    password      : "s2i_hot",
    connectString : "susracdev.service.cihs.gov.on.ca:1525/susdev"
  },
  function(err, connection)
  {
    if (err) { console.error(err); return; }
    connection.execute(
      "SELECT * from hot_cycle where cycle_id = 161",
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });

return*/

var taskFolder = './task/toysrus/'

var mapTask = require(taskFolder+'mapTask.js')
var tasks = [] //new Array(1)
var summary = require(taskFolder+'kpi.json')
//summary = {} //restart
console.log( Object.keys(summary).length )

//write summary to html
var html = ''
var htmlCount = 0
for (var key in summary) {
  if (summary.hasOwnProperty(key)) {
    var deals = summary[key]
    var dealsLength = deals.length

    for (var i = 0; i < dealsLength; i++) {
      if ( deals[i]['ratio']<=0.6 ) {
        html += '<li>'+deals[i]['p1']+':cheap to:'+deals[i]['p2']+":"+deals[i]['ratio']+":"+'<a href="'+deals[i]['href']+'" target="_blank">'+deals[i]['desc']+'</a><img src="'+deals[i]['icon']+'"/></li>\n'
        htmlCount++
      }
    }
  }
}
util.logFile(taskFolder+'summary.html', '<li>total:'+htmlCount+'</li>'+html );
//return;

mapTask.mapTask(tasks)
.then(function() {
  util.logConsole('info', 'tasks are created!')
  //util.logConsole('debug', tasks)
  //tasks = tasks.slice(0, 9);

  //return
  var Promise = require("bluebird");
  var singleDraw = require(taskFolder+'singleDraw.js')

  Promise.map(tasks, function(task) {
    // console.log(task)
    return singleDraw.singleDraw(task, summary)
  }, {concurrency: 5}).then(function() {
    //console.log(summary)
    util.logFile(taskFolder+'kpi.json', JSON.stringify(summary) );
    console.log("All done!!!")
  })
})

