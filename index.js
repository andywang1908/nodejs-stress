require('events').EventEmitter.prototype._maxListeners = 100

var Promise = require("bluebird");

var request = Promise.promisifyAll(require("request").defaults({ jar: true }), {multiArgs: true})

//var singleDraw = Promise.promisifyAll(require('./singleDraw.js'), {multiArgs: true})
var singleDraw = require('./singleDraw.js')

var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "s2i_hot",
    password      : "s2i_hot",
    connectString : "susracdev.service.cihs.gov.on.ca:1525/susdev"
  },
  function(err, connection)
  {
    if (err) { console.error(err); return; }
    connection.execute(
      "SELECT * from hot_cycle where cycle_id = 161",
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });

return

var fileNames = new Array(5)

Promise.map(fileNames, function(fileName) {
  // Promise.map awaits for returned promises as well.
  console.log(fileName)
  // return crab(ttc)
  return singleDraw.singleDraw()
}, {concurrency: 3}).then(function() {
  console.log("All done!!!")
})
