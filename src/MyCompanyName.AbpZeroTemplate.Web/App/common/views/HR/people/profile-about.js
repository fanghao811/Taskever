(function () {
    var controllerId = 'common.views.HR.people.profile-about';
    appModule.controller(controllerId, ['$scope','$filter', '$state', '$stateParams', 'abp.services.app.person',
            function ($scope, $filter, $state, $stateParams, personService) {

                //Get Profile Information from profileService Service
                var vm = this;
                vm.saving = false;
                vm.person = {
                    id: null,
                    name: '',
                    birthDate: null,
                    gender: null,
                    nationalIDNumber: ''
                };

                vm.genders = [{
                    gender: '男',
                    value: 1
                },
                {
                    gender: '女',
                    value: 2,
                }];


                //TODO:test passing data between pages
                var personId = $stateParams.personId;

                // =========================================================================
                // Datepicker set 
                // =========================================================================
                vm.today = function () {
                    vm.dt = new Date('1987/08/22');
                };
                vm.today();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yyyy',
                    startingDay: 1
                };


                //Edit
                vm.editInfo = 0;
                vm.submit = function () {
                    vm.saving = false;
                    personService.createOrUpdatePerson({
                        person: vm.person
                    }).success(function () {
                        abp.notify.info(app.localize('SavedSuccessfully'));
                    }).finally(function () {
                        vm.editInfo = 0;
                        vm.saving = false;
                    });
                };

                function init() {
                    vm.loading = true;
                    personService.getPersonForEdit({
                        id: personId
                    }).success(function (result) {
                        vm.person = result;
                        vm.person.birthDate = new Date(vm.person.birthDate);
                    });
                }
                init();

            }]);
})();
