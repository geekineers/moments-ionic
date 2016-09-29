angular.module('starter.services', [])


.factory('Camera', ['$q', function($q) {


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
                  fileSys.root.getDirectory( myFolderApp,
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
}])


.factory('Moment', function() {
    var text;
    var image;
    var location;
})


.factory('MapService', ['$cordovaGeolocation', function($cordovaGeolocation) {
  var service = {};
  service.map = null;
  service.marker = null;
  service.geoloc = {
      lat: 0.0,
      lng: 0.0,
      str: "",
      brgy: "",
      muni: "",
      reg: "",
      addr: ""
  };
  service.posOptions = {timeout: 10000, enableHighAccuracy: true};

  service.init = function(map, marker) {
    this.map = map;
    this.marker = marker;
  }

  service.geoCode = function(latlngpos, $ionicLoading) {
    //instantiate latlng object and geocoder object
    var geocoder = new google.maps.Geocoder();

    //get location
    geocoder.geocode({'latLng': latlngpos}, function(results, status) {
      console.log('In geocoder.geocode');
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          service.map.setZoom(16);
          service.marker.setOptions({
              position: latlngpos,
              map: service.map
          });

          service.geoloc.str = results[0].address_components[0].short_name; //type:route
          service.geoloc.brgy = results[0].address_components[1].short_name; //type:neighborhood
          service.geoloc.muni = results[0].address_components[2].short_name; //type:locatlity
          service.geoloc.reg = results[0].address_components[3].short_name; //type:admnistrative_area_leveservice
          service.geoloc.addr = results[0].formatted_address;


          service.map.setCenter(latlngpos);
          $ionicLoading.hide(); //hide loading prompt
        } else {
          console.log('Geocode results not found');
          $ionicLoading.hide();
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
        $ionicLoading.hide();
      }
    });
  }

  service.getCurrLoc = function($ionicLoading) {
    console.log('In getCurrLoc');

    /*if (window.cordova && window.cordova.plugins && window.cordova.plugins.Geolocation) {
      geo = window.cordova.plugins.Geolocation;
    }*/

    if($cordovaGeolocation) {

      $cordovaGeolocation.getCurrentPosition(service.posOptions)
        .then(function (pos) {

          console.log('In getCurrLoc: $cordovaGeolocation.getCurrentPosition success callback');

          service.geoloc.lat = pos.coords.latitude;
          service.geoloc.lng = pos.coords.longitude;

          var latlngpos = new google.maps.LatLng(service.geoloc.lat, service.geoloc.lng);

          //update marker
          if(service.marker) {
            service.marker.setOptions({
                    position: latlngpos,
                    map: service.map
            });
          } else {
            service.marker = new google.maps.Marker({
              position: latlngpos,
              map: service.map
            });
          }

          service.geoCode(latlngpos, $ionicLoading);

        }, function(err) {
          console.log('In getCurrLoc: $cordovaGeolocation.getCurrentPosition error callback');
          console.log(err.code == err.TIMEOUT);
          console.log(err.message);
          if(err.code == err.TIMEOUT && service.posOptions.enableHighAccuracy == true) {
            //call geocode with enableHighAccuracy = false
            service.posOptions = {timeout: 10000, enableHighAccuracy: false};

            console.log('Low accuracy');

            service.getCurrLoc(service.posOptions, $ionicLoading)
          }
          else{
            console.log("Hardware or network error. Please close the app and reboot your device.");
          }


          $ionicLoading.hide();
        // error
        }
      );
    } else {
      console.log('cordovaGeolocation Location service not supported.');
      $ionicLoading.hide();
    }
  }

  return service;
}])
;

