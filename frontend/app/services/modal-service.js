;(function (){
    'use strict';

    angular
       .module('app')
       .factory('ModalService', ModalService);

    ModalService.$inject = ['$uibModal'];
    function ModalService ($uibModal) {

        var service = { 
            form_modal:    form_modal,
            confirm_modal: confirm_modal, 
            message_modal: message_modal
        };

        return service;

        function list_modal (request, modal, template) { 

            var modalInstance = $uibModal.open({ 
                'templateUrl'   : template.url,
                'controller'    : template.ctrl,
                'controllerAs'  : 'vm',
                'size'          : 'md',
                'backdrop'      : 'static',
                'resolve'       : {
                    Request : function () {
                        return request;
                    },
                    Modal : function () {
                        return modal;
                    }
                }
            });

            return modalInstance.result;
        }

        function form_modal (request, modal, template) { 

            var modalInstance = $uibModal.open({
                'templateUrl'   : template.url,
                'controller'    : template.ctrl,
                'controllerAs'  : 'vm',
                'size'          : 'md',
                'backdrop'      : 'static',
                'resolve'       : {
                    Request : function () {
                        return request;
                    },
                    Modal : function () {
                        return modal;
                    }
                }
            });

            return modalInstance.result;

        }

        function confirm_modal (data) { 

            var modalInstance = $uibModal.open({ 
                'templateUrl'   : 'app/shared/modals/confirmation-modal/confirmation-modal.html',
                'controller'    : 'ConfirmationModalCtrl',
                'controllerAs'  : 'vm',
                'size'          : 'sm',
                'backdrop'      : 'static',
                'resolve'       : { 
                    Data : function () {
                        return data;
                    }
                }
            });

            return modalInstance.result;

        }

        function email_modal (data, callback) {
            var modalInstance = $uibModal.open({
                'templateUrl'   : 'app/shared/modals/invitation-modal/invitation-modal.html',
                'controller'    : 'InvitationCtrl',
                'controllerAs'  : 'vm',
                'size'          : 'sm',
                'backdrop'      : true,
                'resolve'       : {
                    Data        : function () {
                        return data;
                    }
                }
            })
            .result.then( function (data) {
                if (data) {
                    return callback(data);
                };
            });
        }

        function message_modal (msg) {
            var modalInstance = $uibModal.open({
                'templateUrl'   : 'app/shared/modals/message-modal/message-modal.html',
                'controller'    : 'MessageModalCtrl',
                'controllerAs'  : 'vm',
                'size'          : 'sm',
                'backdrop'      : true,
                'resolve'       : {
                    message     : function () {
                        return msg;
                    }
                }
            });
        }

    }

})();