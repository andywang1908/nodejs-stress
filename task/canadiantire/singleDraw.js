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
      //middleTasks = middleTasks.slice(0, 1);

      return Promise.map(middleTasks, function(task) {
        console.log('-->' + task)
        return util.crab(task)
          .spread(function (response, body) {

            var $ = cheerio.load(body)
            $('span.price__total-value  price__total--on-sale').each(function(i, elem) {
              var priceLow = $(this).text().trim().substring(1)
              var priceHigh = $(this).next().text().trim().substring(1)
              var ratio = (priceLow/priceHigh+'').substring(0,4)
              var parentGood = $(this).parent().parent().parent().parent().parent().parent().parent() 
              var iconGood = parentGood.find('img.product-tile-srp__image')
              var aGood = parentGood
              var title = aGood.find('h3.product-tile-srp__title').text().trim()
              var aBrand = "TODO"
              if ( ratio<=0.9 || 1==1 ) {
                console.log( priceHigh+':cheap to:'+priceLow+":"+ratio+"\n"+title+"\n"+aGood.attr('href')+"\n" )

                var deal = {
                  'p1':priceHigh
                  ,'p2':priceLow
                  ,'ratio':ratio
                  ,'desc':title
                  ,'href':constant.urlBase+aGood.attr('href')
                  ,'icon':iconGood.attr('src')
                  ,'brand':aBrand
                  ,'input':datetime
                }
                deals.push(deal)
              }
            })

            //util.logConsole('info', 'task is finish')
          })
      }, { concurrency: 2 }).then(function() {
        summary[task] = deals
        util.logFile('./task/canadiantire/kpi.json', JSON.stringify(summary));
      })
    })

}
exports.singleDraw = singleDraw
