"use strict";
angular.module("app").controller("faq", ["$scope", "$log", "dealResource", "$timeout", "$location", "title", "$state", "$rootScope",  function($scope, $log, dealResource, $timeout, $location, title, $state, $rootScope) {


  $scope.title = title;

  $scope.submitted=false;
  $scope.submitForm=function(valid)
  {
    $scope.submitted=true;
    if(!valid)
    {
      return;
    }
    $rootScope.$broadcast('notification', {
      notification: "We have recived your query,Will get back to you soon"
    });
  }

}]);
