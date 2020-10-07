;(function (){
    'use strict';

    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$scope', 
        '$state', 
        '$cookies',
        'logger'
    ];

    function DashboardCtrl ($scope, $state, $cookies, logger) {
        var vm                  = this;

        vm.accuracyGraph = document.getElementById("accuracy-graph");
        vm.positiveGraph = document.getElementById("positive-graph");
        vm.negativeGraph = document.getElementById("negative-graph");

        init();
        function init () {
            vm.accuracyData = {
                datasets: [{
                    data: [87, 13],
                    backgroundColor: [
                        "#56A5EC",
                        "#FFA62F",
                    ],
                }],
                labels: [
                    'Hit',
                    'Miss'
                ]
            };

            vm.positiveData = {
                datasets: [{
                    data: [40, 1],
                    backgroundColor: [
                        "#56A5EC",
                        "#FFA62F",
                    ],
                }],
                labels: [
                    'Hit',
                    'Miss'
                ]
            };


            vm.negativeData = {
                datasets: [{
                    data: [47, 12],
                    backgroundColor: [
                       "#56A5EC",
                        "#FFA62F",
                    ],
                }],
                labels: [
                    'Hit',
                    'Miss'
                ]
            };


            // drawCharts();
        }

        function drawCharts() {
            var accuracyChart =   new Chart(vm.accuracyGraph, {
                type: 'doughnut',
                data: vm.accuracyData,
                options: {
                    cutoutPercentage:40,
                    legend: {
                        display: false,
                    }
                }
            });

            var positiveChart =   new Chart(vm.positiveGraph, {
                type: 'doughnut',
                data: vm.positiveData,
                options: {
                    cutoutPercentage:40,
                    legend: {
                        display: false,
                    }
                }
            });

            var negativeChart =   new Chart(vm.negativeGraph, {
                type: 'doughnut',
                data: vm.negativeData,
                options: {
                    cutoutPercentage:40,
                    legend: {
                        display: false,
                    }
                }
            });


        }
    }


    
    
})();