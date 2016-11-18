"use strict";
angular.module("app").controller("jobSeekersPosts", ["$scope",  "$log", "apiResource","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",function ($scope, $log,apiResource, posts,title, $timeout,$location,$stateParams,$state,$rootScope)
{
//	$scope.isLoading = true;
 $scope.rowCollection = posts.jobSeekers;
  $scope.title = title;
 // $scope.dealTitle=$stateParams.dealTitle
  $scope.headerCollection = [{
      'name': 'ID',
      'displayName': 'SL.No'
    },
	{
      'name': 'FULL_NAME',
      'displayName': 'FULL_NAME'
    },
    {
        'name': 'EMAIL',
        'displayName': 'EMAIL'
      },
			 {
        'name': 'TELEPHONE',
        'displayName': 'TELEPHONE'
      }
			,
			 {
        'name': 'CURRENT_LOCATION',
        'displayName': 'CURRENT_LOCATION EXP'
      }
				,
			 {
        'name': 'KEY_SKILLS',
        'displayName': 'KEY SKILLS'
      }
			,
			 {
        'name': 'TOTAL_EXP',
        'displayName': 'TOTAL_EXP'
      }
      ,
			 {
        'name': 'CURRENT_DESIGNATION',
        'displayName': 'CURRENT_DESIGNATION'
      }
				,
			 {
        'name': 'CURRENT_EMPLOYER',
        'displayName': 'CURRENT_EMPLOYER'
      }
			,
			 {
        'name': 'CURRENT_SALARY',
        'displayName': 'CURRENT_SALARY'
      }
      	,
			 {
        'name': 'HIGH_QUALIFICATION',
        'displayName': 'HIGH_QUALIFICATION'
      }
      ,
			 {
        'name': 'INSTITION',
        'displayName': 'INSTITION'
      }
        ,
			 {
        'name': 'RESUME_TITLE',
        'displayName': 'RESUME_TITLE'
      }

  ];

	// $scope.expireDeal=function()
	// {
	// 	$scope.isLoading = true;
	// 	$scope.myPromise=apiResource.update({isActive:true,dealTitle:$stateParams.dealTitle},{},function(response)
	// 		{
    //     $rootScope.$broadcast('notification', {
    //       notification: response.message
    //     });
	// 			 $rootScope.$broadcast('ps-menu-item-update',{});
	// 			$state.go("inactivePosts",{isActive:false,dealTitle:$stateParams.dealTitle});
	// 			$scope.isLoading = false;
	// 		});
	// };



}]);


	// $scope.reActiveDeal=function()
	// {
	// 	$scope.isLoading = true;
	// 	$scope.myPromise=apiResource.update({isActive:false,dealTitle:$stateParams.dealTitle},{},function(response)
	// 		{


  //       $rootScope.$broadcast('notification', {
  //         notification: response.message
  //       });
	// 			 $rootScope.$broadcast('ps-menu-item-update',{});
	// 			$state.go("activePosts",{isActive:true,dealTitle:$stateParams.dealTitle});
	// 			$scope.isLoading = false;
	// 		});
	// };

	// $scope.delete_deal=function(row)
	// {
	// 	$scope.isLoading = true;
	// 	$scope.myPromise=apiResource.delete({isActive:true,dealTitle:$stateParams.dealTitle,id:row.objectId},function(response)
	// 		{
  //       $rootScope.$broadcast('notification', {
  //         notification: response.message
  //       });
	// 			apiResource.get({isActive:true,dealTitle:$stateParams.dealTitle},function(response)
	// 				{
	// 					$scope.rowCollection=response.posts;
	// 						$scope.isLoading = false;
	// 				},function(response)
  //       {
  //          $rootScope.$broadcast('ps-menu-item-update',{});
  //            $state.go("dashboard");

  //       })
	// 		})
	// }