var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require('bluebird')
var cheerio = require('cheerio')

var singleDraw = function(task, summary, tasks) {

  //task = constant.urlBase + task + '?howMany=480'

  if (summary[task]) {
    //console.log('skipped')
    //return
  }
  var deals = []
  var datetime = new Date()
  var middleTasks = []

  return util.crab(task)
    .spread(function(response, body) {
      //util.logConsole('debug', "band list finish");
      //logFile("log/StepApply.html", body)

      var $ = cheerio.load(body)

      var subway = -1
      $('a.assortment-tile__text-heading__link').each(function(i, elem) {
        subway = i
          //console.log('>>>a:'+$(this).attr('href'))
        middleTasks.push(constant.urlBase + $(this).attr('href'))
      })

    })
    .then(function() {
      //console.log( middleTasks )
      middleTasks = middleTasks.slice(0, 1)

      return Promise.map(middleTasks, function(task) {
        console.log('-->' + task)

        return util.irab(task)
          .then(function() {

            return util.srab(task)
            //util.logConsole('info', 'task is finish')
          })



      }, { concurrency: 2 }).then(function() {
        console.log('builder is finished')
        summary[task] = deals
        util.logFile('./task/canadiantire/kpi.json', JSON.stringify(summary));
      })
    })

}
exports.singleDraw = singleDraw

var selenium = function(urlNew) {


  //'http://www.canadiantire.ca/en/kids-zone/baby-toddler/car-seats-accessories.html'
  driver.get(urlNew);
  driver.findElement(By.name('q')).sendKeys('webdriver');
  //driver.findElement(By.name('btnG')).click();
  driver.wait(until.titleIs('webdriver - Google Search'), 5000);
  //driver.quit();

}
//selenium()

exports.Multi = function(){
  this.singleDraw = function(task, summary, tasks) {
    console.log('-----'+this.task)
    return singleDraw(task, summary, tasks)
  }
}
