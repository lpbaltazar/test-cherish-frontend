;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        'logger'
    ];

    function DashboardCtrl ($scope, $state, $cookies, logger) {
        var vm                  = this;
        vm.user                 = $cookies.getObject('user');

        init();
        function init () {
            vm[vm.user.role] = true;
        };
        



    }
    
})();