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
  $('span.product-title-text').each(function(i, elem) {
    //console.log( $(this).attr('href') )
    var brandName = $(this).text().trim().replace(/ /g, "+")
    if ( brandName=='CCM' ) {
      brandName='C.C.M.'
    } else if ( brandName=='GOPRO' ) {
      brandName='GO+PRO'
    } else if ( brandName=='SKULLCANDY' ) {
      brandName='SKULL+CANDY'
    } else if ( brandName=='SMS+Audio' ) {
      brandName='SMS'
    } else if ( brandName=='CCM' ) {
      brandName='C.C.M.'
    }
    var mylist = ['AUCLAIR', 'GORE-TEX', 'VESTAL', 'UMBRO', 'SUNDOG', 'SPECIALIZED', 'K2+SKI', 'K2+SNOW', 'NIKE+GOLF']
    if ( mylist.indexOf(brandName)>-1 ) {
    } else {
      var href = 'https://www.sportchek.ca/services/sportchek/search-and-promote/products?x1=brand&q1='+brandName+'&page=1&count=2000'
      tasks.push( href )//?howMany=480
    }

  })

  //util.logConsole( $('.branddiv a').length )
})
}
exports.mapTask = mapTask
