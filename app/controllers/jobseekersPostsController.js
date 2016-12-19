"use strict";
angular.module("app").controller("jobSeekersPosts", 
["$scope",  "$log", "apiResource","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",
function ($scope, $log,apiResource, posts,title, $timeout,$location,$stateParams,$state,$rootScope)
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
      'displayName': 'Name'
    },
    {
        'name': 'EMAIL',
        'displayName': 'Email'
      },
			 {
        'name': 'TELEPHONE',
        'displayName': 'Contact'
      }
			,
			 {
        'name': 'CURRENT_LOCATION',
        'displayName': 'Location'
      },
			 {
        'name': 'KEY_SKILLS',
        'displayName': 'Key Skills'
      }
			,
			 {
        'name': 'TOTAL_EXP',
        'displayName': 'Experience'
      }
      ,
			 {
        'name': 'CURRENT_DESIGNATION',
        'displayName': 'Present Designation'
      }
				,
			 {
        'name': 'CURRENT_EMPLOYER',
        'displayName': 'Present Employer'
      }
			,
			 {
        'name': 'CURRENT_SALARY',
        'displayName': 'Present Salaty'
      }
      	,
			 {
        'name': 'HIGH_QUALIFICATION',
        'displayName': 'Qualification'
      }
      // ,
			//  {
      //   'name': 'INSTITION',
      //   'displayName': 'Institution'
      // }
        ,
			 {
        'name': 'RESUME_TITLE',
        'displayName': 'Resume'
      }

  ];


	// $scope.expireDeal=function()
	// {
	// 	$scope.isLoading = true;
	// 	$scope.myPromise=apiResource.getAllPostDetailsForCandidates({isActive:true,dealTitle:$stateParams.dealTitle},{},function(response)
	// 		{
  //       $rootScope.$broadcast('notification', {
  //         notification: response.message
  //       });
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