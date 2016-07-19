(function () {

    // =========================================================================
    // Malihu Scroll - Custom Scroll bars
    // =========================================================================

    appModule.service('scrollService', function () {
        var ss = {};
        ss.malihuScroll = function scrollBar(selector, theme, mousewheelaxis) {
            $(selector).mCustomScrollbar({
                theme: theme,
                scrollInertia: 100,
                axis: 'yx',
                mouseWheel: {
                    enable: true,
                    axis: mousewheelaxis,
                    preventDefault: true
                }
            });
        }
        return ss;
    });
    appModule.factory('enumService', function () {
        var factory = {};
        factory = {
            taskOrder_priorities: [
                { name: '低', value: 1 },
                { name: '中', value: 2 },
                { name: '高', value: 3 }
            ],
            taskOrder_states: [
                { name: '待分配', value: 1 },
                { name: '待接收', value: 2 },
                { name: '进行中', value: 3 },
                { name: '暂停', value: 4 },
                { name: '完成', value: 5 }
            ]
        };
        return factory;
    });

})();