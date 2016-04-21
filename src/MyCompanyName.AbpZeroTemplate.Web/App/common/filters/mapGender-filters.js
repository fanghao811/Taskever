(function () {
    appModule.filter('mapGender', function () {//1
            var genderHash = {
                1: '男',
                2: '女'
            };

            return function(input) {
                if (!input){
                    return '';
                } else {
                    return genderHash[input];
                }
            };

    });//1
})();