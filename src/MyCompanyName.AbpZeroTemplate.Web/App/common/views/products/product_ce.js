(function () {
    appModule.controller('common.views.products.createOrEdit', [
        '$scope', '$uibModal','$state', '$stateParams', 'abp.services.app.product',
        function ($scope, $uibModal,$state, $stateParams, productService) {
            var vm = this;
            vm.saving = false;
            vm.loading = false;
            //4 - 23
            vm.open = true;

            // =========================================================================
            // $stateParams.productId;
            // =========================================================================
            var productId = $stateParams.productId;

            vm.units = [
                { name: '件', value: 1 },
                { name: '个', value: 2 },
                { name: '台', value: 3 }
            ]

            vm.product = {};

            // =========================================================================
            // getProductForEdit
            // =========================================================================

            //TODO: GetProductForEdit
            vm.getProductForEdit = function (product_Id) {
                productService.getProductForEdit({ id: product_Id })
                    .success(function (result) {
                        vm.product = result;
                    });
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
                            vm.product.category = result.displayName;
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
                    $state.go('location');
                });
            };

            vm.cancel = function () {
                vm.product = {};
            };

            function init() {
                vm.getProductForEdit(productId);
            }

            init();

            // =========================================================================
            // angular-bootstrap-switch  github:https://github.com/frapontillo/angular-bootstrap-switch 
            // =========================================================================

        }
    ]);
})();