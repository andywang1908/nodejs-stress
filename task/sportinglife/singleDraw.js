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
var singleDraw = function(task, summary, tasks) {

//console.log(summary)

task = constant.urlBase + task + '?howMany=480'
//task = 'http://www.sportinglife.ca/sportinglife/brand/694/Nike'

if ( summary[task] ) {
  return
}
var deals = []
var datetime = new Date()

return util.crab(task)
.spread(function (response, body) {
  //util.logConsole('debug', "band list finish");
  //logFile("log/StepApply.html", body)

  var $ = cheerio.load(body)
  
  var subway = -1
  $('div.col-md-4 > a').each(function(i, elem) {
    subway = i
    console.log('>>>a:'+$(this).attr('href'))
    tasks.push( $(this).attr('href') )
  })

  if ( subway == -1 ) {
    //console.log('this is leaf')
  } else {
    console.log('this is not leaf')
    return //must return , can not save this middle task
  }

  $('div.price div p span.red').each(function(i, elem) {
    var priceLow = $(this).text().trim().substring(1)
    var priceHight = $(this).parent().parent().find('span').eq(0).text().trim().substring(1)
    var ratio = (priceLow/priceHight+'').substring(0,4)
    var parentGood = $(this).parent().parent().parent().parent().parent() // 
    var iconGood = parentGood.find('div.image-container a img')
    var aGood = parentGood.find('div.product-name a')
    var aBrand = parentGood.find('div.product-name h4 strong').text().trim().toUpperCase()
    if ( ratio<=0.8 ) {
      console.log( ":"+aBrand+":"+datetime )
      console.log( priceHight+':cheap to:'+priceLow+":"+ratio+"\n"+aGood.find('h5').text().trim()+"\n"+aGood.attr('href')+"\n" )
      //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
      //util.logFile("log/summary.html", summary)

      var deal = {
        'p1':priceHight
        ,'p2':priceLow
        ,'ratio':ratio
        ,'desc':aGood.find('h5').text().trim()
        ,'href':constant.urlBase+aGood.attr('href')
        ,'icon':constant.urlBase+iconGood.attr('src')
        ,'brand':aBrand
        ,'input':datetime
      }
      deals.push(deal)
    }
  })

  summary[task] = deals
  util.logFile('./task/sportinglife/kpi.json', JSON.stringify(summary) );//, 'utf-8'
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
