"use strict";

angular.module('app').config(['$logProvider', '$stateProvider', '$urlRouterProvider', function ($logProvider, $stateProvider, $urlRouterProvider) {

    $logProvider.debugEnabled(true);

    $urlRouterProvider.otherwise('/user/home');

    $stateProvider
        .state('user', {
            abstract: true,
            url: '/user',
            templateUrl: 'app/view/user.html'
        })
        .state('user.home', {
            url: '/home',
            templateUrl: 'app/view/user-home.html'
        })
        .state('user.employer-posts', {
            url: '/employer-posts',
            templateUrl: 'app/view/user-employer-posts.html',
            controller: 'employerPosts',
            resolve: {
                title: function () {
                    return "All Posts";
                },

                posts: function (apiResource,currentUser) {
                     if (currentUser.getProfile().token) {
                        return apiResource.getAllPostRelToEmp().$promise;
                    }
                    return [];
                    
                }

            }

        }).
        state('user.employer-post-add', {
            url: '/employer-post-add',
            templateUrl: 'app/view/user-employer-post-add.html',
            controller: 'employerPostAdd',
            resolve: {
                title: function () {
                    return "Add Post";
                }

            }

        }).
         state('user.job-seekers-post', {
            url: '/job-seekers-post',
            templateUrl: 'app/view/user-job-seekers-post.html',
            controller: 'jobSeekersPost',
            resolve: {
                title: function () {
                    return "Add Post";
                }

            }

        }).
        state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'app/view/admin.html'
        })
        .state('admin.home', {
            url: '/home',
            templateUrl: 'app/view/dashboard.html'
        });

}]).run(['$rootScope', '$log', function ($rootScope, $log) {

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('menuSateChangeSpinner', {
                stateStatus: true

            });
            //  $log.debug('start');
        });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.$broadcast('menuSateChangeSpinner', {
            stateStatus: false

        });
        //  $log.debug('successfully changed states');
        //
        //  $log.debug('event', event);
        //  $log.debug('toState', toState);
        //  $log.debug('toParams', toParams);
        //  $log.debug('fromState', fromState);
        //  $log.debug('fromParams', fromParams);
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

        $log.error('The requested state was not found: ', unfoundState);

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        $log.error('An error occurred while changing states: ', error);

        $log.debug('event', event);
        $log.debug('toState', toState);
        $log.debug('toParams', toParams);
        $log.debug('fromState', fromState);
        $log.debug('fromParams', fromParams);
    });

}]);



// .state('student-counsel', {
//             url: '/student-counsel',
//             controller: 'student-counsel',
//             templateUrl: 'app/view/student-counsel.html',
//             resolve: {
//                 title: function () {
//                     return "Student Counsel";
//                 }
//             }
//             /*   template: '<wwa-dashboard></wwa-dashboard>' */
//         })
//         .state('newDeal', {
//             url: '/newDeal',
//             controller: 'addDeal',
//             templateUrl: 'app/view/newDeal.html',
//             resolve: {
//                 title: function () {
//                     return "Add Deal Management";
//                 }
//             }
//         })
//         .state('activeDeals', {
//             url: '/activeDeals/true/:dealTitle',
//             controller: 'allDeals',
//             templateUrl: 'app/view/allDealsTemplate.html',
//             resolve: {
//                 title: function () {
//                     return "Active Deal Management";
//                 },

//                 deals: function ($stateParams, apiResource) {
//                     return apiResource.get({
//                         isActive: true,
//                         dealTitle: $stateParams.dealTitle
//                     }).$promise;
//                 }

//             }
//         })
//         .state('inactiveDeals', {
//             url: '/inactiveDeals/false/:dealTitle',
//             controller: 'allDeals',
//             templateUrl: 'app/view/allDealsTemplate.html',
//             resolve: {
//                 title: function () {
//                     return "Inactive Deal Management";
//                 },
//                 deals: function ($stateParams, apiResource) {
//                     return apiResource.get({
//                         isActive: false,
//                         dealTitle: $stateParams.dealTitle
//                     }).$promise;
//                 }

//             }
//         })
//         .state('profile', {
//             url: '/user/profile',
//             controller: 'profile',
//             templateUrl: 'app/view/profile.html',
//             resolve: {
//                 title: function () {
//                     return "Profile Management";
//                 },
//                 profile: function (apiResource) {
//                     return apiResource.getUserProfile().$promise;
//                 }

//             }
//         })
//         .state('faq', {
//             url: '/user/faq',
//             controller: 'faq',
//             templateUrl: 'app/view/faq.html',
//             resolve: {
//                 title: function () {
//                     return "FAQ";
//                 }
//             }

//         })
//         .state('customerSupport', {
//             url: '/user/customerSupport',
//             controller: 'customerSupport',
//             templateUrl: 'app/view/customerSupport.html',
//             resolve: {
//                 title: function () {
//                     return "Customer Support";
//                 }
//             }

//         })