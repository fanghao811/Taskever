(function () {
    appModule.controller('common.views.chatHub.index', [
        '$scope', function ($scope) {
            var vm = this;

            var chatHub = $.connection.chatHub; //获取 hub的引用

            chatHub.client.getMessage = function (message) { //为即将到来的信息注册
                abp.notify.info('received message: ' + message+new date().toLocaleDateString());
                console.log('接受到服务器发送的消息! ');
                $scope.$apply();//添加
            };

            vm.sendMessage = function () {
                console.log('向服务器发送一条消息! ');
                chatHub.server.sendMessage("Hi everybody, I'm connected to the chat!"); //给服务器发送信息             
            };

            abp.event.on('abp.signalr.connected', function () { //为连接事件注册
                console.log('已经连接到chatHub!');
                chatHub.server.sendMessage("Hi everybody, I'm connected to the chat!"); //给服务器发送信息
            });
        }
    ]);
})();