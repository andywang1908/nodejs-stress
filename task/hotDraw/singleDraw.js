'use strict'

var constant = require('./constant.json') //.dan .demo
/*clean others,or receive some other error*/
constant.formConfirm = {
    submitTo: "selectPaymentType" //get this value from console not source code
      ,
    viewName: '',
    certified: 'true',
    _certified: 'on'
  }
  //constant.urlPlateNumber = 'http://10.160.200.182:10039/sodp/portal/s2i/!ut/p/b1/dctJDoIwGEDhs3AA87dMwpIQQGgrKKilG0IMIcwKhsHTqwdw-ZLvgYB0J6O9qhiypgIH0edzVeavaujz9tdCz44sOlyIh1HoRghZVDGwG_gK8hGkX7D_BzwmQwIcqVlcL4O89WeSMDXcTqafONm1RmuI2fw95oiabDxO44UsNtFvvGnXMtU73j0KPvr6FL2NlW6xecDYCd2BP0msBdRuXnjaYeLeHYuKkxEsEsRFn9kWdMKbS0uSPjfFpV4!/'
  //constant.urlPlateNumber = 'https://wwwdev.mobile.services.ebc.gov.on.ca/sodp/portal/s2i/!ut/p/b1/dcpbjoIwFADQtbAAc3sRCv1EBlALtg4Mlv4QYgzxAcyA4TGrn3EBfp7kgIZihYwRe-2algMKdFuN17p6Xru2erysaZk7W1cKQVFkFIn3sTlIHvlrsTGh-A_Ou2CFCBkoYpXpberMpf3kWWKJ5ch2WVDmNzILTEZJyChjlvSHof_ik8_pSd0fc13QRjXfF9Xv6CB_3TleUrZFDETYqR-e2vvYvz9xWCEPz4EX66O7nwxIL23pe9DoaKw9w_gDMTst7Q!!/'
constant.urlSurvey = constant.urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/localhost%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=https://wwwdev.mobile.services.ebc.gov.on.ca"

var calFullUrl = function(part) {
  return constant.urlBase + part
}

var checkCookie = function(response) {

  var sessionId = ''

    //https://newspaint.wordpress.com/2015/09/06/how-to-get-cookies-from-node-js-http-response/
    var setcookie = response.headers["set-cookie"];
    //console.log('--here is response----'+JSON.stringify(response.headers))
    if ( setcookie ) {
      setcookie.forEach(
        function ( cookiestr ) {
          console.log( "COOKIE:" + cookiestr )
          if ( cookiestr.indexOf('JSESSIONID=')>=0 ) {
            sessionId = cookiestr.substring(11,48)
            console.log( "--- set sessionId:" + sessionId )
          }
        }
      )
    }

  return sessionId
}

