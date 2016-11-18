"use strict";
angular.module("app").controller("jobSeekersPost", ["$scope", "$log", "apiResource", "$timeout", "$location", "title", "$state", "$rootScope", "notifier", function ($scope, $log, apiResource, $timeout, $location, title, $state, $rootScope, jobSeekersPost, notifier) {

  $scope.isLoading = true;
  $scope.postData={};
  $scope.postData["file"]="";
  $scope.postData["fileExtention"]="";
  // $scope.postData = jobSeekersPost.user;
  // $scope.postData.isChain = jobSeekersPost.user.isChain ? "true" : "false";
  $scope.title = title;
  $scope.resume='';
  // $scope.myImage = '';
  // $scope.myCroppedImage = '';
  $scope.handleFileSelect = function(evt) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(evt) {
      $scope.$apply(function($scope) {
        $scope.resume = evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };

  // $scope.clear = function() {
  //   $scope.imageCropStep = 1;
  //   delete $scope.imgSrc;
  //   delete $scope.result;
  //   delete $scope.resultBlob;
  // };


  $scope.submitForm = function (valid) {


    $scope.isLoading = true;
    // Set the 'submitted' flag to true

    $scope.submitted = true;



    if (true)

    {
      // $scope.postData.START_DATE=new Date($scope.postData.START_DATE);
      //  $scope.postData.END_DATE=new Date($scope.postData.END_DATE);

        $scope.postData.file = $scope.resume;
        if ($scope.resume) {
          $scope.postData.fileExtention = $scope.resume.split("/", 2)[1].split(";", 1)[0];
          $scope.postData.file = $scope.resume;
        } else {
          $scope.postData.fileExtention = null;
          $scope.postData.file = null;
        }


      $scope.myPromise = apiResource.addJobSeeker($scope.postData, function (respose) {
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
       
      //    $scope.postData.fileExtention=$scope.myImage.split("/",2)[1].split(";",1)[0];
      // $scope.myPromise = apiResource.updateUserjobSeekersPost({}, $scope.postData, function(data) {

      //   $rootScope.$broadcast('notification', {
      //     notification: data.message
      //   });
      //   if (data.logo!="no change") {
      //     $rootScope.$broadcast('updateLogo', {
      //       logo: data.logo
      //     });
      //   }
      //   $scope.isLoading = false;
      // }, function(data) {
      //   $rootScope.$broadcast('notification', {
      //     notification: "Yikes! Something has gone wrong here, please try again"
      //   });
      //   $scope.isLoading = false;
      // });


      // $scope.submitted = false;

    } else {

      $rootScope.$broadcast('notification', {
        notification: "Oops! Don't forget to complete your jobSeekersPost"
      });
      $scope.submitted = false;
      $scope.isLoading = false;
    }


  };

}]);