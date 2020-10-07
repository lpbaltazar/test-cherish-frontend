;(function (){
    'use strict';

    angular
        .module('app')
            .directive('billingDirective', billingDirective)
            .directive('collectionDirective', collectionDirective)
            .directive('depositDirective', depositDirective)
            .directive('returnDocDirective', returnDocDirective)
            .directive('errandDirective', errandDirective); 

    function billingDirective () {
        return {
            'restrict' : "EA", 
            'templateUrl' : "app/components/billings/history/billing-directive.html"
        };
    }

    function collectionDirective () {
        return {
            'restrict' : "EA",
            'templateUrl' : "app/components/collections/history/collection-directive.html"
        }
    }

    function depositDirective () {
        return {
            'restrict' : "EA",
            'templateUrl' : "app/components/deposits/history/deposit-directive.html"
        }
    }

    function returnDocDirective () {
        return {
            'restrict' : "EA",
            'templateUrl' : "app/components/return-trips/history/return-doc-directive.html"
        }
    }

    function errandDirective () {
        return {
            'restrict' : "EA",
            'templateUrl' : "app/components/errands/history/errand-directive.html"
        }
    }

})();