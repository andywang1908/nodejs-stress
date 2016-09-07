var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var cheerio = require('cheerio')
var mapTask = function(tasks) {

  tasks.push('ABC001')
  tasks.push('ABC002')
  tasks.push('ABC003')

  return util.crab(constant.urlApply)
}
exports.mapTask = mapTask
