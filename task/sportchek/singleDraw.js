var util = require('../../util.js')
var constant = require('./constant.json') //.dan .demo
  /*
  constant.formPlateNumber = { step: '1'
    , plateSearchString1: constant.plateNumber
    , plateSearchString2: constant.plateNumber
    //, prevPlateNum: constant.plateNumber
    , termOfUse: 'true'
    , simulator: 'true'
  }
  var calFullUrl = function(part) {
    return constant.urlBase + part
  }*/

var cheerio = require('cheerio')
var singleDraw = function(task, summary, tasks) {

  //console.log(summary)

  //task = constant.urlBase + task + '?howMany=480'

  if (summary[task]) {
    return
  }
  console.log(task)
  var deals = []
  var datetime = new Date()

  return util.crab(task)
    .spread(function(response, body) {
      //util.logConsole('debug', "band list finish");
      //logFile("log/StepApply.html", body)

      var brandJson = JSON.parse(body);

      console.log('resultCount:' + brandJson.resultCount.total)
      if (brandJson.resultCount.total && brandJson.resultCount.total > 0) {} else {
        util.logConsole('error', "task get zero:" + task);
        return
      }

      var products = brandJson.products // this is array
      var arrayLength = products.length;
      for (var i = 0; i < arrayLength; i++) {
        var product = products[i]

        var priceLow = product.price
        var priceHight = product.timeTestedPrice
        if (priceHight == null) {
          priceHight = priceLow
        }
        var ratio = (priceLow / priceHight + '').substring(0, 4)
        if (priceHight == priceLow && product.priceShortMessage != null) {
          var tagIdx = product.priceShortMessage.indexOf('% Off')
          if (tagIdx > 0) {
            ratio = "0." + product.priceShortMessage.substring(0, tagIdx)
            ratio = 1 - ratio
          }
        }
        var iconGood = 'http:' + product.imageAndColor[0].imageUrl
        var nameGood = product.title
        var urlGood = constant.urlBase + product.pagePath + '.html'
        var aBrand = 'UNKNOWN'
        if (product.brand != null) {
          //TODO get from url
          aBrand = product.brand.toUpperCase()
        }
        if (ratio <= 0.8) {
          //console.log( ":"+aBrand+":"+datetime )
          console.log(priceHight + ':cheap to:' + priceLow + ":" + ratio + "\n" + nameGood + "\n") //+"\n"+urlGood
            //summary.push( '<li>'+priceHight+':cheap to:'+priceLow+":"+ratio+":"+'<a href="'+constant.urlBase+aGood.attr('href')+'" target="_blank">'+aGood.text().trim()+'</a><img src="'+constant.urlBase+iconGood.attr('src')+'"/></li>\n' )
            //util.logFile("log/summary.html", summary)

          var deal = {
            'p1': priceHight,
            'p2': priceLow,
            'ratio': ratio,
            'desc': nameGood,
            'title': nameGood.toLowerCase(),
            'href': urlGood,
            'icon': iconGood,
            'brand': aBrand,
            'input': datetime
          }
          deals.push(deal)
        }
      }
    })
    .then(function() {
      summary[task] = deals
      util.logFile('./task/sportchek/kpi.json', JSON.stringify(summary));
    })

}
exports.singleDraw = singleDraw
