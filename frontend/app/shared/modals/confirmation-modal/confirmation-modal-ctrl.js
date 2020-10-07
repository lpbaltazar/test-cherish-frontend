;(function (){
    'use strict'

    angular
        .module('app')
        .controller('ConfirmationModalCtrl', ConfirmationModalCtrl);

    ConfirmationModalCtrl.$inject = [
        '$scope', 
        '$cookies', 
        '$uibModalInstance',
        '$timeout', 
        'QueryService',
        'Data'
    ];

    function ConfirmationModalCtrl ($scope, $cookies, $uibModalInstance, 
                                    $timeout, QueryService, Data) { 

        var vm     = this;
        
        vm.content = Data;

        vm.approve = approve;
        vm.cancel  = cancel;

        function approve () {
            $uibModalInstance.close(true);
        }

        function cancel () {
            $uibModalInstance.close(false);
        } 
        
    }

})();