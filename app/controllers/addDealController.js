"use strict";
angular.module("app").controller("addDeal", ["$scope", "$log", "apiResource", "$timeout", "$location", "title", "$state", "$rootScope","notifier", function($scope, $log, apiResource, $timeout, $location, title, $state, $rootScope,notifier) {

  $scope.isLoading = true;
  $scope.title = title;
  $scope.myImage = '';
  $scope.cropped={myCroppedImage : ''};

  $scope.handleFileSelect=function(evt) {
       var file=evt.currentTarget.files[0];
       var reader = new FileReader();
       reader.onload = function (evt) {
         $scope.$apply(function($scope){
           $scope.myImage=evt.target.result;
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



  $scope.dealSlidingValue = 1;

  $scope.dealSlidingNext = function()

  {

    $scope.submitted = true;

    if ($scope.dealSlidingValue == 1 && $scope.dealForm.$valid)

    {

      $scope.dealSlidingValue += 1;

      $scope.submitted = false;

      return;

    }

    if ($scope.dealSlidingValue == 2 && $scope.dealForm.$valid )

    {

      if($scope.myImage)
      {
      $scope.dealSlidingValue += 1;

      $scope.submitted = false;

      //	$scope.imageCropStep = 3;

      return;
    }
    else {
      notifier.error("Hang on there! Don't forget to upload your feature image");
      return
    }

    }

    if ($scope.dealSlidingValue == 3 && $scope.dealForm.$valid)

    {

      $scope.dealSlidingValue += 1;

      $scope.submitted = false;

      return;

    }





  }

  $scope.noOfRestaurant_array = [{
    "id": "1"

  }, {
    "id": "2"
  }, {
    "id": "3"
  }, {
    "id": "4"
  }, {
    "id": "5"
  }, {
    "id": "6"

  }, {
    "id": "7"
  }, {
    "id": "8"
  }, {
    "id": "9"
  }, {
    "id": "10 or more"
  }];




  $scope.dealSlidingPrev = function()

  {

    $scope.dealSlidingValue -= 1;

  }




  function dealInitialLoad()

  {

    $scope.deal = {

      dealTitle: "",

      dealDescription: "",

      dealTerms: "",

      isActive: "true",

      geoLocation: [],
      noOfRestaurant: ""

    };

    $scope.dealSlidingValue = 1;

  };

  $scope.restaurants = [];

  $scope.$watch('deal.noOfRestaurant', function(newVal, oldVal)

    {

      if (newVal)

      {
        if (newVal != "10 or more") {
          $scope.propertyEntryEnabled = true;
          $scope.manualRestaurantSelectionButtonEnable = false;
          var i;

          $scope.restaurants = [];
          for (i = 1; i <= newVal; i++) {
            $scope.restaurants.push({
              propertyNo: "",
              postalCode: ""
            });
          }
        } else {
          $scope.restaurants = [];
          $scope.manualRestaurantSelectionButtonEnable = true;
          $scope.propertyEntryEnabled = false;
        }

      } else {
        $scope.restaurants = [];
        $scope.propertyEntryEnabled = false;
      }



    });

  $scope.$watch('deal.manualRestaurantSelected', function(newVal, oldVal)

    {

      if (newVal <= 100)

      {
        $scope.propertyEntryEnabled = true;
        var i;

        $scope.restaurants = [];
        for (i = 1; i <= newVal; i++) {
          $scope.restaurants.push({
            propertyNo: "",
            postalCode: ""
          });
        }


      } else {
        $scope.restaurants = [];
        $scope.propertyEntryEnabled = false;
      }



    });

  $scope.getLocation = function(restaurant) {
    $scope.isLoading = true;
    $scope.myPromise = apiResource.getLocation({
      postalCode: restaurant.postalCode
    }, function(data) {
//      $scope.deal.geoLocation.push(data);
      restaurant.addresses=data.Addresses;
      restaurant.lat=data.Latitude;
      restaurant.long=data.Longitude;
      restaurant.geoNotAvailable = false;
      restaurant.geoAvailable = true;
      $scope.isLoading = false;
    }, function(error) {
      restaurant.geoNotAvailable = true;
      restaurant.geoAvailable = false;
      $scope.isLoading = false;
    })
  }

  dealInitialLoad();

  $scope.submitForm = function() {
    // Set the 'submitted' flag to true
    $scope.submitted = true;
    _.forEach($scope.restaurants,function(restaurant,key)
    {
      if(restaurant.lat && restaurant.long && restaurant.address && !_.some($scope.deal.geoLocation,function(geoLocation){return geoLocation.Addresses[0] === restaurant.address}))
      {
        $scope.deal.geoLocation.push({Latitude:restaurant.lat,Longitude:restaurant.long,Addresses:[restaurant.address],RestaurantTelephone:parseFloat(restaurant.telephone)});
      }
    });
    if ($scope.deal.dealDescription && $scope.deal.dealTerms && $scope.deal.dealTitle)

    {
      if ($scope.deal.geoLocation.length > 0) {
        $scope.deal.fileExtention = $scope.myImage.split("/", 2)[1].split(";", 1)[0];
        $scope.deal.file = $scope.cropped.myCroppedImage;
        $scope.deal.fileName = $scope.deal.dealTitle.replace(/[^A-Z0-9]+/ig, "_");
        $scope.myPromise = apiResource.save($scope.deal, function(response) {

          $rootScope.$broadcast('notification', {
            notification: "Congrats! Your deal has been posted!"
          });
          $rootScope.$broadcast('ps-menu-item-update', {});
          //	 $location.absUrl() == 'http://cromatravels.com'
          $state.go("dashboard");
          //	dealInitialLoad();

          //	$scope.isBookNowClicked=true;

          $scope.submitted = false;

        }, function(response) {
          $rootScope.$broadcast('notification', {
            notification: "Oops! Something went wrong somewhere. Please try again"
          });
        });
      } else {
        $rootScope.$broadcast('notification', {
          notification: "One sec! You've not entered your restaurant address. "
        });
      }
    } else {
      $rootScope.$broadcast('notification', {
        notification: "Yikes! Something went wrong somewhere. Please try again"
      });

      $scope.submitted = false;
      $scope.isLoading = false;



    }


  };



}]);
