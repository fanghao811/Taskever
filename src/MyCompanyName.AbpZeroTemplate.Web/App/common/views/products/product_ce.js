(function () {
    appModule.controller('common.views.products.createOrEdit', [
        '$scope', '$uibModal', 'abp.services.app.product', 'enumService', '$log',
        function ($scope, $uibModal, productService, enumService, $log) {
            var vm = this;
            vm.saving = false;
            vm.loading = false;
            //4 - 23
            vm.open = true;

            //viewModal
            vm.location = '';
            vm.department = '';
            vm.category = '';

            //vm.productUnits = enumService.product_units;

            vm.units = [
                { name: '件', value: 1 },
                { name: '个', value: 2 },
                { name: '台', value: 3 }
            ]

            vm.orderStates = enumService.taskOrder_states;

            vm.product = {
                id: null,
                categoryOuId: 4,

                productNumber: '330724',
                name: 'IC1600多路输入采集开关',
                abbreviation: 'IC1600开关',
                mnemonicCode: 'IC1600',
                modelNumber: '多路输入',
                specification: '10*24*30cm',
                unit: '',
                description: '测试',
                comment: '测试'
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

            // =========================================================================
            // openLocationTreeModal 打开选择位置树Modal
            // =========================================================================

            vm.openTreeModal = function (rootId) {//树根Id, vm.product.locationOuId, vm.location
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/organizationUnits/oUTreeModal.cshtml',
                    controller: 'common.views.organizationUnits.oUTreeModal as vm',
                    backdrop: 'static',
                    resolve: { id: rootId }
                    //size:'lg'
                });

                modalInstance.result.then(function (result) {
                    switch (rootId) {
                        case 3:
                            vm.product.locationOuId = result.id;
                            vm.location = result.displayName;
                            break;
                        case 2:
                            vm.product.departmentOuId = result.id;
                            vm.department = result.displayName;
                            break;
                        case 1:
                            vm.product.categoryOuId = result.id;
                            vm.category = result.displayName;
                            break;
                        default:

                            break;
                    }
                });
            };

            // =========================================================================
            // vm.save() && vm.cancel()
            // =========================================================================

            vm.save = function () {//TODO: 新增产品
                vm.saving = true;
                productService.createOrUpdateProduct(
                    vm.product
                ).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));

                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.cancel = function () {
                vm.product = {};
            };



            //function init() {
            //    if (!productId) {// 如果 productId==null
            //        vm.loading = true;
            //        productService.getProductForEdit({
            //            id: productId
            //        }).success(function (result) {
            //            vm.product = result.product;
            //            vm.loading = false;
            //        });
            //    };
            //};

            //init();

            // =========================================================================
            // angular-bootstrap-switch  github:https://github.com/frapontillo/angular-bootstrap-switch 
            // =========================================================================

        }
    ]);
})();