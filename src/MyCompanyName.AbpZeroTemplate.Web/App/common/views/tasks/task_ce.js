(function () {
    var controllerId = 'common.views.tasks.createOrEdit';
    appModule.controller(controllerId, [
        '$scope', 'abp.services.app.taskOrder',
        function ($scope, taskOrderService) {

            var vm = this;

            //状态控制 Flags
            vm.saving = false;
            vm.loading = false;
            vm.type = true; // 精确 或 模糊 查询设备

            //数据模型 viewModel
            vm.taskOrder = { };

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

        }
    ]);
})();