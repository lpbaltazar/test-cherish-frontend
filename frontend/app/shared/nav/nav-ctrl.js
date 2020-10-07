;(function (){
    'use strict';

    angular
        .module('app')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        'QueryService',
        'logger'
    ];

    function NavCtrl ($scope, $state, $cookies, QueryService, logger) { 

        var vm      = this;

        vm.logout   = logout;

        init();

        function init () { 
            vm.user  = GLOBAL.user($cookies, $state);
            if (!vm.user) {
                $state.go('login');
            };
        } 

        function logout () { 
            var request = {
                method  : 'POST',
                body    : false,
                token   : false,
                params  : false,
                hasFile : false,
                route   : { auth:'', logout:'' }
            }; 

            $cookies.remove('user');
            QueryService
                .query(request)
                .then( function (response) { 

                    $cookies.remove('user');
                    $state.go('login'); 
                
                }, function (error) { 
                    console.log(error); 
                });

        }

    }
})();