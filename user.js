
var name = 100;

var setName = function(p1) {
  name = p1
}
exports.setName = setName

var getName = function() {
  return name
}
exports.getName = getName

exports.User = function(){
    var name;

    this.setName = function(ename) {
 name = ename;
    };

    this.getName = function(){
        return name;
    };
}