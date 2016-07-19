(function () {
    var controllerId = 'common.views.tasks.index';
    appModule.controller(controllerId, [
        '$scope', '$uibModal', '$state', 'abp.services.app.taskOrder', '$filter',
        function ($scope, $uibModal, $state, taskOrderService, $filter) {

            var vm = this;
            vm.loading = false;
            vm.taskOrders = [];

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.myFilter = function (item) {
                return item.state in [1,2];
                 };

            vm.setStyle = function (args) {//根据重要程度设置颜色
                var x = '';
                switch (args) {
                    case 1:
                        x = "badge-success";
                        break;
                    case 2:
                        x = "badge-primary";
                        break;
                    case 3:
                        x = "badge-danger";
                        break;
                    default:
                        x = "badge-primary";
                };
                return x;
            };

            // =========================================================================
            // openAssignPersonModal 打开设备选择弹窗
            // =========================================================================

            vm.openAssignUserModal = function () {
             
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/tasks/assignedUserModal.cshtml',
                    controller: 'common.views.tasks.assignedUserModal as vm',
                    //resolve: { id: rootId },
                    backdrop: 'static',
                    size: 'lg'
                });

                modalInstance.result.then(function (result) {
                    
                });
            };

            vm.toEdit = function (id) {
                $state.go('taskCE', { orderId:id});
            };

            //获取工单列表
            init = function () {
                vm.loading = true;
                taskOrderService.getTasks().success(function (result) {
                    vm.taskOrders = result.items;
                }).finally(vm.loading = false);
            };

            init();

        }
    ]);
})();