const fs = require("fs")
var cheerio = require('cheerio')
var singleDraw = function(task, summary, tasks) {
  //console.log(summary)

  //task = constant.urlBase + task + '?howMany=480'

  if (summary[task]) {
    return
  }
  console.log('do plateNumber:' + task)

  var Multi = require('../../util.js').Multi
  var util = new Multi()
  /*
  util.logFile = function(fileName, content) {
    //fs.writeFile(fileName, content)
  }*/

  var formPlateNumber = {
    step: '1',
    plateSearchString1: constant.plateNumber,
    plateSearchString2: constant.plateNumber,
    termOfUse: 'true',
    simulator: 'true'
  }
  var formContact = {
    step: '2',
    plateSearchString1: constant.plateNumber,
    plateSearchString2: constant.plateNumber,
    simulator: 'true',
    hot01_confirmVehicleYes: 'true',
    confirmMyVehicle: 'true',
    'contactInfo.firstName': 'mario',
    'contactInfo.lastName': 'sankio',
    'contactInfo.phone': '4166758912',
    'contactInfo.email': 'mario.sankio@gmail.com',
    'emailReenter': 'mario.sankio@gmail.com'
  }
  var urlPortalSurvey = ''

  util.task = task
  formPlateNumber.plateSearchString1 = task
  formPlateNumber.plateSearchString2 = task
  formContact.plateSearchString1 = task
  formContact.plateSearchString2 = task

  //caution   logFile    multi-request
  var sessionId = ''
  console.log('sessionId init is empty!')

  return util.crabSession(constant.urlApply, '')
    .spread(function(response, body) {
      util.logConsole('debug', "StepApply finish")
      util.logFile("log/StepApply.html", body)
      //console.log('constant.urlPlateNumber:'+constant.urlPlateNumber)
      sessionId = checkCookie(response)

      return util.crabSession(constant.urlPlateNumber, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepPlateNumber finish");
      util.logFile("log/StepPlateNumber.html", body)
      checkCookie(response)

      //get from hot01_drawForm.action to submit plate number
      var $ = cheerio.load(body);
      var action = calFullUrl($('#hot01_drawForm').attr('action'))
        //console.log( action )
      return util.brabSession(action, formPlateNumber, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepGhost finish");
      util.logFile("log/StepGhost.html", JSON.stringify(response))
      checkCookie(response)

      var urlContact = response.headers.location
        //util.logConsole('debug', urlContact)
      return util.crabSession(urlContact, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepContact finish");
      util.logFile("log/StepContact.html", body) //response

      //submit contact
      var $ = cheerio.load(body);
      var action = calFullUrl($('#hot01_drawForm').attr('action'))
        //console.log( action )
      return util.brabSession(action, formContact, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepGhost1 finish")
      util.logFile("log/StepGhost1.html", JSON.stringify(response))

      var urlContact = response.headers.location
        //util.logConsole('debug', urlContact)
      return util.crabSession(urlContact, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepSurvey finish")
      util.logFile("log/StepSurvey.html", body) //response

      var $ = cheerio.load(body)
        //for submit survey by portal , not submit survey by ajax
      urlPortalSurvey = calFullUrl($('form[name=hot01_surveyForm]').attr('action'))

      var requestDataString = fs.readFileSync('./task/hotDraw/survey1.json')

      return util.arab(constant.urlSurvey, requestDataString)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepGhost2 finish")
      util.logFile("log/StepGhost2.html", JSON.stringify(response)) //response

      var surveyResponseId = JSON.parse(body).responseId //3299
      util.logConsole('debug', "surveyResponseId:" + surveyResponseId)
      return util.brabSession(urlPortalSurvey, { SURVEY_RESULT_ID: surveyResponseId }, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepGhost3 finish");
      util.logFile("log/StepGhost3.html", JSON.stringify(response)) //response

      var urlConfirm = response.headers.location
      util.logConsole('debug', 'urlConfirm:'+urlConfirm)
      return util.crabSession(urlConfirm, sessionId)
    })
    .spread(function(response, body) {
      util.logConsole('debug', "StepConfirm finish");
      util.logFile("log/StepConfirm.html", body) //response

      var $ = cheerio.load(body);
      //submit confirmation
      var action = calFullUrl($('#s2iOrderSummary').attr('action'))

      var info = $('#hotOrder_personal_Info_sec div.Data').html()
      console.log('confirmation text:'+util.task+':'+formPlateNumber.plateSearchString1+':'+info)

      //throw new Error("little inn:")
      //return util.brab(action, constant.formConfirm)
    })
    /*
    .spread(function (response, body) {
      util.logConsole('debug', "StepGhost4 finish");
      util.logFile("log/StepGhost4.html", JSON.stringify(response))//response

      var urlConfirm = response.headers.location
      util.logConsole('debug', urlConfirm)
      return util.crab(urlConfirm)
    })
    .spread(function (response, body) {
      util.logConsole('debug', "StepFinal finish");
      util.logFile("log/StepFinal.html", body)//response

      var i = body.indexOf("var hotReceipt__navigateaway = true;")
      var i = body.indexOf("url: \"", i)
      var j = body.indexOf("\"", i+6)
      var urlConfirm = calFullUrl( body.substring(i+6, j) )
      util.logConsole('debug', urlConfirm)
      return util.brab(urlConfirm, {})
    })
    .spread(function (response, body) {
      util.logConsole('debug', "StepFinalWait finish")
      util.logFile("log/StepFinalWait.html", JSON.stringify(response))
    })*/


}
exports.singleDraw = singleDraw

exports.Multi = function(){
  this.singleDraw = function(task, summary, tasks) {
    console.log('-----'+this.task)
    return singleDraw(task, summary, tasks)
  }
}
