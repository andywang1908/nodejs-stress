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

var task2goods = function(summary, taskFolder) {
  //write summary to html

}

var main = function(taskFolder) {
  var summary = require(taskFolder+'kpi.json')
  //danger
  //var summary = {} //restart
  Util.logConsole('info', 'Finished tasks number:' + Object.keys(summary).length)

  var goods = require(taskFolder+'goods.json')
  //var goods = {}
  //console.log(goods)

  //var idx = 0
  for (var key in summary) {
    if (summary.hasOwnProperty(key)) {
      var deals = summary[key]
      var dealsLength = deals.length

      for (var i = 0; i < dealsLength; i++) {
        var single = deals[i]
        var singleHref = single['href']
        var singleInput = single['input']

        var goodsSingle = goods[singleHref]
        if ( goodsSingle ) {
        } else {
          goodsSingle = {}
          goodsSingle.history = {}

          goods[singleHref] = goodsSingle
        }

        if ( goodsSingle.history[ singleInput ] ) {
          //console.log(112)
        } else {
          goodsSingle.title = single['title']
          goodsSingle.brand = single['brand']
          goodsSingle.desc = single['desc']
          goodsSingle.history[ singleInput ] = {
            'p1': single['p1'],
            'p2': single['p2'],
            'ratio': single['ratio']
          }
        }

      }
    }
  }
  //console.log(goods)
  Util.logFile(taskFolder + 'goods.json', JSON.stringify(goods))
  //return
}

main('./task/sportchek/')
