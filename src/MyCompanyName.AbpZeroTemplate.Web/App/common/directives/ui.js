(function () {

        // =========================================================================
        // MALIHU SCROLL
        // =========================================================================

        //On Custom Class
    appModule.directive('cOverflow', ['scrollService', function (scrollService) {
            return {
                restrict: 'C',
                link: function (scope, element) {

                    if (!$('html').hasClass('ismobile')) {
                        scrollService.malihuScroll(element, 'minimal-dark', 'y');
                    }
                }
            }
        }])




        // =========================================================================
        // AutoFocus
        // =========================================================================

        .directive('autoFocus', function () {
            return {
                restrict: 'A',
                link: function ($scope, element) {
                    element[0].focus();
                }
            };
        })


        // =========================================================================
        // EnterKey
        // =========================================================================

        .directive('enterKey', [
            function () {
                return function (scope, element, attrs) {
                    element.bind("keydown keypress", function (event) {
                        if (event.which === 13) {
                            scope.$apply(function () {
                                scope.$eval(attrs.enterKey);
                            });

                            event.preventDefault();
                        }
                    });
                };
            }
        ])





})();