(function () {
    var controllerId = 'common.views.HR.people.profile';
    appModule.controller(controllerId, ['$scope', '$state', '$stateParams', 'abp.services.app.person',
            function ($scope, $state, $stateParams, personService) {

                //Get Profile Information from profileService Service
                var vm = this;
                vm.saving = false;
                vm.loading = false;
                vm.person = {};

                //TODO:test passing data between pages
                var personId = $stateParams.personId;



                vm.items = [{ id: 1, name: 'male' }, { id: 2, name: 'female' }];//gender options

                //Edit
                vm.editSummary = 0;
                vm.editInfo = 0;
                vm.editContact = 0;


                vm.submit = function (item, message) {
                    if (item === 'profileSummary') {
                        vm.editSummary = 0;
                    }

                    if (item === 'profileInfo') {
                        vm.editInfo = 0;
                    }

                    if (item === 'profileContact') {
                        vm.editContact = 0;
                    }
                };

                function init(){
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
