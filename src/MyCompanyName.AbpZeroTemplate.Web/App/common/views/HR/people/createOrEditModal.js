(function () {
    appModule.controller('common.views.HR.people.createOrEditModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.person', 'personId',
        function ($scope, $uibModalInstance, personService, personId) {
            var vm = this;

            vm.saving = false;
            vm.loading = false;

            vm.person = null;

            //Methords
            vm.save = function () {//TODO: 新增人员
                vm.saving = true;
                personService.createOrUpdatePerson(vm.person)
                .success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    $modalInstance.close();
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
            }

            init();
        }
    ]);
})();