(function (){
    'use strict';

    angular
        .module('app')
        .controller('UnaidedDetailsCtrl', UnaidedDetailsCtrl);

    UnaidedDetailsCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'QueryService',
        'logger'
    ];

    function UnaidedDetailsCtrl ($scope, $state, $cookies, $stateParams, QueryService, logger) {
        
        var vm                      = this;
        vm.pagination               = {};
        vm.pagination.page          = $stateParams.page || 1;
        vm.pagination.size          = $stateParams.size || 10;
        vm.item                     = {};
        vm.findings                 = [];
        vm.imageUrl                 = ""
        vm.age                      = 0;
        vm.user                     = $cookies.getObject('user');

        // methods 
        vm.back                     = back;
        vm.getImageUrl              = getImageUrl;

        init();

        function init () {
            vm.user = GLOBAL.user($cookies, $state);
            if (vm.user) {
                vm[vm.user.role] = true;
                retrieveCXR($stateParams.id);
            };
        };


        function retrieveCXR (id) {
            
            if(vm.user.role === 'physician'){
                var request = {
                                method  : 'GET',
                                body    : {},
                                params  : false,
                                hasFile : false,
                                route   : { 'physician/cxr': id }
                            };
            } else {
                var request = {
                                method  : 'GET',
                                body    : {},
                                params  : false,
                                hasFile : false,
                                route   : { 'radiologist/cxr': id}
                };
            };

            QueryService
                .query(request)
                .then( function (response) { 
                    vm.item = response.data.data.items[0];
                    getImageUrl(vm.item.cxr_filename)
                    console.log(vm.item)
                }, function (error) {
                    logger.error(error.data.message);
                });
        };


        function getImageUrl(filename) {


            var filename = filename.replace(".dcm", ".png")
            vm.imageUrl = "https://cherish-cxr.s3-ap-southeast-1.amazonaws.com/test/cxr/"+filename;
            return vm.imageUrl

        };


        function back () {
            history.back();
        };


        function listImageUrl(url) {
            // console.log(url)
            vm.lists = url.split(' ');
            // console.log(vm.lists)
            return vm.lists[0]

        };


    }
    
})();