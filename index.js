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
mapTask.mapTask(tasks)
.then(function() {
  util.logConsole('info', 'tasks are created!')
  //util.logConsole('debug', tasks)

  //return
  var Promise = require("bluebird");
  var singleDraw = require(taskFolder+'singleDraw.js')

  Promise.map(tasks, function(task) {
    // console.log(task)
    return singleDraw.singleDraw(task)
  }, {concurrency: 5}).then(function() {
    console.log("All done!!!")
  })
})

