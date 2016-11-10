"use strict";
angular.module("app").controller("allDeals", ["$scope",  "$log", "dealResource","deals","title", "$timeout", "$location","$stateParams","$state","$rootScope",function ($scope, $log,dealResource, deals,title, $timeout,$location,$stateParams,$state,$rootScope)
{
//	$scope.isLoading = true;
 $scope.rowCollection = deals.deals;
  $scope.title = title;
  $scope.dealTitle=$stateParams.dealTitle
  $scope.headerCollection = [{
      'name': 'addresses',
      'displayName': 'Location'
    },
	{
      'name': 'claims',
      'displayName': 'Deals Redemptions'
    },
    {
        'name': 'objectId',
        'displayName': 'Redemption Code'
      }
  ];
	$scope.expireDeal=function()
	{
		$scope.isLoading = true;
		$scope.myPromise=dealResource.update({isActive:true,dealTitle:$stateParams.dealTitle},{},function(response)
			{
        $rootScope.$broadcast('notification', {
          notification: response.message
        });
				 $rootScope.$broadcast('ps-menu-item-update',{});
				$state.go("inactiveDeals",{isActive:false,dealTitle:$stateParams.dealTitle});
				$scope.isLoading = false;
			});
	};

	$scope.reActiveDeal=function()
	{
		$scope.isLoading = true;
		$scope.myPromise=dealResource.update({isActive:false,dealTitle:$stateParams.dealTitle},{},function(response)
			{


        $rootScope.$broadcast('notification', {
          notification: response.message
        });
				 $rootScope.$broadcast('ps-menu-item-update',{});
				$state.go("activeDeals",{isActive:true,dealTitle:$stateParams.dealTitle});
				$scope.isLoading = false;
			});
	};

	$scope.delete_deal=function(row)
	{
		$scope.isLoading = true;
		$scope.myPromise=dealResource.delete({isActive:true,dealTitle:$stateParams.dealTitle,id:row.objectId},function(response)
			{
        $rootScope.$broadcast('notification', {
          notification: response.message
        });
				dealResource.get({isActive:true,dealTitle:$stateParams.dealTitle},function(response)
					{
						$scope.rowCollection=response.deals;
							$scope.isLoading = false;
					},function(response)
        {
           $rootScope.$broadcast('ps-menu-item-update',{});
             $state.go("dashboard");

        })
			})
	}

}]);
