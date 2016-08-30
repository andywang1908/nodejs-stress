var urlBase = "http://www.toysrus.ca"
exports.urlBase = urlBase

//apply page
//https://www.services.gov.on.ca/sodp/poc/s2i?uri=s2i:s2iLanding_hot01&lang=en&_ga=1.118928718.655254388.1460402139
//&s2iByPassCode=3hQpqYQ1HP7XG6Q
var urlApply = urlBase + "/shopByBrand/index.jsp?categoryId=2567269"
exports.urlApply = urlApply

//----------------------------------above same for all server except urlBase
var plateNumber = 'BPBP200'
exports.plateNumber = plateNumber

//hard to get through js
//182 demo
var urlPlateNumber = urlBase + "/sodp/portal/s2i/!ut/p/b1/dctLDoIwFEDRtbAA8_oU-QwJAYS2ggJaOiHEEIIKKBg-rl5dgMObnAsSshWiTtStaeg6CJBtMdZV8aq7trj_Wmr5nke7lHpIQjcixGIbA93A3xCfQPYF-j_g8TUkIIiax9epWy_tkSZcDZeD6SdOfrqSOUQ-fo8xYibv90Of0smm2lnc7nOVaY1oHqXofW2I3sbMltjcITqh24knjbcBs28vHFZI3YtjMXkwgkmBuGxz24JGemNlKcoHhSFHDQ!!/"
exports.urlPlateNumber = urlPlateNumber

//get from console not in page source
var urlSurvey = urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/intradev.services.ebc.gov.on.ca%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=http://10.160.200.182:10039"
exports.urlSurvey = urlSurvey
