var db = null;

angular.module('starter.moments', ['starter.apiservices','ngResource'])

.factory('getdashboard',function($q,Apidashboard){
            var incidents_array = {};
            incidents_array.list = [];

            function fetchmomentsfromapi(){
                console.log('fetching data from fetchIncidentsFromApi');
                var deferred = $q.defer();

                // var data = {
          //            bypass: '1'        
             //    };   

                var incidents = Apidashboard.get({},function(){
                    console.log('RESPONSE');
                    if(incidents.status == 'error'){
                        // console.log(JSON.stringify('error'));
                        deferred.reject('api error');
                    }else{
                        // console.log(JSON.stringify(incidents));
                        // incidents_array = incidents.dashboard;
                        deferred.resolve(incidents);
                    }
                });

                return deferred.promise;
            };

        return {
            all:function(){
                return fetchmomentsfromapi();
            }
             
        }
})


