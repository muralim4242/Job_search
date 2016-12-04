"use strict";
angular.module("app").controller("contactUS",
["$scope", "$log", "apiResource", "$timeout", "$location", "title", "$state", "$rootScope", "notifier", 
function ($scope, $log, apiResource, $timeout, $location, title, $state, $rootScope, jobSeekersPost, notifier) {

  $scope.isLoading = true;
  $scope.postData={};
  $scope.showForm=true;
   $scope.submitForm = function (valid) {
    $scope.isLoading = true;
    // Set the 'submitted' flag to true
    $scope.submitted = true;
    if (true)
    {
      // $scope.postData.START_DATE=new Date($scope.postData.START_DATE);
      //  $scope.postData.END_DATE=new Date($scope.postData.END_DATE);
      $scope.myPromise = apiResource.contactUs($scope.PostData, function (respose) {
          $rootScope.$broadcast('notification', {
            notification: respose.message
          });
          $scope.isLoading = false;
    //      $state.go("user.employer-posts");
        }, function (error) {
          $rootScope.$broadcast('notification', {
            notification: "Yikes! Something has gone wrong here, please try again"
          });
          $scope.isLoading = false;
        })
       
    } else {

      $rootScope.$broadcast('notification', {
        notification: "Oops! Don't forget to complete your jobSeekersPost"
      });
      $scope.submitted = false;
      $scope.isLoading = false;
    }


  };

}]);