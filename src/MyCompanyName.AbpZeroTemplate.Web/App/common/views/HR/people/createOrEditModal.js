(function () {
    appModule.controller('common.views.HR.people.createOrEditModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.person', 'personId',
        function ($scope, $uibModalInstance, personService, personId) {
            var vm = this;

            vm.saving = false;
            vm.loading = false;
            //4 - 23
            vm.open = true;

            vm.person = {
                id:null,
                name:'',
                birthDate:'',
                gender: null,
                nationalIDNumber:''
            };

            // =========================================================================
            // Datepicker set 
            // =========================================================================
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.open = function ($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope[opened] = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            //Methods
            vm.save = function () {//TODO: 新增人员
                vm.saving = true;
                personService.createOrUpdatePerson({
                    person:vm.person
                }).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    $uibModalInstance.close();
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            function init() {
                vm.loading = true;
                personService.getPersonForEdit({
                    id: personId
                }).success(function (result) {
                    vm.person = result.person;
                    vm.loading = false;
                });
            };

            init();
        }
    ]);
})();