var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo

var Promise = require('bluebird')
var cheerio = require('cheerio')
var singleDraw = function(task, summary, tasks) {

  //console.log(summary)

  task = constant.urlBase + task + '?howMany=480'
    //task = 'http://www.sportinglife.ca/sportinglife/brand/694/Nike'

  if (summary[task]) {
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
      $('div.col-md-4 > a').each(function(i, elem) {
        subway = i
        console.log('>>>a:' + $(this).attr('href'))
        middleTasks.push($(this).attr('href'))
      })

      if (subway == -1) {
        //console.log('this is leaf')

        //TODO function
        $('div.price div p span.red').each(function(i, elem) {
            var priceLow = $(this).text().trim().substring(1)
            var priceHight = $(this).parent().parent().find('span').eq(0).text().trim().substring(1)
            var ratio = (priceLow / priceHight + '').substring(0, 4)
            var parentGood = $(this).parent().parent().parent().parent().parent() //
            var iconGood = parentGood.find('div.image-container a img')
            var aGood = parentGood.find('div.product-name a')
            var aBrand = parentGood.find('div.product-name h4 strong').text().trim().toUpperCase()
            if (ratio <= 0.8) {
              console.log(":" + aBrand + ":" + datetime)
              console.log(priceHight + ':cheap to:' + priceLow + ":" + ratio + "\n" + aGood.find('h5').text().trim() + "\n" + aGood.attr('href') + "\n")
                //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
                //util.logFile("log/summary.html", summary)

              var deal = {
                'p1': priceHight,
                'p2': priceLow,
                'ratio': ratio,
                'desc': aGood.find('h5').text().trim(),
                'href': constant.urlBase + aGood.attr('href'),
                'icon': constant.urlBase + iconGood.attr('src'),
                'brand': aBrand,
                'input': datetime
              }
              deals.push(deal)
            }
          })
          //TODO function end

      } else {
        console.log('this is not leaf')
        //return //must return , can not save this middle task
      }


    })
    .then(function() {
      //console.log( middleTasks )
      //middleTasks = middleTasks.slice(0, 1);

      return Promise.map(middleTasks, function(task) {
        console.log('-->' + task)
        task = constant.urlBase + task + '?howMany=480'
        return util.crab(task)
          .spread(function(response, body) {

            var $ = cheerio.load(body)



            //TODO function
            $('div.price div p span.red').each(function(i, elem) {
                var priceLow = $(this).text().trim().substring(1)
                var priceHight = $(this).parent().parent().find('span').eq(0).text().trim().substring(1)
                var ratio = (priceLow / priceHight + '').substring(0, 4)
                var parentGood = $(this).parent().parent().parent().parent().parent() //
                var iconGood = parentGood.find('div.image-container a img')
                var aGood = parentGood.find('div.product-name a')
                var aBrand = parentGood.find('div.product-name h4 strong').text().trim().toUpperCase()
                if (ratio <= 0.8) {
                  console.log(":" + aBrand + ":" + datetime)
                  console.log(priceHight + ':cheap to:' + priceLow + ":" + ratio + "\n" + aGood.find('h5').text().trim() + "\n" + aGood.attr('href') + "\n")
                    //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
                    //util.logFile("log/summary.html", summary)

                  var deal = {
                    'p1': priceHight,
                    'p2': priceLow,
                    'ratio': ratio,
                    'desc': aGood.find('h5').text().trim(),
                    'href': constant.urlBase + aGood.attr('href'),
                    'icon': constant.urlBase + iconGood.attr('src'),
                    'brand': aBrand,
                    'input': datetime
                  }
                  deals.push(deal)
                }
              })
              //TODO function end




            //util.logConsole('info', 'task is finish')
          })
      }, { concurrency: 2 })
    })
    .then(function() {
      summary[task] = deals
      util.logFile('./task/sportinglife/kpi.json', JSON.stringify(summary));
    })

}
exports.singleDraw = singleDraw
