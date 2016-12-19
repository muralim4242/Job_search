"use strict";
angular.module("app").controller("requestedContacts", 
["$scope",  "$log", "apiResource","posts","title", "$timeout", "$location","$stateParams","$state","$rootScope",
function ($scope, $log,apiResource,posts,title, $timeout,$location,$stateParams,$state,$rootScope)
{
//	$scope.isLoading = true;
 $scope.rowCollection = posts.contactUS;
  $scope.title = title;
  $scope.dealTitle=$stateParams.dealTitle
  $scope.headerCollection = [{
      'name': 'CompanyName',
      'displayName': 'Company Name'
    },
	{
      'name': 'Sector',
      'displayName': 'Sector'
    },
    {
        'name': 'Location',
        'displayName': 'Location'
      }
			,
			 {
        'name': 'Message',
        'displayName': 'Message'
      },
			 {
        'name': 'ContactPerson',
        'displayName': 'Contact Person'
      },
			 {
        'name': 'PhoneNumber',
        'displayName': 'PhoneNumber'
      },
			 {
        'name': 'Email',
        'displayName': 'Email'
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


