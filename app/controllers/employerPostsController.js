"use strict";
angular.module("app").controller("employerPosts", ["$scope",  "$log", "apiResource","currentUser","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",function ($scope, $log,apiResource,currentUser, posts,title, $timeout,$location,$stateParams,$state,$rootScope)
{
  $scope.isLoggedIn = function () {
      return currentUser.getProfile().isLoggedIn;
  };

  $scope.view=function()
  {
      return currentUser.getProfile().view;
  }


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
         'name': 'ROLE',
         'displayName': 'ROLE'
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

  $scope.handleSelectedRecord=function(id) {
        $scope.selectedRecord=id;
  }

  $scope.delete=function() {
      // console.log($scope.selectedRecord);
      $scope.myPromise=apiResource.job_post_delete({jId:$scope.selectedRecord},{},function(response)
        {
          $scope.rowCollection=response.jobPosts;
          $rootScope.$broadcast('notification', {
            notification: response.message
          });
          $scope.isLoading = false;
        });
  }




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
