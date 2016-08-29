var urlBase = "http://10.160.200.141:10039"
exports.urlBase = urlBase

//apply page
//https://www.services.gov.on.ca/sodp/poc/s2i?uri=s2i:s2iLanding_hot01&lang=en&_ga=1.118928718.655254388.1460402139
//&s2iByPassCode=3hQpqYQ1HP7XG6Q
var urlApply = urlBase + "/sodp/poc/s2i?uri=s2i:s2iLanding_hot01&lang=en&simulator=true"
exports.urlApply = urlApply

//----------------------------------above same for all server except urlBase
var plateNumber = 'BPBP200'
exports.plateNumber = plateNumber

//hard to get through js
//141 daniel
var urlPlateNumber = urlBase + "/sodp/portal/s2i/!ut/p/b1/dcpbjoIwFADQtbAAc2-JFvrZEEBsKyiIpT-EGEN8AA4YHrN6nQXM50kOGChWFB3KXEYd0GDaarzV1fvWtdXzz4aWe5VsTyIkiHxjI5d54JNjbmOEUHyD818IlQ0ZaFyX6X3q7KU9ikyt4-XAoswv8zvOMVFjgjgmkql-P_QnMXmCnvXjOdcFbXTzuuo-okPy685ySdmWED8OOv0j0s1Oeo83GVZEBBefS3Nwd5MF6bUtPQ6NCceaW9YHwcFSHg!!/"
exports.urlPlateNumber = urlPlateNumber

//get from console not in page source
var urlSurvey = urlBase + "/sodp/s2i/S2I_AjaxProxy/S2iProxy/http/intradev.services.ebc.gov.on.ca%3a8080/S2I/services/FormGenerator/s2i/hot_form?hostPath=http://10.160.200.141:10039"
exports.urlSurvey = urlSurvey
