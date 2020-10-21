(function (){
    'use strict';

    angular
        .module('app')
        .controller('AidedDetailsCtrl', AidedDetailsCtrl);

    AidedDetailsCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        '$stateParams',
        'QueryService',
        'logger',
        'ModalService'
    ];

    function AidedDetailsCtrl ($scope, $state, $cookies, $stateParams, QueryService, logger, ModalService) {
        
        var vm                      = this;
        vm.pagination               = {};
        vm.pagination.page          = $stateParams.page || 1;
        vm.pagination.size          = $stateParams.size || 10;
        vm.item                     = {};
        vm.findings                 = [];
        vm.imageUrl                 = "https://cherish-cxr.s3-ap-southeast-1.amazonaws.com/orig/1d435a4b.jpg";
        vm.imageUrlAided            = "https://cherish-cxr.s3-ap-southeast-1.amazonaws.com/grad_cam/1d435a4b.jpg";
        vm.age                      = 0;
        vm.user                     = $cookies.getObject('user');
        vm.diagnosis_aided_notes    = "";
        vm.editNotes                = false;
        vm.editDiagnosis            = false;

        // methods 
        vm.back                     = back;
        vm.getImageUrl              = getImageUrl;
        vm.setDiagnosis             = setDiagnosis;
        vm.publishDiagnosis         = publishDiagnosis;
        vm.publishNotes             = publishNotes;
        vm.fixedProbability         = fixedProbability;
        vm.finalizeEvaluation       = finalizeEvaluation;

        init();

        function init () {
            vm.user = GLOBAL.user($cookies, $state);
            if (vm.user) {
                vm[vm.user.role] = true;
                retrieveFinding($stateParams.id);
            };
        };


        function retrieveFinding (id) {
            
            if(vm.user.role === 'physician'){
                var request = {
                                method  : 'GET',
                                body    : {},
                                params  : false,
                                hasFile : false,
                                route   : { 'physician/diagnosis': id }
                            };
            } else {
                var request = {
                                method  : 'GET',
                                body    : {},
                                params  : false,
                                hasFile : false,
                                route   : { 'radiologist/diagnosis': id}
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
                                body    : {diagnosis_aided: vm.diagnosis},
                                params  : false,
                                hasFile : false,
                                route   : { "physician/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
                            };

            } else {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_aided: vm.diagnosis},
                                params  : false,
                                hasFile : false,
                                route   : { "radiologist/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
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

            vm.diagnosis = "";
            vm.editDiagnosis = false;
            
        };


        function publishNotes () {

            var content = {
                header: 'Confirm Notes',
                message: 'Do you want to confirm notes?'
            };

            if (vm.user.role == "physician") {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_aided_notes: vm.diagnosis_aided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "physician/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
                            };

            } else {
                var request = {
                                method  : 'PUT',
                                body    : {diagnosis_aided_notes: vm.diagnosis_aided_notes},
                                params  : false,
                                hasFile : false,
                                route   : { "radiologist/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
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
            vm.diagnosis_aided_notes = "";
            vm.editNotes = false;
            
        };


        function fixedProbability(probability) {
            var new_prob = probability *100;

            return new_prob.toFixed(2);
        
        };

        function finalizeEvaluation (item) {
            if (item.diagnosis_diagnosis_aided_finalized) {
                back();
            } else if (!item.diagnosis_diagnosis_aided) {
                logger.error("Finish diagnosis before exit.")
            } else {
                var content = {
                    header: 'Leave evaluation?',
                    message: "After leaving evaluation, you won't be able to make further edits."
                };

                if (vm.user.role == "physician") {
                    var request = {
                                    method  : 'PUT',
                                    body    : {diagnosis_aided_finalized: "1"},
                                    params  : false,
                                    hasFile : false,
                                    route   : { "physician/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
                                };

                } else {
                    var request = {
                                    method  : 'PUT',
                                    body    : {diagnosis_aided_finalized: "1"},
                                    params  : false,
                                    hasFile : false,
                                    route   : { "radiologist/diagnosis": vm.item.diagnosis_accession_number, 'track': 'aided' }
                                };
                };
                
                ModalService.confirm_modal(content).then( function (response) {

                        if (response) {
                             QueryService
                                .query(request)
                                .then( function (response) { 
                                    logger.success('Successfully evaluated CXR');
                                    // init();
                                    back();
                                }, function (error) { 
                                    logger.error(error.data.message);
                                });
                        };
                    }, function (error) {
                        logger.error(error.data.message);
                    });
            }
        };


        function back () {
            history.back();
        };


        function listImageUrl(url) {
            vm.lists = url.split(' ');
            return vm.lists[0]

        };


    }
    
})();