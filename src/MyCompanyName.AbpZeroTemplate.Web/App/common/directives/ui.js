(function () {
    'use strict';
    
        // =========================================================================
        // MALIHU SCROLL
        // =========================================================================

        //On Custom Class --mCustomScorall directive
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
        }])


        // =========================================================================
        // ButtonBusy
        // =========================================================================

        .directive('buttonBusy', function () {
            return {
                restrict: 'A',
                scope: {
                    buttonBusy: '='
                },
                link: function ($scope, element, attrs) {

                    var disabledBefore = false;
                    var $button = $(element);
                    var $buttonInnerSpan = $button.find('span');
                    var buttonOriginalText = null;

                    var $icon = $button.find('i');
                    var iconOriginalClasses = null;

                    $scope.$watch('buttonBusy', function () {
                        if ($scope.buttonBusy) {
                            //disable button
                            $button.attr('disabled', 'disabled');
                            //change icon
                            if ($icon.length) {
                                iconOriginalClasses = $icon.attr('class');
                                $icon.removeClass();
                                $icon.addClass('fa fa-spin fa-spinner');
                            }
                            //change text
                            if (attrs.busyText && $buttonInnerSpan.length) {
                                buttonOriginalText = $buttonInnerSpan.html();
                                $buttonInnerSpan.html(attrs.busyText);
                            }

                            disabledBefore = true;
                        } else {
                            if (!disabledBefore) {
                                return;
                            }

                            //enable button
                            $button.removeAttr('disabled');
                            //restore icon
                            if ($icon.length && iconOriginalClasses) {
                                $icon.removeClass();
                                $icon.addClass(iconOriginalClasses);
                            }
                            //restore text
                            if ($buttonInnerSpan.length && buttonOriginalText) {
                                $buttonInnerSpan.html(buttonOriginalText);
                            }
                        }
                    });
                }
            };
        })


        // =========================================================================
        // BusyIf
        // =========================================================================

        .directive('busyIf', [
            function () {
                return {
                    restrict: 'A',
                    scope: {
                        busyIf: "="
                    },
                    link: function (scope, element, attrs) {
                        scope.$watch('busyIf', function () {
                            if (scope.busyIf) {
                                abp.ui.setBusy($(element));
                            } else {
                                abp.ui.clearBusy($(element));
                            }
                        });
                    }
                };
            }
        ])

})();