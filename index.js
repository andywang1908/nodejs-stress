'use strict'

require('events').EventEmitter.prototype._maxListeners = 100
var Util = require('./util.js')
var Promise = require("bluebird")

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

var genHtml = function(summary, taskFolder) {
  //write summary to html
  var html = ''
  var htmlCount = 0
  for (var key in summary) {
    if (summary.hasOwnProperty(key)) {
      var deals = summary[key]
      var dealsLength = deals.length

      for (var i = 0; i < dealsLength; i++) {
        if (deals[i]['ratio'] <= 0.7) { // && key.indexOf('category')>-1
          html += '<li>' + deals[i]['brand'] + ':' + deals[i]['p1'] + ':cheap to:' + deals[i]['p2'] + ':' + deals[i]['ratio'] + ':' + '<a href="' + deals[i]['href'] + '" target="_blank">' + deals[i]['desc'] + '</a><imga src="' + deals[i]['icon'] + '"/></li>\n'
          htmlCount++
        }
      }
    }
  }
  Util.logFile(taskFolder + 'summary.html', '<li>total:' + htmlCount + '</li>' + html)
  //return
}

var main = function(taskFolder) {
  var tasks = [] //new Array(1)
  var summary = require(taskFolder+'kpi.json')
  //danger
  //var summary = {} //restart
  Util.logConsole('info', 'Finished tasks number:' + Object.keys(summary).length)

  genHtml(summary, taskFolder)

  var mapTask = require(taskFolder+'mapTask.js')

  mapTask.mapTask(tasks)
    .then(function() {
      Util.logConsole('info', 'tasks are created!')
      tasks = tasks.slice(0, 1);
      //Util.logConsole('debug', tasks)
      //return

      return Promise.map(tasks, function(task) {

        var Multi = require(taskFolder + 'singleDraw.js').Multi
        var singleDraw = new Multi()
        singleDraw.task = task
        //singleDraw = require(taskFolder + 'singleDraw.js')

        return singleDraw.singleDraw(task, summary, tasks)
      }, { concurrency: 2 }).then(function() {
        Util.logFile(taskFolder + 'kpi.json', JSON.stringify(summary))
      })
    })
    .then(function() {
      return Util.logConsole('info', 'Here must be last!!!')
    })
    .catch(function(e) {
      Util.logConsole('error', 'global exception to break:' + e)
    })
    .error(function(e) {
      Util.logConsole('error', 'global error to break:' + e)
    })
}

main('./task/sanmarcanada/')
