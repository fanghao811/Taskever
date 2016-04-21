(function () {
    //桌面通知服务
    appModule.factory('NotifyService', function () {
        return {
            Notify: function (icon, title, msg) {
                // At first, let's check if we have permission for notification
                // If not, let's ask for it
                if (window.Notification && Notification.permission !== "granted") {
                    Notification.requestPermission(function (status) {
                        if (Notification.permission !== status) {
                            Notification.permission = status;
                        }
                    });
                }
                var iconPath = '/Content/images/icons/' + (icon || 'info') + '.png';
                var options = {
                    lang: 'zh-CN',
                    body: msg,
                    icon: iconPath
                };
                var notify;
                // If the user agreed to get notified
                if (window.Notification && Notification.permission === "granted") {
                    notify = new Notification(title, options);
                }
                else if (window.Notification && Notification.permission !== "denied") {
                    Notification.requestPermission(function (status) {
                        if (Notification.permission !== status) {
                            Notification.permission = status;
                        }
                        if (status === "granted") {
                            notify = new Notification(title, options);
                        }
                        else {
                            console.log('您禁止了桌面通知，无法推送到您的桌面！');
                        }
                    });
                }
                else {
                    console.log('您禁止了桌面通知，无法推送到您的桌面！');
                }
                if (notify) {
                    notify.onclose = function (evt) {

                    };
                    //点击切换到浏览器
                    notify.onclick = function () {
                        window.focus();
                    };
                }
            }
        };
    });
})();