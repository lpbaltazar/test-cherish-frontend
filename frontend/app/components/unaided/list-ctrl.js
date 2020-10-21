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
        vm.originalitems            = [];
        vm.user                     = $cookies.getObject('user');
        vm.count                    = [];

        // methods 
        vm.currentPage              = currentPage;
        vm.retrieveCXR              = retrieveCXR;
        vm.addCount                 = addCount;
        vm.filterTable              = filterTable;


        init();

        function init () {
            vm[vm.user.role] = true;
            // console.log(vm.user)
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
                    vm.diagnosis        = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    vm.count            = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    vm.pagination.page  = $stateParams.page || 1;
                    vm.pagination.total = response.data.data.total;
                    addCount(vm.items)
                    vm.originalitems    = vm.items;
                    console.log(vm.items)
                    console.log(vm.diagnosis[0].length)
                    console.log(vm.count)
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

        function filterTable(status) {
            var originalitems = vm.originalitems;

            if (status === "All") {
                vm.items = originalitems;
            } else if (status === "Done") {
                let items = vm.originalitems.filter(it => it.diagnosis_diagnosis_unaided_finalized === 1);
                vm.items = items;
            } else {
                let items = vm.originalitems.filter(it => it.diagnosis_diagnosis_unaided_finalized === null);
                vm.items = items;
            }

            x => x !== null
            // console.log(vm.items)
        };

        function filterUser(items) {
            console.log(items);
            var user_id = vm.user.id
            items = items.filter(it => it.diagnosis_user_id === user_id);
            console.log(items);
        };


    }
    
})();