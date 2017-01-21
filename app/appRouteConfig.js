"use strict";

angular.module('app').config(['$logProvider', '$stateProvider', '$urlRouterProvider', function ($logProvider, $stateProvider, $urlRouterProvider) {

    $logProvider.debugEnabled(true);

    $urlRouterProvider.otherwise('/user/home');
    $urlRouterProvider.when("/user/employer", "/user/employer/user-employer-posts");

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
        .state('user.aboutus', {
            url: '/aboutus',
            templateUrl: 'app/view/aboutus/about-us.html'
        })
        .state('user.services', {
            url: '/services',
            templateUrl: 'app/view/services/services.html'
        })
        .state('user.uploadresume', {
            url: '/uploadresume',
            templateUrl: 'app/view/directupload/uploadresume.html',
            controller: 'jobSeekersPost',
            resolve: {
                title: function () {
                    return "Please Fill The Details";
                },
                 posts: function (apiResource) {
                        return apiResource.getAllPostDetailsForCandidates().$promise;
                }
            }

        })
        .state('user.contactus', {
            url: '/contactus',
            templateUrl: 'app/view/contactus/contactus.html',
            controller: 'contactUS',
              resolve: {
                title: function () {
                    return "Contact Us";
                }

            }

        })
        .state('user.employer',{
             url: '/employer',
             templateUrl: 'app/view/employer/employer-dashboard.html',
        })
        .state('user.employer.employer-posts', {
            url: '/user-employer-posts',
            templateUrl: 'app/view/employer/user-employer-posts.html',
            controller: 'employerPosts',
            resolve: {
                title: function () {
                    return "All Posts";
                },

                posts: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllPostRelToEmp().$promise;
                    }
                    return [];

                }

            }

        }).
        state('user.employer.employer-post-add', {
            url: '/employer-post-add/:id',
            templateUrl: 'app/view/employer/user-employer-post-add.html',
            controller: 'employerPostAdd',
            resolve: {
                title: function () {
                    return "Please Fill The Details";
                }
            }

        }).
        state('user.job-seekers-post', {
            url: '/job-seekers-post',
            templateUrl: 'app/view/user-job-seekers-post.html',
            controller: 'jobSeekersPost',
            resolve: {
                title: function () {
                    return "Please Fill The Details";
                },
                 posts: function (apiResource) {
                        return apiResource.getAllPostDetailsForCandidates().$promise;
                }
            }

        }).
        state('user.franchiesies', {
            url: '/franchiesies',
            templateUrl: 'app/view/franchiesies/franchiesies.html'
        }).
        state('user.franchiesies.franchiesies-posts', {
            url: '/user-franchiesies-posts',
            templateUrl: 'app/view/admin/admin-job-seekers-posts.html',
            controller: 'jobSeekersPosts',
            resolve: {
                title: function () {
                    return "All Job seekers";
                },

                posts: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllJobSeekersRelToFranchiesies().$promise;
                    }
                    return [];

                }

            }

        }).
        state('user.franchiesies.franchiesies-post-add', {
            url: '/franchiesies-post-add/:id',
            templateUrl: 'app/view/franchiesies/user-franchiesies-post-add.html',
            controller: 'franchiesiesPostAdd',
            resolve: {
                title: function () {
                    return "Please Fill The Details";
                },
                posts: function (apiResource, currentUser) {
                    return [];
                }
            }

        }).
        state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'app/view/admin/admin.html'
        })
        .state('admin.home', {
            url: '/home',
            templateUrl: 'app/view/admin/dashboard.html',
            controller: 'dashboard',
            resolve: {
                title: function () {
                    return "Dashboard";
                },

                dashboard: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.dashboard().$promise;
                    }
                    return [];

                }

            }

        })
        .state('admin.employer-posts', {
            url: '/employer-posts',
            templateUrl: 'app/view/admin/admin-employer-posts.html',
            controller: 'employerPosts',
            resolve: {
                title: function () {
                    return "All Employers Posts";
                },

                posts: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllPost().$promise;
                    }
                    return [];

                }

            }

        })
        .state('admin.requsted-contacts', {
            url: '/requsted-contacts',
            templateUrl: 'app/view/admin/admin-requsted-contacts.html',
            controller: 'requestedContacts',
            resolve: {
                title: function () {
                    return "Requested to contact";
                },

                posts: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getContactUs().$promise;
                    }
                    return [];

                }

            }

        })
        .state('admin.job-seekers-posts', {
            url: '/job-seekers-posts',
            templateUrl: 'app/view/admin/admin-job-seekers-posts.html',
            controller: 'jobSeekersPosts',
            resolve: {
                title: function () {
                    return "All Job Seekers Profile";
                },

                posts: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllOrIndJobSeeker().$promise;
                    }
                    return [];

                }

            }

        })
        .state('admin.franchiesies', {
            url: '/franchiesies',
            templateUrl: 'app/view/admin/admin-franchiesies.html',
            controller: 'adminFranchiesies',
            resolve: {
                title: function () {
                    return "All Franchiesies";
                },

                franchiesies: function (apiResource, currentUser) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllFranchiesies().$promise;
                    }
                    return [];

                }

            }

        }).
        state('admin.franchiesiesCandidate', {
            url: '/user-franchiesies-posts/:id',
            templateUrl: 'app/view/admin/admin-job-seekers-posts.html',
            controller: 'jobSeekersPosts',
            resolve: {
                title: function () {
                    return "Franchiesies Candidates";
                },

                posts: function (apiResource, currentUser,$stateParams) {
                    if (currentUser.getProfile().token) {
                        return apiResource.getAllJobSeekersRelToFranchiesies({id:$stateParams.id}).$promise;
                    }
                    return [];

                }

            }

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
