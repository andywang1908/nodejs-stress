var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require("bluebird")
var cheerio = require('cheerio')
var mapTask = function(tasks) {

  tasks.push('ABCG001')
  tasks.push('ABCG002')
  tasks.push('ABCG003')

  return Promise.resolve()

  return util.crab(constant.urlApply)
    .spread(function(response, body) {

    //https://newspaint.wordpress.com/2015/09/06/how-to-get-cookies-from-node-js-http-response/
    var setcookie = response.headers["set-cookie"]
    if ( setcookie ) {
      setcookie.forEach(
        function ( cookiestr ) {
          console.log( "COOKIE:" + cookiestr )
        }
      )
    }
    console.log('--COOKIE----!!!!!!!!!!!!!'+setcookie.length)

      //return util.crab(constant.urlPlateNumber)
    })
}
exports.mapTask = mapTask
