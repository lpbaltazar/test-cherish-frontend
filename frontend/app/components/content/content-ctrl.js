;(function (){
    'use strict';

    angular
        .module('app')
        .controller('ContentCtrl', ContentCtrl);

    ContentCtrl.$inject = [
        '$scope',
        '$state',
        '$cookies',
        '$stateParams'];

    function ContentCtrl ($scope, $state, $cookies, $stateParams) {
        var vm                = this;
        $scope.$on('loading', function(event, jsonObj) {
              vm.loadingValue = jsonObj.loadingValue;
              if (GLOBAL.debug) console.log(vm.loadingValue);
        }); 
    }
})();