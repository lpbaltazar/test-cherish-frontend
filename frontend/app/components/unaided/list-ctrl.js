;(function (){
    'use strict';

    angular
        .module('app')
        .controller('UnaidedListCtrl', UnaidedListCtrl);

    UnaidedListCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function UnaidedListCtrl ($scope, $state, $cookies, $stateParams, ModalService, QueryService, logger) {
        
        var vm                      = this;
        vm.pagination               = {};
        vm.pagination.pagestate     = $stateParams.page || 1;
        vm.pagination.size          = $stateParams.size || 10;

        vm.items                    = [];
        vm.user                     = $cookies.getObject('user');

        // methods 
        vm.currentPage              = currentPage;
        // vm.add                      = add;
        // vm.update                   = update;
        // vm.handleDeactivateItem     = handleDeactivateItem;
        // vm.deactivate               = deactivate;
        vm.retrieveCXR              = retrieveCXR;
        vm.addCount                 = addCount;


        init();

        function init () {
            vm[vm.user.role] = true;
            retrieveCXR('');
        };


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
                    vm.pagination.page = $stateParams.page || 1;
                    vm.pagination.total = response.data.data.total;
                    console.log($stateParams)
                    console.log(vm.items)
                    addCount(vm.items)
                }, function (error) {
                    console.log(error);
                    logger.error(error.data.errors[0].message);
                });
        };


        function addCount( items ) {
            for ( var i=0; i<items.length; i++ ) {
                items[i]["count"] = i+1
            };
        };


        function currentPage(page) {
            vm.pagination.page = page;
            $state.go('app.unaided', {page: page, size: $stateParams.size});
        };


    }
    
})();