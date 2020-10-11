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
        'logger',
        'ModalService'
    ];

    function UnaidedDetailsCtrl ($scope, $state, $cookies, $stateParams, QueryService, logger, ModalService) {
        
        var vm                      = this;
        vm.pagination               = {};
        vm.pagination.page          = $stateParams.page || 1;
        vm.pagination.size          = $stateParams.size || 10;
        vm.item                     = {};
        vm.findings                 = [];
        vm.imageUrl                 = "";
        vm.age                      = 0;
        vm.user                     = $cookies.getObject('user');
        vm.diagnosis_unaided_notes  = "";

        // methods 
        vm.back                     = back;
        vm.getImageUrl              = getImageUrl;
        vm.setDiagnosis             = setDiagnosis;
        vm.publishDiagnosis         = publishDiagnosis;
        vm.publishNotes             = publishNotes;

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


        function setDiagnosis(diagnosis) {
            vm.item.diagnosis_diagnosis_unaided = diagnosis;
            vm.diagnosis = diagnosis;
        };


        function publishDiagnosis () {
            var content = {
                header: 'Confirm Diagnosis',
                message: 'Do you want to confirm diagnosis?'
            };

            if (vm.user.role == "physician") {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_unaided_notes: vm.diagnosis_unaided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "physician/diagnosis": vm.item.diagnosis_accession_number, 'track': 'unaided' }
                            };

            } else {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_unaided_notes: vm.diagnosis_unaided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "radiologist/diagnosis": vm.item.diagnosis_accession_number, 'track': 'unaided' }
                            };
            };
            
            ModalService.confirm_modal(content).then( function (response) {

                    if (response) {
                         QueryService
                            .query(request)
                            .then( function (response) { 
                                logger.success('Successfully published diagnosis');
                                init();
                            }, function (error) { 
                                logger.error(error.data.message);
                            });
                    };
                }, function (error) {
                    logger.error(error.data.message);
                });
            
        };


        function publishNotes () {
            var content = {
                header: 'Confirm Notes',
                message: 'Do you want to confirm notes?'
            };

            if (vm.user.role == "physician") {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_unaided_notes: vm.diagnosis_unaided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "physician/diagnosis": vm.item.diagnosis_accession_number, 'track': 'unaided' }
                            };

            } else {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_unaided_notes: vm.diagnosis_unaided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "radiologist/diagnosis": vm.item.diagnosis_accession_number, 'track': 'unaided' }
                            };
            };

            ModalService.confirm_modal(content).then( function (response) {

                    if (response) {
                         QueryService
                            .query(request)
                            .then( function (response) { 
                                logger.success('Successfully published notes');
                                init();
                            }, function (error) { 
                                logger.error(error.data.message);
                            });
                    };
                }, function (error) {
                    logger.error(error.data.message);
                });
            
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