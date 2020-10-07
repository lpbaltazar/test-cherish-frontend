;(function () {
    'use strict';

   angular
       .module('app')
       .factory('QueryService', QueryService);

    QueryService.$inject = ['$http', '$q'];

    function QueryService ($http, $q) {

        var service = {
            query : query,
            roadSnapQuery : roadSnapQuery
        };

        return service;

        function query(req, nameSpace) {
            var request = { 
                method  : req.method,
                data    : GLOBAL.clean_data(req.body),
                url     : typeof (req.route) === 'string' ? req.route : GLOBAL.set_url(req.route),
                headers : GLOBAL.header(req.token),
                params  : GLOBAL.parameters(req.params),
                withCredentials: true,
                cache   : req.cache,
                transformRequest : GLOBAL.transform(req.hasFile)
            };
            // if (req.hasFile) { 
            //     request.headers['Content-Type'] = undefined;
            // } 
            if (req.nameSpace) {
                request.headers['Client-Application'] = nameSpace;
            }
            var new_req = GLOBAL.clean_object(request); 
            // console.log(new_req);
            return $http(new_req);
        }

        function roadSnapQuery (coords) {

            var promises = [];

            for (var i = 0; i < coords.length; i++) {
                promises.push(
                    $http({
                        method : "GET",
                        url    : "https://roads.googleapis.com/v1/snapToRoads",
                        params : {
                            interpolate: true,
                            key: GLOBAL.roadApiKey,
                            path: coords[i].join('|')
                        }
                    })
                );
            }

            return $q.all(promises);

        }

    }


})();