(function () {
    var controllerId = 'common.views.HR.people.profile';
    appModule.controller(controllerId, ['$rootScope', '$scope', '$stateParams', 'abp.services.app.person',
    function ($rootScope, $scope, $state, $stateParams, personService) {
                var vm = this;

                vm.person = {};

                //TODO:test passing data between pages
                var personId = $stateParams.personId;

                $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    vm.currentMenuName = fromState.menu;
                    //console.log('currentMenuName:' + vm.currentMenuName);
                    //console.log(toParams);
                    //console.log(fromState);
                });

                //Initial
                function init() {
                    vm.loading = true;
                    personService.getPersonForEdit({
                        id: personId
                    }).success(function (result) {
                        vm.person = result;
                        vm.loading = false;
                    });
                }

                init();

            }]);
})();
