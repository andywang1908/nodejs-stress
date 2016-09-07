var util = require('../../util.js')
var constant = require('./constant.json')  //.dan .demo
/*
constant.formPlateNumber = { step: '1'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  //, prevPlateNum: constant.plateNumber
  , termOfUse: 'true'
  , simulator: 'true'
}
var calFullUrl = function(part) {
  return constant.urlBase + part
}*/

var cheerio = require('cheerio')
var mapTask = function(tasks) {
return util.crab(constant.urlApply)
.spread(function (response, body) {
  util.logFile("log/StepApply.html", body)
  //return util.crab(constant.urlPlateNumber)

  var $ = cheerio.load(body)
  $('ul li.col-xs-6 a').each(function(i, elem) {
    //console.log( $(this).attr('href') )
    var href = $(this).attr('href')
    if ( href.indexOf(';jsessionid')>0 ) {
      href = href.substring(0, href.indexOf(';jsessionid'))
    }
    tasks.push( href )//?howMany=480
  })

  //util.logConsole( $('.branddiv a').length )
})
}
exports.mapTask = mapTask
