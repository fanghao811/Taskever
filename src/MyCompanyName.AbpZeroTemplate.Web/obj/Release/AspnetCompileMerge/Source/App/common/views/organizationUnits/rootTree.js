(function () {
    appModule.controller('common.views.organizationUnits.rootTree', [
        '$scope', '$uibModal', '$q', 'uiGridConstants', 'abp.services.app.organizationUnit', 'abp.services.app.commonLookup', 'lookupModal',
        function ($scope, $uibModal, $q, uiGridConstants, organizationUnitService, commonLookupService, lookupModal) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.permissions = {
                manageOrganizationTree: abp.auth.hasPermission('Pages.Administration.OrganizationUnits.ManageOrganizationTree'),
                manageMembers: abp.auth.hasPermission('Pages.Administration.OrganizationUnits.ManageMembers')
            };

            vm.organizationTree = {

                $tree: null,

                unitCount: 0,

                setUnitCount: function (unitCount) {
                    $scope.safeApply(function () {
                        vm.organizationTree.unitCount = unitCount;
                    });
                },

                refreshUnitCount: function () {//刷新叶节点Count
                    vm.organizationTree.setUnitCount(vm.organizationTree.$tree.jstree('get_json').length);
                },

                //选中节点
                selectedOu: {
                    id: null,
                    displayName: null,
                    code: null,

                    set: function (ouInTree) {
                        if (!ouInTree) {//如果选中节点为null
                            vm.organizationTree.selectedOu.id = null;
                            vm.organizationTree.selectedOu.displayName = null;
                            vm.organizationTree.selectedOu.code = null;
                        } else {//不为Null则赋值
                            vm.organizationTree.selectedOu.id = ouInTree.id;
                            vm.organizationTree.selectedOu.displayName = ouInTree.original.displayName;
                            vm.organizationTree.selectedOu.code = ouInTree.original.code;
                        }

                        //vm.members.load();//加载相关用户成员
                    }
                },

                //右键菜单
                contextMenu: function (node) {

                    var items = {
                        //修改
                        editUnit: {
                            label: app.localize('Edit'),
                            _disabled: !vm.permissions.manageOrganizationTree,
                            action: function (data) {
                                var instance = $.jstree.reference(data.reference);

                                vm.organizationTree.openCreateOrEditUnitModal({
                                    id: node.id,
                                    displayName: node.original.displayName
                                }, function (updatedOu) {
                                    node.original.displayName = updatedOu.displayName;
                                    instance.rename_node(node, vm.organizationTree.generateTextOnTree(updatedOu));
                                });
                            }
                        },

                        //addSubUnit: {
                        //    label: app.localize('AddSubUnit'),
                        //    //_disabled: !vm.permissions.manageOrganizationTree,//增加子节点，此处设置为false
                        //    _disabled:false,
                        //    action: function () {
                        //        vm.organizationTree.addUnit(node.id);
                        //    }
                        //},

                        //addMember: {
                        //    label: app.localize('AddMember'),
                        //    //_disabled: !vm.permissions.manageMembers,
                        //    _disabled:false,
                        //    action: function () {
                        //        vm.members.openAddModal();
                        //    }
                        //},

                        'delete': {
                            label: app.localize("Delete"),
                            _disabled: !vm.permissions.manageOrganizationTree,
                            action: function (data) {
                                var instance = $.jstree.reference(data.reference);

                                abp.message.confirm(
                                    app.localize('OrganizationUnitDeleteWarningMessage', node.original.displayName),
                                    function (isConfirmed) {
                                        if (isConfirmed) {
                                            organizationUnitService.deleteOrganizationUnit({
                                                id: node.id
                                            }).success(function () {
                                                abp.notify.success(app.localize('SuccessfullyDeleted'));
                                                instance.delete_node(node);
                                                vm.organizationTree.refreshUnitCount();
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    }

                    return items;
                },

                addUnit: function (parentId) {
                    var instance = $.jstree.reference(vm.organizationTree.$tree);
                    vm.organizationTree.openCreateOrEditUnitModal({
                        parentId: parentId
                    }, function (newOu) {
                        instance.create_node(
                            parentId ? instance.get_node(parentId) : '#',
                            {
                                id: newOu.id,
                                parent: newOu.parentId ? newOu.parentId : '#',
                                code: newOu.code,
                                displayName: newOu.displayName,
                                memberCount: 0,
                                text: vm.organizationTree.generateTextOnTree(newOu),
                                state: {
                                    opened: true
                                }
                            });

                        vm.organizationTree.refreshUnitCount();
                    });
                },

                openCreateOrEditUnitModal: function (organizationUnit, closeCallback) {
                    var modalInstance = $uibModal.open({
                        templateUrl: '~/App/common/views/organizationUnits/createOrEditUnitModal.cshtml',
                        controller: 'common.views.organizationUnits.createOrEditUnitModal as vm',
                        backdrop: 'static',
                        resolve: {
                            organizationUnit: function () {
                                return organizationUnit;
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        closeCallback && closeCallback(result);
                    });
                },

                generateTextOnTree: function (ou) {
                    var itemClass = ou.memberCount > 0 ? ' ou-text-has-members' : ' ou-text-no-members';
                    return '<span title="' + ou.code + '" class="ou-text' + itemClass + '" data-ou-id="' + ou.id + '">'
                        + ou.displayName + ' (<span class="ou-text-member-count">' + ou.memberCount +
                        '</span>) <i class="fa fa-caret-down text-muted"></i></span>';
                },

                incrementMemberCount: function (ouId, incrementAmount) {
                    var treeNode = vm.organizationTree.$tree.jstree('get_node', ouId);
                    treeNode.original.memberCount = treeNode.original.memberCount + incrementAmount;
                    vm.organizationTree.$tree.jstree('rename_node', treeNode, vm.organizationTree.generateTextOnTree(treeNode.original));
                },

                getTreeDataFromServer: function (callback) {//从服务端获取树形Data
                    //organizationUnitService.getOrganizationUnits({}).success(function (result) {
                    organizationUnitService.getRootTree({}).success(function (result) {
                        var treeData = _.map(result.items, function (item) {//加工Item
                            return {
                                id: item.id,
                                parent: item.parentId ? item.parentId : '#',
                                code: item.code,
                                displayName: item.displayName,
                                memberCount: item.memberCount,
                                text: vm.organizationTree.generateTextOnTree(item),
                                state: {
                                    opened: true
                                }
                            };
                        });

                        callback(treeData);
                    });
                },

                init: function () {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);

                        vm.organizationTree.$tree = $('#OrganizationUnitEditTree');

                        var jsTreePlugins = [
                            'types',
                            'contextmenu',
                            'wholerow',
                            'sort'
                        ];

                        if (vm.permissions.manageOrganizationTree) {
                            jsTreePlugins.push('dnd');
                        }

                        vm.organizationTree.$tree
                            .on('changed.jstree', function (e, data) {
                                $scope.safeApply(function () {
                                    if (data.selected.length != 1) {
                                        vm.organizationTree.selectedOu.set(null);
                                    } else {
                                        var selectedNode = data.instance.get_node(data.selected[0]);
                                        vm.organizationTree.selectedOu.set(selectedNode);//此处触发 vm.members.load();
                                    }
                                });

                            })
                            //拖动 Move
                            //.on('move_node.jstree', function (e, data) {

                            //    if (!vm.permissions.manageOrganizationTree) {
                            //        vm.organizationTree.$tree.jstree('refresh'); //rollback
                            //        return;
                            //    }

                            //    var parentNodeName = (!data.parent || data.parent == '#')
                            //        ? app.localize('Root')
                            //        : vm.organizationTree.$tree.jstree('get_node', data.parent).original.displayName;

                            //    abp.message.confirm(
                            //        app.localize('OrganizationUnitMoveConfirmMessage', data.node.original.displayName, parentNodeName),
                            //        function (isConfirmed) {
                            //            if (isConfirmed) {
                            //                organizationUnitService.moveOrganizationUnit({
                            //                    id: data.node.id,
                            //                    newParentId: data.parent
                            //                }).success(function () {
                            //                    abp.notify.success(app.localize('SuccessfullyMoved'));
                            //                    vm.organizationTree.reload();
                            //                }).catch(function (err) {
                            //                    vm.organizationTree.$tree.jstree('refresh'); //rollback
                            //                    setTimeout(function () { abp.message.error(err.data.message); }, 500);
                            //                });
                            //            } else {
                            //                vm.organizationTree.$tree.jstree('refresh'); //rollback
                            //            }
                            //        }
                            //    );
                            //})
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
                                contextmenu: {
                                    items: vm.organizationTree.contextMenu
                                },
                                sort: function (node1, node2) {
                                    if (this.get_node(node2).original.displayName < this.get_node(node1).original.displayName) {
                                        return 1;
                                    }

                                    return -1;
                                },
                                plugins: jsTreePlugins
                            });

                        vm.organizationTree.$tree.on('click', '.ou-text .fa-caret-down', function (e) {
                            e.preventDefault();

                            var ouId = $(this).closest('.ou-text').attr('data-ou-id');
                            setTimeout(function () {
                                vm.organizationTree.$tree.jstree('show_contextmenu', ouId);
                            }, 100);
                        });
                    });
                },

                reload: function () {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);
                        vm.organizationTree.$tree.jstree(true).settings.core.data = treeData;
                        vm.organizationTree.$tree.jstree('refresh');
                    });
                }
            };
            vm.organizationTree.init();
        }
    ]);
})();