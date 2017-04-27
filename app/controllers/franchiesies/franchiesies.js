"use strict";
angular.module("app").controller("franchiesies", ["$scope",  "$log", "apiResource","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",function ($scope, $log,apiResource, posts,title, $timeout,$location,$stateParams,$state,$rootScope)
{
//	$scope.isLoading = true;
 $scope.rowCollection = posts.jobPosts;
  $scope.title = title;
  $scope.dealTitle=$stateParams.dealTitle
  $scope.headerCollection = [{
      'name': 'ID',
      'displayName': 'SL.No'
    },
	{
      'name': 'NAME',
      'displayName': 'NAME'
    },
    {
        'name': 'POSITIONS',
        'displayName': 'POSITIONS'
      },
			 {
        'name': 'LOCATIONS',
        'displayName': 'LOCATIONS'
      }
			,
			 {
        'name': 'TOTAL_EXP',
        'displayName': 'TOTAL EXP'
      }
				,
			 {
        'name': 'KEY_SKILLS',
        'displayName': 'KEY SKILLS'
      }
			,
			 {
        'name': 'JOB_DESCRIPTION',
        'displayName': 'JOB DESCRIPTION'
      }
				,
			 {
        'name': 'START_DATE',
        'displayName': 'START DATE'
      }
			,
			 {
        'name': 'END_DATE',
        'displayName': 'END DATE'
      }
  ];

	$scope.expireDeal=function()
	{
		$scope.isLoading = true;
		$scope.myPromise=apiResource.update({isActive:true,dealTitle:$stateParams.dealTitle},{},function(response)
			{
        $rootScope.$broadcast('notification', {
          notification: response.message
        });
				 $rootScope.$broadcast('ps-menu-item-update',{});
				$state.go("inactivePosts",{isActive:false,dealTitle:$stateParams.dealTitle});
				$scope.isLoading = false;
			});
	};



}]);


