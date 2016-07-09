(function () {
    var controllerId = 'common.views.tasks.createOrEdit';
    appModule.controller(controllerId, [
        '$scope', '$filter', '$uibModal', 'abp.services.app.taskOrder',
        function ($scope, $filter, $uibModal, taskOrderService) {

            var vm = this;

            //状态控制 Flags
            vm.saving = false;
            vm.loading = false;

            vm.priorities = [
                { name: '低', value: 1 },
                { name: '中', value: 2 },
                { name: '高', value: 3 }
            ];

            //数据模型 viewModel
            vm.taskOrder = {
                device:'',
                location: '',
                priority: 3
            };

            // =========================================================================
            // vm.save() && vm.cancel()
            // =========================================================================

            vm.save = function () {//TODO: 新增产品
                vm.saving = true;
                //taskOrderService.createOrUpdateTaskOrder(
                //    vm.taskOrder
                //).success(function () {
                //    abp.notify.info(app.localize('SavedSuccessfully'));

                //}).finally(function () {
                //    vm.saving = false;
                //});
            };

            vm.cancel = function () {
                vm.taskOrder = {};
            };

            // =========================================================================
            // openDevicesModal 打开设备选择弹窗
            // =========================================================================

            vm.openDeviceModal = function (rootId) {//树根Id, vm.product.locationOuId, vm.location
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/tasks/deviceModal.cshtml',
                    controller: 'common.views.tasks.deviceModal as vm',
                    resolve: { id: rootId },
                    backdrop: 'static'
                    //size: 'lg'
                });

                modalInstance.result.then(function (result) {
                    vm.taskOrder.device = result;
                });
            };

            // =========================================================================
            // openLocationTreeModal 打开位置选择弹窗
            // =========================================================================

            vm.openTreeModal = function (rootId) {//树根Id, vm.product.locationOuId, vm.location
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/tasks/locationTreeModal.cshtml',
                    controller: 'common.views.tasks.locationTreeModal as vm',
                    resolve: { id: rootId },
                    backdrop: 'static',
                    size: 'lg'
                });

                modalInstance.result.then(function (result) {
                    vm.taskOrder.location = result;
                });
            };

        }
    ]);
})();