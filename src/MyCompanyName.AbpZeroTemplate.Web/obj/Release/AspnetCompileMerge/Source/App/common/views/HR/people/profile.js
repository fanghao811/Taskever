(function () {
    var controllerId = 'common.views.HR.people.profile';
    appModule.controller(controllerId, ['$rootScope', '$scope', '$stateParams', 'abp.services.app.person',
    function ($rootScope, $scope, $stateParams, personService) {
        var vm = this;

        vm.person = {};
        vm.currentMenuName = $rootScope.currentMenuName;
        //TODO:test passing data between pages
        var personId = $stateParams.personId;

        //Initial
        function init() {
            vm.loading = true;
            personService.getPersonForEdit({
                id: personId
            }).success(function (result) {
                vm.person = result;
                vm.loading = false;
                //console.log(vm.currentMenuName);
            });
        }

        init();

    }]);
})();
