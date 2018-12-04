(function () {
    appModule.controller('common.views.organizationUnits.oUTreeModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.organizationUnit', 'id','$log',
        function ($scope, $uibModalInstance, organizationUnitService,id,$log) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });
            vm.locationToSearch = '';

            vm.locationTree = {

                $tree: null,

                unitCount: 0,

                setUnitCount: function (unitCount) {
                    $scope.safeApply(function () {
                        vm.locationTree.unitCount = unitCount;
                    });
                },

                refreshUnitCount: function () {
                    vm.locationTree.setUnitCount(vm.locationTree.$tree.jstree('get_json').length);
                },

                selectedOu: {//选择节点
                    id: null,
                    displayName: null,

                    set: function (ouInTree) {
                        if (!ouInTree) {
                            vm.locationTree.selectedOu.id = null;
                            vm.locationTree.selectedOu.displayName = null;
                        } else {
                            vm.locationTree.selectedOu.id = ouInTree.id;
                            vm.locationTree.selectedOu.displayName = ouInTree.original.displayName;
                        }

                        //vm.members.load();
                    }
                },

                searchNode: function (v) {
                    vm.locationTree.selectedOu.set();
                    vm.locationTree.$tree.jstree('search', v,false,true);
                },

                clearSearch: function () {
                    vm.locationToSearch = '';
                    vm.locationTree.selectedOu.set();
                    vm.locationTree.$tree.jstree('clear_search');
                },

                generateTextOnTree: function (ou) {
                    var itemClass = ou.memberCount > 0 ? ' ou-text-has-members' : ' ou-text-no-members';
                    return '<span title="' + ou.code + '" class="ou-text' + itemClass + '" data-ou-id="' + ou.id + '">'
                        + ou.displayName + ' (<span class="ou-text-member-count">' + ou.memberCount +
                        '</span>) <i class="fa fa-caret-down text-muted"></i></span>';
                },

                getTreeDataFromServer: function (id,callback) {//从服务端获取位置树： locationTree
                    organizationUnitService.getOUsIncludingChildren(id).success(function (result) {
                        var treeData = _.map(result.items, function (item) {
                            return {
                                id: item.id,
                                parent: item.parentId ? item.parentId : '#',
                                code: item.code,
                                displayName: item.displayName,
                                memberCount: item.memberCount,
                                text: vm.locationTree.generateTextOnTree(item),
                                state: {
                                    opened: true
                                }
                            };
                        });

                        callback(treeData);
                    });
                },

                init: function () {//初始化locatinTree
                    vm.locationTree.getTreeDataFromServer(id,function (treeData) {
                        vm.locationTree.setUnitCount(treeData.length);

                        vm.locationTree.$tree = $('#LocationTree');

                        var jsTreePlugins = [//jsTree插件加载
                            'types',
                            'wholerow',
                            'search',
                            'sort'
                        ];

                        vm.locationTree.$tree
                            .on('changed.jstree', function (e, data) {
                                $scope.safeApply(function () {
                                    if (data.selected.length != 1) {
                                        vm.locationTree.selectedOu.set(null);
                                    } else {
                                        var selectedNode = data.instance.get_node(data.selected[0]);
                                        vm.locationTree.selectedOu.set(selectedNode);
                                    }
                                });

                            })

                            .jstree({
                                'core': {
                                    data: treeData,
                                    multiple: false,
                                    check_callback: function (operation, node, node_parent, node_position, more) {
                                        return true;
                                    }
                                },
                                types: {
                                    "default": {
                                        "icon": "fa fa-folder tree-item-icon-color icon-lg"
                                    },
                                    "file": {
                                        "icon": "fa fa-file tree-item-icon-color icon-lg"
                                    }
                                },

                                sort: function (node1, node2) {
                                    if (this.get_node(node2).original.displayName < this.get_node(node1).original.displayName) {
                                        return 1;
                                    }

                                    return -1;
                                },
                                plugins: jsTreePlugins
                            });

                        vm.locationTree.$tree.on('click', '.ou-text .fa-caret-down', function (e) {
                            e.preventDefault();

                            var ouId = $(this).closest('.ou-text').attr('data-ou-id');
                            setTimeout(function () {
                                vm.locationTree.$tree.jstree('show_contextmenu', ouId);
                            }, 100);
                        });
                    });
                }
            };

            vm.confirm = function () {
                $uibModalInstance.close(vm.locationTree.selectedOu);
                $log.log(vm.locationTree.selectedOu);
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            vm.locationTree.init();
        }
    ]);
})();