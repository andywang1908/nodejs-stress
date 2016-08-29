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
var singleDraw = function(task, summary) {

//console.log(summary)

task = constant.urlBase + task

if ( summary[task] ) {
  return
}
var deals = []

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
    var ratio = (priceLow/priceHight+'').substring(0,4)
    var parentGood = $(this).parent().parent().parent().parent().parent() // 
    var iconGood = parentGood.find('img.thumbnail')
    var aGood = parentGood.find('a.title')
    if ( ratio<=0.8 ) {
      console.log( priceHight+':cheap to:'+priceLow+":"+ratio+"\n"+aGood.text().trim()+"\n"+aGood.attr('href')+"\n" )
      //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
      //util.logFile("log/summary.html", summary)

      var deal = {
        'p1':priceHight
        ,'p2':priceLow
        ,'ratio':ratio
        ,'desc':aGood.text().trim()
        ,'href':constant.urlBase+aGood.attr('href')
        ,'icon':constant.urlBase+iconGood.attr('src')
      }
      deals.push(deal)
    }
  })

  summary[task] = deals
  util.logFile('./task/toysrus/kpi.json', JSON.stringify(summary) );//, 'utf-8'
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
