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
                    nationalIDNumber: '',
                    phoneList: [],
                    phoneTypeList:[]
                };

                vm.newPhone = {
                    personId: null,
                    phoneNumberType: 1,
                    phoneNumber: ''
                };

                vm.genders = [{
                    gender: '男',
                    value: 1
                },
                {
                    gender: '女',
                    value: 2,
                }];

                vm.getPhoneTypeAsString = function (typeAsNumber) {
                    switch (typeAsNumber) {
                        case 1:
                            return '手机';
                        case 2:
                            return '座机';
                        case 3:
                            return '宅电';
                        case 4:
                            return '公司';
                        case 5:
                            return '传真';
                        default:
                            return '?';
                    }
                };


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


                // =========================================================================
                // PersonPhone 
                // =========================================================================

                vm.deletePhone = function (phone) {
                    personService.deletePhone({
                        id: phone.id
                    }).success(function () {
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                        vm.person.phoneList = _.without(vm.person.phoneList, phone);
                    });
                };

                vm.addPhone = function (phone) {
                    if (!phone || !phone.phoneNumberType || !phone.phoneNumber) {
                        abp.message.warn('Please select a phone type and enter a number!');
                        return;
                    }

                    phone.personId = vm.person.id;

                    personService.addPhone(phone)
                        .success(function (result) {
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            vm.person.phoneList.push(result);
                            phone.phoneNumberType = 1;
                            phone.phoneNumber = '';
                        });
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
