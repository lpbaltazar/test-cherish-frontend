;(function (){
    'use strict';

    angular
        .module('app')
        .controller('SettingsListCtrl', SettingsListCtrl);

    SettingsListCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function SettingsListCtrl ($scope, $state, $cookies, $stateParams, ModalService, QueryService, logger) {
        
        var vm                      = this;
        vm.user                     = $cookies.getObject('user');

        // init();

        // function init () {
        //     console.log(vm.user.algorithm);
        // }


    }
    
})();