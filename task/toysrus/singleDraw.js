var util = require('../../util.js')
var constant = require('./constant.js')  //.dan .demo
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
var singleDraw = function(task) {

task = constant.urlBase + task

return util.crab(task)
.spread(function (response, body) {
  var $ = cheerio.load(body)

  var aAll = $('a.page-viewall')
  var urlAll = task
  if ( aAll.length>=1 ) {
    //console.log('--------aAll.length"'+aAll.length)
    urlAll = constant.urlBase + $('a.page-viewall').attr('href')
  }
  return util.crab(urlAll)
})
.spread(function (response, body) {
  //util.logConsole('debug', "band list finish");
  //logFile("log/StepApply.html", body)

  var $ = cheerio.load(body)
  $('.price dd.list').each(function(i, elem) {
    var priceHight = $(this).text().trim().substring(1)
    var priceLow = $(this).parent().find('dd.ours').text().trim().substring(1)
    var ratio = priceLow/priceHight
    var parentGood = $(this).parent().parent().parent().parent().parent() // a.thumbnail
    var aGood = parentGood.find('a.title')
    if ( ratio<=0.6 ) {
      console.log( priceHight+':cheap to:'+priceLow+":"+ratio+"\n"+aGood.text().trim()+"\n"+aGood.attr('href')+"\n" )
    }
  })
})
/*
.then(function() {
  //fs.readFileAsync('ttc.txt')  
  util.logConsole('info', 'great success for one thread!')
})*/
.catch(function(e) {
  util.logConsole('error', "some exception to break:"+e)
})
.error(function(e) {
  util.logConsole('error', "some error to break"+e)
});
}
exports.singleDraw = singleDraw
