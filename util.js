'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Promise = require("bluebird")

/*
var constant = require('./constant.js')  //.dan .demo

var calFullUrl = function(part) {
  return constant.urlBase + part
}
exports.calFullUrl = calFullUrl */

const winston = require('winston')
winston.level = 'debug' //debug error info
var logConsole = function(level, content) {
  winston.log(level, content)
}
exports.logConsole = logConsole

const fs = Promise.promisifyAll(require("fs"))
var logFile = function(fileName, content) {
  fs.writeFile(fileName, content)
}
exports.logFile = logFile

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
exports.crab = crab

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

  options.form = formParams

  return request.postAsync(urlNew, options)
}
exports.brab = brab

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
exports.arab = arab

  var webdriver = require('selenium-webdriver')
  var By = webdriver.By
  var until = webdriver.until

  var driver = null
var irab = function(urlNew) {
  if ( driver==null ) {
    var builder = new webdriver.Builder().forBrowser('firefox')
    //builder = Promise.promisifyAll(builder, {multiArgs: true})

  driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

  console.log(111)

  driver.get('about:blank')
  //return

  console.log(222)

  driver.get('http://www.canadiantire.ca/en/kids-zone/baby-toddler/car-seats-accessories.html')
  driver.get('http://www.google.ca')

    return Promise.resolve()
  } else {
    return Promise.resolve()
  }
}
exports.irab = irab

var srab = function(urlNew) {

  return Promise.resolve()
}
exports.srab = srab

exports.Multi = function(){
  //webClient
  //new (require('./user'))();
  //var webClient = JSON.parse(JSON.stringify(request))
  var webClient = request

  this.arab = function(urlNew, requestDataString) {
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

  return webClient.postAsync(urlNew, options);
  }
  this.brab = function(urlNew, formParams) {
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

  options.form = formParams

  return webClient.postAsync(urlNew, options)
  }
  this.crab = function(urlNew) {
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

  return webClient.getAsync(urlNew, options)
  }

  this.brabSession = function(urlNew, formParams, sessionId) {
  var options = {
    //url: urlNew
    a:'a'
    //,proxy:'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'
    ,timeout: 50000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      ,headers: {'Cookie': 'JSESSIONID='+sessionId}
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
  };

  options.form = formParams

  return webClient.postAsync(urlNew, options)
  }

  this.crabSession = function(urlNew, sessionId) {

  //TODO find a way to change cookie ,this way is not working
  //think about changing head set cookie,but it is useless
  //or cal js,this looks not possible
    /*
    var j = webClient.jar()
    console.log('JJJJJJJJ:'+JSON.stringify(j))
    var cookie = webClient.cookie('JSESSIONID='+sessionId);
    //var url = 'http://www.google.com';
    j.setCookie(cookie, 'https://wwwdev.mobile.services.ebc.gov.on.ca')
    console.log('KKKKKKKK:'+JSON.stringify(j))
    */

  var options = {
    //url: urlNew
    a:'a'
    //,proxy:'http://ebc%5Cwangan1:Ontario3%24@204.40.194.129:3128'
    ,timeout: 80000
    ,headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.16 (KHTML, like Gecko) \ Chrome/24.0.1304.0 Safari/537.16"
      //,headers: {'Cookie': 'JSESSIONID='+sessionId} //no work
      //,'X-FORWARDED-FOR' : '10.160.200.141'
    }
    //,jar: j
  };

  /**/
  if ( sessionId=='' ) {
    var j = webClient.jar()
    //options.jar = j  //why not working
    webClient = Promise.promisifyAll(require("request").defaults({jar:j}), {multiArgs: true})
    console.log('clean jar -------')
  }

  return webClient.getAsync(urlNew, options)

  }

  this.logConsole = function(level, content) {
    return logConsole(level, content)
  }
  this.logFile = function(fileName, content) {
    return logFile(fileName, content)
  }
}


