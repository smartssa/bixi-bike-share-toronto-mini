'use strict';

angular.module('bixiBikeShareTorontoMiniApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title' : 'Stations',
        'link' : '/'
      }, {
        'title': 'About',
        'link': '/about'
      }
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
