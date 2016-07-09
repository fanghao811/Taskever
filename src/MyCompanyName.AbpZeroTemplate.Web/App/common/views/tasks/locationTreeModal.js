(function () {
    appModule.controller('common.views.tasks.locationTreeModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.organizationUnit', 'id',
        function ($scope, $uibModalInstance, organizationUnitService, id) {
            var vm = this,
            rootId = id,
            selectedOus = '';

            vm.treeData = [];
            vm.location = {
                section: null,
                floor: null,
                department: null,
                room: null
            };

            vm.sections = [];
            vm.floors = [];
            vm.departments = {};
            vm.rooms = {};

            vm.changedSection = function (x) {
                vm.location = {};
                vm.location.section = x;
                vm.floors = _.filter(vm.treeData, function (item) {
                    return item.parent == x.id;
                });
                vm.departments = {};
                vm.rooms = {};
            };

            vm.changedFloor = function (x) {
                vm.location.floor = x;
                vm.location.department = null;
                vm.location.room = null;
                vm.departments = _.filter(vm.treeData, function (item) {
                    return item.parent == x.id;
                });
                vm.rooms = {};
            };

            vm.changedDepartment = function (x) {
                vm.location.department = x;
                vm.location.room = null;
                vm.rooms = _.filter(vm.treeData, function (item) {
                    return item.parent == x.id;
                });
            };

            vm.changedRoom = function (x) {
                vm.location.room = x;
            };

            vm.locationTree = {
                getTreeDataFromServer: function (id, callback) {//从服务端获取位置树： locationTree
                    organizationUnitService.getOUsIncludingChildren(id).success(function (result) {
                        var treeData = _.map(result.items, function (item) {
                            return {
                                id: item.id,
                                parent: item.parentId ? item.parentId : '#',
                                code: item.code,
                                displayName: item.displayName
                            };
                        });
                        callback(treeData);
                    });
                },
                init: function () {//初始化locatinTree
                    vm.locationTree.getTreeDataFromServer(rootId, function (treeData) {
                        vm.treeData = treeData;

                        vm.sections = _.filter(treeData, function (item) {
                            return item.parent == 1;
                        });
                    });
                }
            };

            vm.save = function () {
                selectedOus = _.map(vm.location,
                    function (item) {
                        return item.displayName;
                    }).join(' - ');
                $uibModalInstance.close(selectedOus);
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            vm.locationTree.init();
        }
    ]);
})();