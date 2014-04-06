'use strict';

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}

angular.module('bixiBikeShareTorontoMiniApp')
  .controller('MainCtrl', ['$scope', '$http', 'GeolocationService', 'StorageService', '$timeout', function ($scope, $http, geolocation, storageservice, $timeout) {
    $scope.position = null;
    $scope.stations = null;
    $scope.lastupdate = null;
    $scope.predicate = ['-favourite', 'distance'];
    $scope.reverse = false;
    $scope.message = 'Determining Your Location...';
    $scope.favourites = storageservice.get('favourites');
    if ($scope.favourites === null) {
      $scope.favourites = [];
      storageservice.save('favourites', $scope.favourites);
    }
    geolocation().then(function (position) {
      $scope.position = position;
      $scope.message = null;
      $scope.updateDistances();
    }, function (reason) {
      $scope.message = 'Could not be determined. ' + reason;
    });

    $scope.updateStations = function() {
      $http.get('/api/stations').success(function(stations) {
        // replace the crappy / with an 'at'
        for (var i in stations.stationBeanList) {
          var s = stations.stationBeanList[i];
          s.stationName = s.stationName.replace('/', ' at ');
          // update favourite flag too from cookie.
          if ($scope.favourites.indexOf(s.id) > -1) {
            s.favourite = 1;
          } else {
            s.favourite = 0;
          }
        }
        $scope.stations = stations.stationBeanList;
        $scope.lastupdate = stations.executionTime;

        if ($scope.position !== null) {
          $scope.updateDistances();
        }

        $timeout($scope.updateStations, 45000); // 45 seconds for fun
      });
    };

    $scope.updateDistances = function() {
      for (var i in $scope.stations) {
        if ($scope.position !== null) {
          var s = $scope.stations[i];
          s.distance = $scope.distance($scope.position.coords.longitude,
            $scope.position.coords.latitude, s.longitude, s.latitude);
        }
      }
    };

    $scope.distance = function (lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
      var dLon = (lon2-lon1).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      // Use Math.round(num * 100) / 100
      return Math.round(d * 100) / 100;
    };

    $scope.toggleFav = function(s) {
      s.favourite = Number(!s.favourite);
      // save to cookie
      if (s.favourite) {
        // push it
        $scope.favourites.push(s.id);
        storageservice.save('favourites', $scope.favourites);
      } else {
        var index = $scope.favourites.indexOf(s.id);
        if (index > -1) {
          // pop it.
          $scope.favourites.splice(index, 1);
          storageservice.save('favourites', $scope.favourites);
        }
      }
    };

    $scope.updateStations();
  }
]);