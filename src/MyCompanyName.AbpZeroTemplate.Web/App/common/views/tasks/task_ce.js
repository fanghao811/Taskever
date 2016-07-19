(function () {
    var controllerId = 'common.views.tasks.createOrEdit';
    appModule.controller(controllerId, [
        '$scope', '$log', '$stateParams', '$filter', '$uibModal', 'enumService', 'abp.services.app.taskOrder',
        function ($scope, $log, $stateParams, $filter, $uibModal, enumService, taskOrderService) {

            var vm = this;

            //状态控制 Flags
            vm.saving = false;
            vm.loading = false;
            vm.title = '新建工单';

            //vm.priorities = [
            //    { name: '低', value: 1 },
            //    { name: '中', value: 2 },
            //    { name: '高', value: 3 }
            //];

            vm.priorities = enumService.taskOrder_priorities;
            vm.orderStates = enumService.taskOrder_states;

            //数据模型 viewModel
            vm.taskOrder = {
                id: null,
                deviceName: "",
                description: "",
                location: "",
                state: 1,
                priority: 1,
                requesterId: 2
            };

            vm.getOrderFromService = function (orderId) {
                taskOrderService.getTaskForEdit({ id: orderId })
                    .success(function (result) {
                        vm.taskOrder = result;
                        vm.taskOrder.state = result.state > 0 ? result.state : 1;
                    }
               ).error(function (err) { $log(err); });
            };

            vm.init = function () {
                if ($stateParams.orderId > 0) {
                    vm.title = '编辑工单';
                    vm.getOrderFromService($stateParams.orderId);
                };
            };

            vm.init();

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
                    vm.taskOrder.deviceName = result;
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


            // =========================================================================
            // vm.save() && vm.cancel()
            // =========================================================================

            vm.save = function () {//TODO: 新增产品
                vm.saving = true;
                taskOrderService.createOrUpdateTask({
                    taskOrder: vm.taskOrder
                }).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                }).finally(function () {
                    vm.saving = false;
                    vm.taskOrder = {
                        id: null,
                        deviceName: "",
                        description: "",
                        location: "",
                        priority: 1
                    };
                });
            };

            vm.cancel = function () {
                vm.taskOrder = {
                    id: null,
                    deviceName: "",
                    description: "",
                    location: "",
                    priority: 1
                };
            };
        }
    ]);
})();