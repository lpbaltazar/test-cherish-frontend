;(function (){
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        '$scope', 
        '$state', 
        '$uibModal',
        '$cookies',
        'QueryService',
        'logger'
    ];

    function LoginCtrl ($scope, $state, $uibModal, $cookies, QueryService, logger) {
        var vm              = this;

        // boolean
        vm.showNavItem          = true;
        vm.disable              = false;
        vm.isPassword           = false;

        vm.user                 = {};  
        vm.default_user         = GLOBAL.user_types[0];
        
        vm.header               = 'Log In';
        vm.loading              = 'Logging in...';
        vm.log                  = 'Log In'; 

        vm.user_types           = GLOBAL.user_types; 
        // vm.user_types           = [{name:"Healthcare Worker", value:"healthcareworker"}, {name:"Administrator", value:"administrator"}]

        vm.login                = login;
        vm.handleForgotPassword = handleForgotPassword;
        vm.handleState          = handleState;
        vm.selectUser           = selectUser;

        init();

        function init () {
            vm.user = GLOBAL.user($cookies, $state, $state.current.name);
            if (vm.user) {
                window.location.replace('/#/dashboard');
            }
        }

        function handleState (user) {
            $state.go(user);
        }

        function selectUser (user) {
            vm.default_user = user;
        }

        function login (user) {
            user.role = vm.default_user.value;

            var request = {
                method  : 'POST',
                body    : user,
                token   : false,
                params  : false,
                hasFile : false,
                route   : { auth:'', login:'' }
            }; 

            QueryService
                .query(request)
                .then( function (response) { 
                    console.log(response);
                    $cookies.putObject('user', response.data.data.items[0]);
                    $state.go('app.dashboard'); 
                
                }, function (error) { 
                    console.log(error);
                    logger.error(error.data.errors[0].message);
                });

        }

        function handleForgotPassword () {
            
            forgotPasswordModal()
                .then( function (response) {
                    console.log(response);
                });

        }

        function forgotPasswordModal () { 

            var modalInstance   = $uibModal.open({
                templateUrl     : 'app/components/login/modals/forgot-password.html',
                controller      : 'ForgotPasswordCtrl',
                controllerAs    : 'vm',
                size            : 'sm',
                backdrop        : true
            });

            return modalInstance.result;

        } 

    }

})();