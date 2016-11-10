"use strict";
angular.module("app").controller("customerSupport", ["$scope", "$log", "userAccount", "$timeout", "$location", "title", "$state", "$rootScope", function($scope, $log, userAccount, $timeout, $location, title, $state, $rootScope) {


  $scope.title = title;

  $scope.submitted = false;
  $scope.submitForm = function(valid) {
    $scope.submitted = true;
    if (!valid) {
      return;
    }
    $scope.myPromise=userAccount.feedback.feedback($scope.feedBackData, function(response) {
      $rootScope.$broadcast('notification', {
        notification: "We have recived your query,Will get back to you soon"
      });
    }, function(errorResponse) {
      $rootScope.$broadcast('notification', {
        notification: "Unknown error please try again after some time"
      });
    })

  }

}]);
