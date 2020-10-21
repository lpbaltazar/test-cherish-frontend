;(function (){
    'use strict';

    angular
        .module('app')
        .controller('AidedListCtrl', AidedListCtrl);

    AidedListCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function AidedListCtrl ($scope, $state, $cookies, $stateParams, ModalService, QueryService, logger) {
        
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
        // vm.add                      = add;
        // vm.update                   = update;
        // vm.handleDeactivateItem     = handleDeactivateItem;
        // vm.deactivate               = deactivate;
        vm.retrieveCXR              = retrieveCXR;
        vm.addCount                 = addCount;
        vm.shuffle                  = shuffle;
        vm.filterTable              = filterTable;
        vm.combine                  = combine;

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
                    vm.diagnosis        = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    vm.count            = vm.items[vm.items.length - 1];
                    vm.items            = vm.items.splice(0, vm.items.length - 1);
                    shuffle(vm.items);
                    shuffle(vm.items);
                    shuffle(vm.items);
                    addCount(vm.items)
                    vm.originalitems    = vm.items;
                    // console.log(vm.items)
                    combine(vm.items, vm.diagnosis[0])
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

        
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        };


        function currentPage(page) {
            vm.pagination.page = page;
            $state.go('app.aided', {page: page, size: $stateParams.size});
        };


        function filterTable(status) {
            var originalitems = vm.originalitems;

            if (status === "All") {
                vm.items = originalitems;
            } else if (status === "Done") {
                let items = vm.originalitems.filter(it => it.finished);
                vm.items = items;
            } else {
                let items = vm.originalitems.filter(it => !it.finished);
                vm.items = items;
            }

            // x => x !== null
            // console.log(vm.items)
        };

        function combine(items, diagnosis) {
            for (var i=0; i<items.length; i++) {
                var cxr_acc = items[i].cxr_accession_number;

                for (var j=0; j<diagnosis.length; j++) {
                    var diagnosis_acc = diagnosis[j].diagnosis_accession_number;
                    
                    if (cxr_acc === diagnosis_acc) {
                        items[i]["finished"] = true;
                        diagnosis = diagnosis.filter(it => it.diagnosis_accession_number !== cxr_acc)
                    }
                    // } else {
                    //     items[i]["finished"] = false;
                    // }
                }
            }
            vm.items = items;
        };


    }
    
})();