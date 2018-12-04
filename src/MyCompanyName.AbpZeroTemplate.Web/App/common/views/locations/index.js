(function () {
    appModule.controller('common.views.location.index', [
        '$scope', '$uibModal', '$q', 'uiGridConstants',
        '$state',
        'abp.services.app.organizationUnit',
        'abp.services.app.commonLookup',
        'lookupModal',
        'abp.services.app.product',
        function ($scope, $uibModal, $q, uiGridConstants,
            $state,
            organizationUnitService,
            commonLookupService,
            lookupModal,
            productService) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            var requestParams = {
                organizationId: 0,
                filter: '',
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: 'id'
            };

            vm.permissions = {
                manageOrganizationTree: abp.auth.hasPermission('Pages.Administration.OrganizationUnits.ManageOrganizationTree'),
                manageMembers: abp.auth.hasPermission('Pages.Administration.OrganizationUnits.ManageMembers')
            };
            vm.productList = {};

            vm.organizationTree = {

                $tree: null,

                unitCount: 0,

                setUnitCount: function (unitCount) {
                    $scope.safeApply(function () {
                        vm.organizationTree.unitCount = unitCount;
                    });
                },

                refreshUnitCount: function () {
                    vm.organizationTree.setUnitCount(vm.organizationTree.$tree.jstree('get_json').length);
                },

                selectedOu: {
                    id: null,
                    displayName: null,
                    code: null,

                    set: function (ouInTree) {
                        if (!ouInTree) {
                            vm.organizationTree.selectedOu.id = null;
                            vm.organizationTree.selectedOu.displayName = null;
                            vm.organizationTree.selectedOu.code = null;
                        } else {
                            vm.organizationTree.selectedOu.id = ouInTree.id;
                            vm.organizationTree.selectedOu.displayName = ouInTree.original.displayName;
                            vm.organizationTree.selectedOu.code = ouInTree.original.code;
                        }
                        //DONE02：
                        vm.getProduct(vm.organizationTree.selectedOu.id);
                        //vm.members.load();
                    }
                },

                contextMenu: function (node) {

                    var items = {
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

                        addSubUnit: {
                            label: /*app.localize('AddSubUnit'),*/'增加分类',
                            _disabled: !vm.permissions.manageOrganizationTree,
                            action: function () {
                                vm.organizationTree.addUnit(node.id);
                            }
                        },

                        //addMember: {
                        //    label: app.localize('AddMember'),
                        //    _disabled: !vm.permissions.manageMembers,
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
                        instance.create_node(//TreeNode 叶子节点格式
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
                    return '<span title="' + ou.code + '" class="ou-text' + itemClass + '" data-ou-id="' + ou.id + '">' + ou.displayName + ' (<span class="ou-text-member-count">' + ou.memberCount + '</span>) <i class="fa fa-caret-down text-muted"></i></span>';
                },

                incrementMemberCount: function (ouId, incrementAmount) {
                    var treeNode = vm.organizationTree.$tree.jstree('get_node', ouId);
                    treeNode.original.memberCount = treeNode.original.memberCount + incrementAmount;
                    vm.organizationTree.$tree.jstree('rename_node', treeNode, vm.organizationTree.generateTextOnTree(treeNode.original));
                },

                getTreeDataFromServer: function (callback) {
                    organizationUnitService.getOUsIncludingChildren(1).success(function (result) {
                        var treeData = _.map(result.items, function (item) {
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
                                        vm.organizationTree.selectedOu.set(selectedNode);
                                    }
                                });

                            })
                            .on('move_node.jstree', function (e, data) {

                                if (!vm.permissions.manageOrganizationTree) {
                                    vm.organizationTree.$tree.jstree('refresh'); //rollback
                                    return;
                                }

                                var parentNodeName = (!data.parent || data.parent == '#')
                                    ? app.localize('Root')
                                    : vm.organizationTree.$tree.jstree('get_node', data.parent).original.displayName;

                                abp.message.confirm(
                                    app.localize('OrganizationUnitMoveConfirmMessage', data.node.original.displayName, parentNodeName),
                                    function (isConfirmed) {
                                        if (isConfirmed) {
                                            organizationUnitService.moveOrganizationUnit({
                                                id: data.node.id,
                                                newParentId: data.parent
                                            }).success(function () {
                                                abp.notify.success(app.localize('SuccessfullyMoved'));
                                                vm.organizationTree.reload();
                                            }).catch(function (err) {
                                                vm.organizationTree.$tree.jstree('refresh'); //rollback
                                                setTimeout(function () { abp.message.error(err.data.message); }, 500);
                                            });
                                        } else {
                                            vm.organizationTree.$tree.jstree('refresh'); //rollback
                                        }
                                    }
                                );
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
                            //TODO:01 geProductInOu()  选择节点后，刷新物料列表
                            //setTimeout(function () {
                            //    vm.getProduct(ouId);
                            //}, 100);
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

            //5.物料列表
            vm.productGridOptions = {
                enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                paginationPageSizes: app.consts.grid.defaultPageSizes,
                paginationPageSize: app.consts.grid.defaultPageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                appScopeProvider: vm,
                columnDefs: [
                    {
                        name: 'Product',
                        enableSorting: false,
                        width: 50,
                        headerCellTemplate: '<span></span>',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents text-center\">' +
                            '  <button class="btn btn-default btn-xs" ng-click="grid.appScope.showDetails(row.entity)"><i class="fa fa-search"></i></button>' +
                            '</div>'
                    },
                    {
                        field: 'id',
                        displayName: 'Id',
                        enableSorting: false,
                        width: 60
                    },
                    {
                        field: 'productNumber',
                        displayName: '物料编号'
                    },
                    {
                        field: 'name',
                        displayName: '物料名称'
                    },
                    {
                        field: 'category',
                        displayName: '物料类型'
                    },
                    {
                        field: 'abbreviation',
                        displayName: '简称',
                        width: 120
                    },
                    {
                        field: 'mnemonicCode',
                        displayName: '助记码',
                        width: 120
                    },
                    {
                        field: 'modelNumber',
                        displayName: '型号',
                        width: 120
                    },
                    {
                        field: 'specification',
                        displayName: '规格'
                    },
                    {
                        field: 'unit',
                        displayName: '单元',
                        width: 60
                    },
                    {
                        field: 'description',
                        displayName: '描述'
                    },
                    {
                        name: 'ProductDelete',
                        enableSorting: false,
                        width: 50,
                        headerCellTemplate: '<span></span>',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents text-center\">' +
                            '  <button class="btn btn-default btn-xs" ng-click="grid.appScope.deleteProduct(row.entity)"><i class="fa fa-trash"></i></button>' +
                            '</div>'
                        //TODO05:grid.appScope.deleteProduct(row.entity)
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        if (!sortColumns.length || !sortColumns[0].field) {
                            requestParams.sorting = null;
                        } else {
                            requestParams.sorting = sortColumns[0].field + ' ' + sortColumns[0].sort.direction;
                        }
                        //TODO03:增加物料表格
                        vm.getProduct(vm.organizationTree.selectedOu.id);
                    });
                    //分页查询
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getProduct(vm.organizationTree.selectedOu.id);
                    });
                },
                data: []
            };

            //6.1 Get ProductInOu
            vm.getProduct = function (ouId) {
                vm.loading = true;
                productService.getProductsInOu(ouId)
                    .success(function (result) {
                        vm.productGridOptions.data = result.items;
                        vm.productGridOptions.totalItems = result.totalCount;
                        vm.products = result.items;
                    }).finally(function () {
                        vm.loading = false;
                    });
            };

            //6.2 Get ProductPaged
            vm.getProductFOP = function () {
                vm.loading = true;
                productService.getProductsFOP({
                    skipCount: requestParams.skipCount,
                    maxResultCount: requestParams.maxResultCount,
                    sorting: requestParams.sorting,
                    filter: requestParams.filter
                }).success(function (result) {
                    vm.productGridOptions.data = result.items;
                    vm.productGridOptions.totalItems = result.totalCount;
                    //vm.products = result.items;
                }).finally(function () {
                    vm.loading = false;
                });
            };

            //6.4 Delete product
            vm.deleteProduct = function (product) { //TODO: Delete
                abp.message.confirm(
                    app.localize('AreYouSureToDeleteproduct', product.name),
                    function (isConfirmed) {
                        if (isConfirmed) {
                            if (!product.id) {
                                abp.notify.error('您尚未选择物料，删除失败！');
                                return;
                            }
                            productService.deleteProduct({ id: product.id })
                                .success(function () {
                                    vm.getProduct(vm.organizationTree.selectedOu.id);
                                    abp.notify.info('物料:' + product.name + '已删除！');
                                });
                        }
                    });
            };

            //6.5 showDetails
            vm.showDetails = function (product) {
                $state.go('productEdited', { productId: product.id });
            };

            vm.organizationTree.init();
        }
    ]);
})();