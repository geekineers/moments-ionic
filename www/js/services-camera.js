angular.module('starter.services.camera', [])

.factory('Camera', ['$q', function($q) {

  /*return {
    getPicture: function(options) {
      var q = $q.defer();
      console.log('In Camera.getPicture');

      navigator.camera.getPicture(function(imageURI) {
        // Do any magic you need

        console.log('In Camera.getPicture: ' + imageURI);

        q.resolve(imageURI);
      }, function(err) {
        console.log('In Camera.getPicture: ' + err);
        q.reject(err);
      }, options);

      return q.promise;
    }
  }*/

  var cameraService = {};

  cameraService.getPicture = function(options) {
    var q = $q.defer();
    console.log('In Camera.getPicture');
      if(navigator.camera) {
      navigator.camera.getPicture(function(result) {
        // Do any magic you need

        console.log('In Camera.getPicture' + result);
        q.resolve(result);
      }, function(err) {
        console.log('In Camera.getPicture: ' + err);
        q.reject(err);
      }, options);
    }
    return q.promise;
  };

  //return cameraService;

  cameraService.movePhoto =  function(file) {
        var q = $q.defer()  ;
        window.resolveLocalFileSystemURL( file , cameraService.resolveOnSuccess, cameraService.resOnError);
        return q.promise;
  };

  cameraService.resolveOnSuccess = function(entry, q) {
          var d = new Date();
          var n = d.getTime();

          //new file name
          var newFileName = n + ".jpg";
          //var myFolderApp = "mase";
          var myFolderApp = AppSettings.get("AppFolder");

          console.log("@@@@ -" + myFolderApp);
          console.log("$$$$$$$$$ resolveOnSuccess $$$$$$$");
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                  fileSys.root.getDirectory(myFolderApp,
                      {create:true},
                      function(directory) {
                          entry.moveTo(directory, newFileName, function(new_entry){
                              path = new_entry.fullPath;
                              url = new_entry.toURL();
                              console.log(path+"\n"+url);
                              //alert( path+"\n"+url );
                              q.resolve(entry);
                              //jQuery('body').append('<img src="'+path+'" />');
                          }, cameraService.resOnError);
                      },
                      cameraService.resOnError);
              },
              cameraService.resOnError);
          return q.promise();
  };

  cameraService.resOnError = function(error, q) {
      alert('Error '+error.code+': '+error.message);
      q.reject(error);
  };

  return cameraService;
}]);
