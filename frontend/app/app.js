(function(){
    'use strict';

    angular
        .module('app', [
            'ui.router',            
            'ui.bootstrap',
            'toastr',
            'ngCookies',
            'ngProgress',
            'ngFileUpload'
        ])
        .config(router);


    function router ($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $httpProvider) {
        
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('app', {
                abstract:true,
                url : '/',
                views : {
                    'topbar' : { 
                        templateUrl  : 'app/shared/nav/nav.html',
                        controller   : 'NavCtrl',
                        controllerAs : 'vm'
                    },
                    'sidebar' : { 
                        templateUrl  : 'app/shared/sidebar/sidebar.html',
                        controller   : 'SidebarCtrl',
                        controllerAs : 'vm'
                    },
                    'content' : { 
                        templateUrl  : 'app/components/content/content.html',
                        controller   : 'ContentCtrl',
                        controllerAs : 'vm'
                    }
                }            
            })

            .state('app.dashboard', {
                url             : 'dashboard',  
                templateUrl     : 'app/components/dashboard/dashboard.html',
                controller      : 'DashboardCtrl',
                controllerAs    : 'vm'
            })

            .state('app.unaided', {
                url             : 'unaided?page&size',  
                templateUrl     : 'app/components/unaided/list.html',
                controller      : 'UnaidedListCtrl',
                controllerAs    : 'vm'
            })

            .state('app.unaided-details', {
                url             : 'unaided/:id',  
                templateUrl     : 'app/components/unaided/details.html',
                controller      : 'UnaidedDetailsCtrl',
                controllerAs    : 'vm'
            })

            .state('app.aided', {
                url             : 'aided?page&size',  
                templateUrl     : 'app/components/aided/list.html',
                controller      : 'AidedListCtrl',
                controllerAs    : 'vm'
            })

            .state('app.findings-details', {
                url             : 'physician/findings/:id',  
                templateUrl     : 'app/components/findings/details.html',
                controller      : 'FindingDetailsCtrl',
                controllerAs    : 'vm'
            })

            .state('app.clinical-comorbid', {
                url             : 'findings/:id/comorbid',  
                templateUrl     : 'app/components/clinicaldata/comorbid-illness.html',
                controller      : 'ComorbidCtrl',
                controllerAs    : 'vm'
            })

            .state('app.clinical-physicalexam', {
                url             : 'findings/:id/physicalexam',  
                templateUrl     : 'app/components/clinicaldata/physical-examination.html',
                controller      : 'PhysicalExamCtrl',
                controllerAs    : 'vm'
            })

            .state('app.clinical-symptom', {
                url             : 'findings/:id/symptom',  
                templateUrl     : 'app/components/clinicaldata/symptoms.html',
                controller      : 'SymptomCtrl',
                controllerAs    : 'vm'
            })

            .state('app.clinical-outcome', {
                url             : 'findings/:id/outcome',  
                templateUrl     : 'app/components/clinicaldata/outcome.html',
                controller      : 'OutcomeCtrl',
                controllerAs    : 'vm'
            })

            .state('app.uploads', {
                url             : 'uploads?page&size',  
                templateUrl     : 'app/components/uploads/list.html',
                controller      : 'UploadsListCtrl',
                controllerAs    : 'vm'
            })

            .state('app.upload-detail', {
                url             : 'radiologist/findings/:id',  
                templateUrl     : 'app/components/uploads/details.html',
                controller      : 'UploadDetailsCtrl',
                controllerAs    : 'vm'
            })

            .state('app.settings', {
                url             : 'settings',  
                templateUrl     : 'app/components/settings/list.html',
                controller      : 'SettingsListCtrl',
                controllerAs    : 'vm'
            })
            
            .state('app.profile', {
                url             : 'profile',  
                templateUrl     : 'app/components/profile/detail.html',
                controller      : 'ProfileCtrl',
                controllerAs    : 'vm'
            })

            .state('login', {
                url : '/login',
                views : {
                    'content' : { 
                        templateUrl  : 'app/components/login/login.html',
                        controller   : 'LoginCtrl',
                        controllerAs : 'vm'
                    }
                }
            })
            
    }

})();