angular.module('starter.controllers', ['ionicLazyLoad'])

.controller('DashCtrl', function($scope,getdashboard) {
   
    $scope.$on('$ionicView.enter', function() {
      getDashboard();
    });


    function getDashboard(){
       getdashboard.all().then(function(success){
      console.log(success);
      $scope.moments = success.moments;
    },function(fail){
      console.log(fail);
    });
    }
})

.controller('MomentCtrl', ['$scope','Camera','$http','$state', function($scope, Camera,$http,$state){
  console.log('PostMoment');
  // var msg =
  // $scope.textArea = "";

  $scope.getPhoto = function(){

    console.log("In MomentCtrl " + $scope.noimage);
    console.log('PostMoment-> getPhoto');
    ionic.Platform.ready(function() {
      Camera.getPicture().then(
        function(imageURI) {
          //callback on success
          console.log("In CameraCtrl.getPhoto: " + imageURI);
          //console.log("In CameraCtrl.getPhoto, App Directory: " + cordova.file.dataDirectory);
          console.log("In MomentCtrl " + $scope.noimage);

          $scope.image = imageURI;
          $scope.noimage = false;
        },
        function(err) {
          //callback on error
          console.log("In CameraCtrl.getPhoto: " + err);
        });
    });
  };


  $scope.doSubmitAttachment = function(){
    console.log( this.incident.description);
    console.log('PostMoment-> doSubmitAttachment');
    // $msgdata = 'test';
    var msgdata = {
        message:this.incident.description, 
        address:"", 
        latitude:0,
       longitude:0};

    var res = $http.post('http://172.20.10.2:32774/api/v1/moments',msgdata);
    res.success(function(data, status, headers, config) {
        console.log(data);
        $state.go('moment.dash', {state: "reload"});
    });
    // console.log()
    // uploadReport(this.incident.description,'Philippines','555..22','12.52',$scope.image);
  };

  function uploadReport(msg,addr,lat,lon,path){

        var url = "http://192.168.0.42:32774/api/v1/moments";
        // var targetPath = cordova.file.dataDirectory + "report_log.txt"; //filename refer to write_report
        console.log(url);
        console.log("##### targetPath -- " + path);

        var trustHosts = true;

        var options = new FileUploadOptions();
        // options.fileKey="file";
        // options.fileName= 'report_log.txt';
        // options.mimeType="text/plain";
        var options = {};

        var params = new Object();
        params.message = msg;
        params.image = "image_o";
        params.address = addr;
        params.latitude = lat;
        params.longitude = lon;

        options.params = params;//getReport(description);
        options.chunkedMode = false;

        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var ft = new FileTransfer();
        ft.upload(path, encodeURI(url), win, fail, options);
        /*$cordovaFileTransfer.upload(url, path, options)
            .then(function(result) {
              // Success!
              $scope.images = [];
              // removeFile();
              console.log('Success');
              console.log(JSON.stringify(result));
            }, function(err) {
              // Error
              console.log('Error');
              console.log(err);
            }, function (progress) {
              $timeout(function () {
                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
              })
        });*/

    }

}])

;
