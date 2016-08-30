var Promise = require("bluebird")

var request = Promise.promisifyAll(require("request").defaults({ jar: true }), {multiArgs: true})
//var request = Promise.promisify(require("request"));
//request = Promise.promisifyAll(request);
//Promise.resolve(setTimeout(sleep, 3000)).then(function() {
//Promise.reject();

var cheerio = require('cheerio')
const fs = Promise.promisifyAll(require("fs"))
const winston = require('winston')
winston.level = 'debug' //debug error info
var constant = require('./constant.js')  //.dan .demo

constant.formPlateNumber = { step: '1'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  //, prevPlateNum: constant.plateNumber
  , termOfUse: 'true'
  , simulator: 'true'
};
constant.formContact = { step: '2'
  , plateSearchString1: constant.plateNumber
  , plateSearchString2: constant.plateNumber
  , simulator: 'true'

  //, hot01_plateInput1: constant.plateNumber
  //, hot01_plateInput2: constant.plateNumber
  , hot01_confirmVehicleYes: 'true'
  , confirmMyVehicle: 'true'
  , 'contactInfo.firstName': 'mario'
  , 'contactInfo.lastName': 'sankio'
  , 'contactInfo.phone': '4166758912'
  , 'contactInfo.email': 'mario.sankio@gmail.com'
  , 'emailReenter': 'mario.sankio@gmail.com'
}
/*clean others,or receive some other error*/
constant.formConfirm = {
  submitTo: "selectPaymentType" //get this value from console not source code
  ,viewName: ''
  ,certified: 'true'
  ,_certified: 'on'
}

var calFullUrl = function(part) {
  return constant.urlBase + part
}

var logFile = function(fileName, content) {
  fs.writeFile(fileName, content)
}

var crab = function(urlNew) {
  var options = {
    url: urlNew
    //,proxy:'https://ebc\\wangan1:Ontario2$@204.40.194.129:3128'
    ,timeout: 30000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  return request.getAsync(options)
}

var brab = function(urlNew, formParams) {
  var options = {
    url: urlNew
    //,proxy:'https://ebc\\wangan1:Ontario2$@204.40.194.129:3128'
    ,timeout: 30000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  if ( constant.urlSurvey==urlNew ) {
    winston.log('info', "---------------survey")
    options.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      ,"content-type": "application/json"
    }

    //json: requestData
    var requestDataString = fs.readFileSync("survey.json")
    options.body = requestDataString
  } else {
    options.form = formParams
  }

  return request.postAsync(options);
}

var singleDraw = function() {
return crab(constant.urlApply)
.spread(function (response, body) {
  winston.log('debug', "StepApply finish");
  logFile("log/StepApply.html", body)
  //return crab(constant.urlPlateNumber)

  var $ = cheerio.load(body)
  $('.branddiv a').each(function(i, elem) {
    console.log( $(this).attr('href') )
  })

  console.log( $('.branddiv a').length )
})
.then(function() {
  //fs.readFileAsync('ttc.txt')  
  winston.log('info', 'great success for one thread!')
})
.catch(function(e) {
  winston.log('error', "some exception to break:"+e)
})
.error(function(e) {
  winston.log('error', "some error to break"+e)
});
}
exports.singleDraw = singleDraw

singleDraw()
