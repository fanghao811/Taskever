(function () {
    angular.module('app')

        // =========================================================================
        // MALIHU SCROLL
        // =========================================================================

        //On Custom Class
        .directive('cOverflow', ['scrollService', function (scrollService) {
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
        // WAVES
        // =========================================================================

        // For .btn classes
        .directive('btn', function () {
            return {
                restrict: 'C',
                link: function (scope, element) {
                    if (element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                        Waves.attach(element, ['waves-circle']);
                    }

                    else if (element.hasClass('btn-light')) {
                        Waves.attach(element, ['waves-light']);
                    }

                    else {
                        Waves.attach(element);
                    }

                    Waves.init();
                }
            }
        })


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