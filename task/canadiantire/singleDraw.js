var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require('bluebird')
var cheerio = require('cheerio')

var singleDraw = function(task, summary, tasks) {

  //task = constant.urlBase + task + '?howMany=480'

  if (summary[task]) {
    //console.log('skipped')
    return
  }
  var deals = []
  var datetime = new Date()
  var middleTasks = []

  return util.crab(task)
    .spread(function(response, body) {
      //util.logConsole('debug', "band list finish");
      //logFile("log/StepApply.html", body)
      //console.log(body.substring(0,100))

      var $ = cheerio.load(body)

      var subway = -1
      $('a.assortment-tile__text-heading__link').each(function(i, elem) {
        subway = i
          //console.log('>>>a:'+$(this).attr('href'))

        if ( $(this).attr('href') ) {
          middleTasks.push(constant.urlBase + $(this).attr('href'))
        }
      })

      if ( subway===-1 ) {
        middleTasks.push(task)
      }

    })
    .then(function() {
      //console.log( middleTasks )
      //middleTasks = middleTasks.slice(0, 2)
      console.log("root task---"+task+":"+middleTasks.length)

      var webdriver = require('selenium-webdriver')
      var By = webdriver.By
      var until = webdriver.until

      var driver = util.initWebdriver()

      return Promise.map(middleTasks, function(task) {
        console.log("middle task---"+task)

        return driver.get(task).then(function() {

          var element = driver.findElement(By.tagName("body"))

          //console.log('body:'+element.get_attribute('innerHTML'))
          //return driver.findElement({ id: "wt" });
          console.log('&&& sub task loaded ajax')

          return driver.executeScript('return document.getElementsByTagName("body")[0].outerHTML')
        })
        .then(function(html) {
          //console.log(html)

          var $ = cheerio.load(html)

        //price__total-value
        $('span.price__total--on-sale').each(function(i, elem) {
            var priceLow = $(this).text().trim().substring(1)
            var priceHight = $(this).parent().parent().find('span.product-tile__regular-price--on-sale').eq(0).text().trim().split(' ')[0].substring(1)
            var ratio = (priceLow / priceHight + '').substring(0, 4)
            var parentGood = $(this).parent().parent().parent().parent().parent().parent().parent() //
            var iconGood = parentGood.find('img.product-tile-srp__image')
            var aGood = parentGood
            var aBrand = "ABC"
            if (ratio <= 0.8) {
              console.log(":" + aBrand + ":" + datetime)
              console.log(priceHight + ':cheap to:' + priceLow + ":" + ratio + "\n" + parentGood.find('h3.product-tile-srp__title').text().trim() + "\n" + aGood.attr('href') + "\n")
                //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
                //util.logFile("log/summary.html", summary)

              /**/
              var singleDesc = parentGood.find('h3.product-tile-srp__title').text().trim()
              var deal = {
                'p1': priceHight,
                'p2': priceLow,
                'ratio': ratio,
                'desc': singleDesc,
                //'tags': singleDesc,
                'title': singleDesc.toLowerCase(),
                'href': constant.urlBase + aGood.attr('href'),
                'icon': constant.urlBase + iconGood.attr('src'),
                'brand': aBrand,
                'input': datetime
              }
              deals.push(deal)
            }
          })

        })
        /*.then(function() {
          return driver.findElement({ id: "wt" });
        })
        .then(function(weight) {
          console.log(333)
          return weight.sendKeys("200");
        }).
        then(function() {
          return driver.findElement({ id: "calculate" });
        }).
        then(function(calculate) {
          return calculate.click();
        }).
        then(function() {
          return driver.findElement({ id: "outputmrc" }).getAttribute('value');
        }).
        then(function(mercury) {
          assert.equal(mercury, '75.6');
        });*/



      }, { concurrency: 1 }).then(function() {
        console.log('--builder is finished:'+task)
        summary[task] = deals
        util.logFile('./task/canadiantire/kpi.json', JSON.stringify(summary));
      })
      .catch(function(e) {
        util.logConsole('error', 'global-single exception to break:'+task+':' + e)
        throw e
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
