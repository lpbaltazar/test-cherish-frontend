;(function (){
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function ProfileCtrl ($scope, $state, $cookies, $stateParams, ModalService, QueryService, logger) {
        
        var vm                      = this;
        
        init();

        function init () {
            retrieveProfile();
        }

        function retrieveProfile () {

            var request = {
                method  : 'GET',
                body    : false,
                hasFile : false,
                route   : { 'me': '' }
            };

            QueryService
                .query(request)
                .then( function (response) { 
                    vm.item            = response.data.data.items[0]; 
                    console.log(vm.item);
                }, function (error) {
                    logger.error(error.data.errors[0].message);
                });
        }

    }
    
})();