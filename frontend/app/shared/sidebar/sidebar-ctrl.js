;(function (){
    'use strict';

    angular
        .module('app')
        .controller('SidebarCtrl', SidebarCtrl);

    SidebarCtrl.$inject = [
        '$scope', 
        '$state',
        '$stateParams',
        '$cookies'
    ];

    function SidebarCtrl ($scope, $state, $stateParams, $cookies) { 

        var vm  = this;

        vm.user = {};

        init();

        function init () { 

            vm.user = $cookies.getObject('user');
            vm[vm.user.role] = true;
            // accessControl(vm.user.roles);
        
        }

        function accessControl (roles) {

            for (var i = 0; i < roles.length; i++) {
                vm[roles[i]] = true;
            };

        }
    
    }

})();