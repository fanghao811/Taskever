(function () {
    var controllerId = 'common.views.tasks.index';
    appModule.controller(controllerId, [
        '$scope', '$uibModal', function ($scope, $uibModal) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.createTask = function () {
                openCreateOrEditTaskModal();
            };

            //1.Open CreateOrEdit Modal
            function openCreateOrEditTaskModal() {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/tasks/task_ce.cshtml',
                    controller: 'common.views.task.task_ce as vm',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (result) {
                    abp.notify.success('新增任务成功！');
                });
            }
        }
    ]);
})();