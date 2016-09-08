'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Promise = require("bluebird")

exports.Multi = function() {


const winston = require('winston')
winston.level = 'debug' //debug error info
var logConsole = function(level, content) {
  winston.log(level, content)
}
this.logConsole = logConsole

const fs = Promise.promisifyAll(require("fs"))
var logFile = function(fileName, content) {
  fs.writeFile(fileName, content)
}
this.logFile = logFile

var request = Promise.promisifyAll(require("request").defaults({ jar: true }), {multiArgs: true})
//var request = Promise.promisify(require("request"));
//request = Promise.promisifyAll(request);
//Promise.resolve(setTimeout(sleep, 3000)).then(function() {
//Promise.reject();
//http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128
var crab = function(urlNew) {
  var options = {
    //url: urlNew
    a:'a'
    //,proxy:'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'
    ,timeout: 80000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };
  //logConsole('debug', 'request begin:'+urlNew)

  return request.getAsync(urlNew, options)
}
this.crab = crab

var brab = function(urlNew, formParams) {
  var options = {
    //url: urlNew
    a:'a'
    //,proxy:'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'
    ,timeout: 50000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  /*
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
  }*/
  options.form = formParams

  return request.postAsync(urlNew, options);
}
this.brab = brab

var arab = function(urlNew, requestDataString) {
  var options = {
    //url: urlNew
    a:'a'
    //,proxy:'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'
    ,timeout: 50000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      ,"content-type": "application/json"
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };
  options.body = requestDataString

  return request.postAsync(urlNew, options);
}
this.arab = arab


}

