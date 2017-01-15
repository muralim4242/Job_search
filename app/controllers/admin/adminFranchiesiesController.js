"use strict";
angular.module("app").controller("adminFranchiesies", ["$scope", "$log", "apiResource", "currentUser", "franchiesies", "title", "$timeout", "$location", "$stateParams", "$state", "$rootScope", function($scope, $log, apiResource, currentUser, franchiesies, title, $timeout, $location, $stateParams, $state, $rootScope) {
    $scope.isLoggedIn = function() {
        return currentUser.getProfile().isLoggedIn;
    };

    $scope.view = function() {
        return currentUser.getProfile().view;
    }


    //	$scope.isLoading = true;
    $scope.rowCollection = franchiesies.franchesies;
    $scope.title = title;
    $scope.headerCollection = [{
            'name': 'ID',
            'displayName': 'SL.No'
        },
        {
            'name': 'NAME',
            'displayName': 'NAME'
        },
        {
            'name': 'TELEPHONE',
            'displayName': 'TELEPHONE'
        },
        {
            'name': 'STATUS',
            'displayName': 'STATUS'
        }
    ];

    $scope.handleSelectedRecord = function(id) {
        $scope.selectedRecord = id;
    }

    $scope.delete = function() {
        // console.log($scope.selectedRecord);
        $scope.myPromise = apiResource.job_post_delete({
            jId: $scope.selectedRecord
        }, {}, function(response) {
            $scope.rowCollection = response.jobPosts;
            $rootScope.$broadcast('notification', {
                notification: response.message
            });
            $scope.isLoading = false;
        });
    }

    $scope.UpdateUserStatus=function(uId,status)
    {
        $scope.myPromise=apiResource.UpdateUserStatus({uId:uId,status:status},{},function(response)
      {
        $scope.rowCollection = response.franchiesies;
        $rootScope.$broadcast('notification', {
            notification: response.message
        });
        $scope.isLoading = false;
      },function(err) {
        $rootScope.$broadcast('notification', {
            notification: err.message
        });
      })
    }




}]);
