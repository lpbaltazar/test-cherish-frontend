;(function (){
    'use strict';

    angular
        .module('app')
        .controller('SidebarCtrl', SidebarCtrl);

    SidebarCtrl.$inject = [
        '$scope', 
        '$state',
        '$stateParams',
        '$cookies',
        'QueryService'
    ];

    function SidebarCtrl ($scope, $state, $stateParams, $cookies, QueryService) { 

        var vm                      = this;
        vm.pagination               = {};
        vm.pagination.pagestate     = $stateParams.page || 1;
        vm.pagination.size          = $stateParams.size || 10;

        vm.user                     = {};
        vm.totalImages              = 5;
        vm.retrieveCXR              = retrieveCXR;

        init();

        function init () { 

            vm.user = $cookies.getObject('user');
            vm[vm.user.role] = true;
            // accessControl(vm.user.roles);
            retrieveCXR();
        
        }

        function accessControl (roles) {

            for (var i = 0; i < roles.length; i++) {
                vm[roles[i]] = true;
            };

        }

        function retrieveCXR (search) {

            var params =  {
                search: vm.search_text || '',
                page: vm.pagination.pagestate,
                size: vm.pagination.size
            };
            search = (vm.search_text == '') ? '':search;

            if(vm.user.role === 'physician'){
                var request = {
                                method  : 'GET',
                                body    : false,
                                params  : params,
                                hasFile : false,
                                route   : { 'physician/cxr': search }
                };
            } else {
                var request = {
                                method  : 'GET',
                                body    : false,
                                params  : params,
                                hasFile : false,
                                route   : { 'radiologist/cxr': search }
                };
            };
            
            QueryService
                .query(request)
                .then( function (response) { 
                    vm.items            = response.data.data.items; 
                    vm.diagnosis        = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    vm.count            = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    vm.pagination.page  = $stateParams.page || 1;
                    vm.pagination.total = response.data.data.total;
                    vm.originalitems    = vm.items;
                    console.log(vm.diagnosis[0].length)

                }, function (error) {
                    logger.error(error.data.errors[0].message);
                });
        };
    
    }

})();