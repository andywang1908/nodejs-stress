var util = require('../../util.js')
var constant = require('./constant.json')  //.dan .demo

var cheerio = require('cheerio')
var mapTask = function(tasks) {


  var formLogin = {
    h: 'login',
    a: 'login',
    lang: 'en',
    id: '0',
    parentId: '0',
    catid: '0',
    shopH: '',
    custNum: '29967',
    email: 'lin@linsmart.com',
    psswrd: 'bntp016',
    accepttofu: 'Yes',
    checktofu: 'Y'
  }

return util.brab(constant.urlApply, formLogin)
.spread(function (response, body) {

    //https://newspaint.wordpress.com/2015/09/06/how-to-get-cookies-from-node-js-http-response/
    var setcookie = response.headers["set-cookie"];
    if ( setcookie ) {
      setcookie.forEach(
        function ( cookiestr ) {
          console.log( "COOKIE:" + cookiestr );
        }
      );
    }

  util.logFile("log/StepApply.html", body)
  //return
  //return util.crab(constant.urlPlateNumber)

  var $ = cheerio.load(body)
  $('select[name=selectStyle] option').each(function(i, elem) {
    //console.log( $(this).attr('href') )
    var id = $(this).attr('value')
    if ( id!='' ) {
      tasks.push( id )
    }
  })

})

}
exports.mapTask = mapTask
