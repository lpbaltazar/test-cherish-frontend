;(function (){
    'use strict';

    angular
       .module('app')
       .factory('SocketService', SocketService);

    SocketService.$inject = [
        '$cookies', 
        '$state', 
        'socketFactory'
    ];

    function SocketService ($cookies, $state, socketFactory) {
       
        var user = GLOBAL.user($cookies, $state);

        var socket = this; 

        var service = {
           connect          : connect,
           on               : on,
           emit             : emit,
           removeListener   : removeListener,
           removeAll        : removeAll,
           disconnect       : disconnect

        };

        return service;

        function connect ()  { 
            var connectSocket = io.connect(GLOBAL.socketUrl, { 
                    query:'token=' + user.token, 
                    transports: ['websocket']
            }); 
            var newSocket = socketFactory({
                ioSocket : connectSocket,
                forceNew : true
            });

            socket = newSocket;
        }

        function on (event, callback) { 
            socket.on(event, function (data) {
                callback(data);
            });
        }
        
        function emit   (event, data, callback) { 
            socket.emit(event, data, function (data) {
                callback(data); 
            });
        }
        
        function removeListener   (event) { 
            socket.removeListener(event);
        }
        
        function removeAll () {
            socket.removeAllListeners();
        }
        
        function disconnect   () { 
            socket.disconnect();
        }
        
        socket : socket
    
    }

})();
