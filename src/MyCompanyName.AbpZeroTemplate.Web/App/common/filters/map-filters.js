(function () {
    appModule.filter('mapGender', function () {
        var genderHash = {
            1: '男',
            2: '女'
        };
        return function (input) {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        };
    })//1
    .filter('mapPriority', function () {
        var priorityHash = {
            1: '5分钟',
            2: '10分钟',
            3: '15分钟'
        };
        return function (input) {
            if (!input) {
                return '';
            } else {
                return priorityHash[input];
            }
        };
    });//2
})();