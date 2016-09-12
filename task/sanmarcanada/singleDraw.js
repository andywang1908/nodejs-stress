var util = require('../../util.js')
var constant = require('./constant.json')  //.dan .demo

var cheerio = require('cheerio')
var singleDraw = function(task, summary) {

//task = constant.urlBase + task

if ( summary[task] ) {
  return
}
console.log(task)
var deals = []
var datetime = new Date()

  var formQuery = {
    h: 'power',
    lang: 'en',
    selectStyle: task,
    checktofu: 'Y'
  }

return util.brab(constant.urlApply, formQuery)
.spread(function (response, body) {
  util.logFile("log/StepGhost3.html", body)
  //return
  var $ = cheerio.load(body)

  var aAll = $('table.productgrid')
  //console.log( aAll.html() )
})
}
exports.singleDraw = singleDraw

exports.Multi = function(){
  this.singleDraw = function(task, summary, tasks) {
    console.log('-----'+this.task)
    return singleDraw(task, summary, tasks)
  }
}
