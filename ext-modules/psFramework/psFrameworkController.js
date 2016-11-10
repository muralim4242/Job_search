"use strict"

angular.module("psFramework").controller("psFramework",
    ['$scope','$window','$timeout','$rootScope','$state','currentUser','userAccount','notifier',
        function ($scope, $window, $timeout, $rootScope, $state,currentUser,userAccount,notifier)
        {
            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;
            $scope.restaurantName=currentUser.getProfile().username;
            $scope.logo=currentUser.getProfile().logo;


			$scope.logoff=function()
			{
				$scope.myPromise=userAccount.logout.logout({},
            function (data) {
				if(!data.error)
				{
					notifier.success(data.message);
					currentUser.removeProfile();

				}
			//	alert(data.message);
			},
            function (response) {
              notifier.error(data.message);
            });
			}

			$scope.changePassword=function()
			{
				userAccount.changePassword.changePassword({},
				function (data) {
					if(!data.error)
					{
						notifier.success(data.message);
						currentUser.removeProfile();
					}
				//	alert(data.message);
				},
				function (response) {
					notifier.error(data.message);
				});
			}


            $scope.$on('ps-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
				/* if(data.param)
				$state.go(data.route,{dealName:data.param});
				else */
				if(data.route.indexOf('/')!=-1)
				{
					var values=data.route.split('/');
					$state.go(values[0],{dealTitle:values[2]});
				}
				else
				{
					$state.go(data.route);
				}
               // $location.path(data.route);
              checkWidth();
                broadcastMenuSate();
            });

            $rootScope.$on('ps-menu-orientation-changed-event', function(evt,data){
                $scope.isMenuVertical = data.isMenuVertical;
                $timeout(function () {
                    $($window).trigger('resize');
                }, 0);
            });

            $rootScope.$on('updateLogo', function(evt,data){
                $scope.logo = data.logo;
                currentUser.changeLogo($scope.logo);
            });


            $($window).on('resize.psFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuSate();
                })
            });

            $scope.$on("$destroy", function () {
                $($window).off("resize.psFramework");
            });



            var checkWidth = function () {
                var width = Math.max($window.innerWidth, $($window).width());
                $scope.isMenuVisible = (width > 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function ()
            {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuSate();
            //    $scope.$apply();
            };

            var broadcastMenuSate = function () {
                $rootScope.$broadcast('ps-menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };



            $timeout(function () {
                checkWidth();
            }, 0);

        }
        ]);
