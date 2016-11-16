
"use strict";

angular.module('app').config(['$logProvider', '$stateProvider', '$urlRouterProvider', function($logProvider, $stateProvider, $urlRouterProvider) {

    $logProvider.debugEnabled(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('student', {
            url: '/',
            controller: 'student',
            templateUrl: 'app/view/student.html',
            resolve: {
                title: function() {
                    return "Student";
                }
            }
            /*   template: '<wwa-dashboard></wwa-dashboard>' */
        })
        .state('student-counsel', {
            url: '/',
            controller: 'student-counsel',
            templateUrl: 'app/view/student-counsel.html',
            resolve: {
                title: function() {
                    return "Student Counsel";
                }
            }
            /*   template: '<wwa-dashboard></wwa-dashboard>' */
        })
        .state('newDeal', {
            url: '/newDeal',
            controller: 'addDeal',
            templateUrl: 'app/view/newDeal.html',
            resolve: {
                title: function() {
                    return "Add Deal Management";
                }
            }
        })
        .state('activeDeals', {
            url: '/activeDeals/true/:dealTitle',
            controller: 'allDeals',
            templateUrl: 'app/view/allDealsTemplate.html',
            resolve: {
                title: function() {
                    return "Active Deal Management";
                },

                deals: function($stateParams, apiResource) {
                    return apiResource.get({
                        isActive: true,
                        dealTitle: $stateParams.dealTitle
                    }).$promise;
                }

            }
        })
        .state('inactiveDeals', {
            url: '/inactiveDeals/false/:dealTitle',
            controller: 'allDeals',
            templateUrl: 'app/view/allDealsTemplate.html',
            resolve: {
                title: function() {
                    return "Inactive Deal Management";
                },
                deals: function($stateParams, apiResource) {
                    return apiResource.get({
                        isActive: false,
                        dealTitle: $stateParams.dealTitle
                    }).$promise;
                }

            }
        })
        .state('profile', {
            url: '/user/profile',
            controller: 'profile',
            templateUrl: 'app/view/profile.html',
            resolve: {
                title: function() {
                    return "Profile Management";
                },
                profile: function(apiResource) {
                    return apiResource.getUserProfile().$promise;
                }

            }
        })
        .state('faq', {
            url: '/user/faq',
            controller: 'faq',
            templateUrl: 'app/view/faq.html',
            resolve: {
                title: function() {
                    return "FAQ";
                }
            }

        })
        .state('customerSupport', {
            url: '/user/customerSupport',
            controller: 'customerSupport',
            templateUrl: 'app/view/customerSupport.html',
            resolve: {
                title: function() {
                    return "Customer Support";
                }
            }

        });

    /* $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/app/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('schools', {
            url: '/schools',
            controller: 'AllSchoolsController',
            controllerAs: 'schools',
            templateUrl: '/app/templates/allSchools.html'
        })
        .state('classrooms', {
            url: '/classrooms',
            controller: 'AllClassroomsController',
            controllerAs: 'classrooms',
            templateUrl: '/app/templates/allClassrooms.html',
            onEnter: function ($log) {
                $log.debug('Entering the classrooms state.');
            },
            onExit: function ($log) {
                $log.debug('Exiting the classrooms state.');
            }
        })
        .state('activities', {
            url: '/activities',
            controller: 'AllActivitiesController',
            controllerAs: 'activities',
            templateUrl: '/app/templates/allActivities.html',
            resolve: {
                activities: function (dataService) {
                    return dataService.getAllActivities();
                }
            },
            data: {
                name: 'My Activity',
                desc: 'Fun!'
            },
            foo: {
                myFoo: 'bar'
            }
        })
        .state('classroom_parent', {
            abstract: true,
            url: '/classrooms/:id',
            templateUrl: '/app/templates/classroom_parent.html',
            controller: 'ClassroomController',
            controllerAs: 'classroom',
            params: {
                classroomMessage: { value: 'Learning is fun!' }
            },
            resolve: {
                classroom: function ($stateParams, dataService) {
                    return dataService.getClassroom($stateParams.id);
                }
            }
        })
        .state('classroom_parent.classroom_summary', {
            url: '/summary',
            views: {
                'classInfo': {
                    templateUrl: '/app/templates/classroom.html',
                    controller: 'ClassroomSummaryController',
                    controllerAs: 'classroomSummary'
                },
                'classMessage': {
                    templateUrl: '/app/templates/classroom_message.html',
                    controller: 'ClassroomMessageController',
                    controllerAs: 'classroomMessage'
                }
            }
        })
        .state('classroom_parent.classroom_detail', {
            url: '/detail/{month}',
            views: {
                'classInfo': {
                    templateUrl: '/app/templates/classroomDetail.html'
                }
            }
        }); */


}]).run(['$rootScope', '$log', function($rootScope, $log) {

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('menuSateChangeSpinner', {
                stateStatus: true

            });
            //  $log.debug('start');
        });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

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

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {

        $log.error('The requested state was not found: ', unfoundState);

    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

        $log.error('An error occurred while changing states: ', error);

        $log.debug('event', event);
        $log.debug('toState', toState);
        $log.debug('toParams', toParams);
        $log.debug('fromState', fromState);
        $log.debug('fromParams', fromParams);
    });

}]);
