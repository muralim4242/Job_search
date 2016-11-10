"use strict";
angular.module("app").controller("profile", ["$scope", "$log", "dealResource", "$timeout", "$location", "title", "$state", "$rootScope", "profile", "notifier", function($scope, $log, dealResource, $timeout, $location, title, $state, $rootScope, profile, notifier) {

  $scope.isLoading = true;
  $scope.userData = profile.user;
  $scope.userData.isChain = profile.user.isChain ? "true" : "false";
  $scope.title = title;
  $scope.myImage = '';
  $scope.myCroppedImage = '';
  $scope.handleFileSelect = function(evt) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
      $scope.$apply(function($scope) {
        $scope.myImage = evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };

  $scope.clear = function() {
    $scope.imageCropStep = 1;
    delete $scope.imgSrc;
    delete $scope.result;
    delete $scope.resultBlob;
  };


  $scope.submitForm = function(valid) {


    $scope.isLoading = true;
    // Set the 'submitted' flag to true

    $scope.submitted = true;



    if (valid)

    {
      //  $scope.userData.file = $scope.myImage;
      if ($scope.myCroppedImage) {
        $scope.userData.fileExtention = $scope.myImage.split("/", 2)[1].split(";", 1)[0];
        $scope.userData.file = $scope.myCroppedImage;
      } else {
        $scope.userData.fileExtention = null;
        $scope.userData.file = null;
      }

      //    $scope.userData.fileExtention=$scope.myImage.split("/",2)[1].split(";",1)[0];
      $scope.myPromise = dealResource.updateUserProfile({}, $scope.userData, function(data) {

        $rootScope.$broadcast('notification', {
          notification: data.message
        });
        if (data.logo!="no change") {
          $rootScope.$broadcast('updateLogo', {
            logo: data.logo
          });
        }
        $scope.isLoading = false;
      }, function(data) {
        $rootScope.$broadcast('notification', {
          notification: "Yikes! Something has gone wrong here, please try again"
        });
        $scope.isLoading = false;
      });


      $scope.submitted = false;

    } else {

      $rootScope.$broadcast('notification', {
        notification: "Oops! Don't forget to complete your profile"
      });
      $scope.submitted = false;
      $scope.isLoading = false;
    }


  };

}]);
