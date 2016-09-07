'use strict'

require('events').EventEmitter.prototype._maxListeners = 100
var Util = require('./util.js')
//var Promise = require("bluebird")

var taskFix = function(summary, taskFolder) {
  //write summary to html
  for (var key in summary) {
    if (summary.hasOwnProperty(key)) {
      var deals = summary[key]
      var dealsLength = deals.length

      for (var i = 0; i < dealsLength; i++) {
        if ( deals[i]['title'] ) {
          deals[i]['title'] = deals[i]['title'].toLowerCase()
        } else if ( deals[i]['desc'] ) {
          deals[i]['title'] = deals[i]['desc'].toLowerCase()
          //delete deals[i]['desc']
        }
      }
    }
  }
  Util.logFile(taskFolder + 'kpi.1.json', JSON.stringify(summary))
  //return
  //override manually
}

var main = function(taskFolder) {
  var tasks = [] //new Array(1)
  var summary = require(taskFolder+'kpi.json')
  //danger
  //var summary = {} //restart
  Util.logConsole('info', 'Finished tasks number:' + Object.keys(summary).length)

  taskFix(summary, taskFolder)
}

main('./task/sportchek/')
