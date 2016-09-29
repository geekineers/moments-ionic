var url = "http://172.20.10.2:32774/api/v1";

angular.module('starter.apiservices',['ngResource'])//'ngResource'

.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });
}])

.factory("Apidashboard",function($resource){
  // return $resource("http://localhost:130/system/kontra/user_login");
  return $resource(url+"/moments");
})
