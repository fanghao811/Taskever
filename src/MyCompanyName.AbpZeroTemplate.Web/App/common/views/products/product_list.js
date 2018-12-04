(function () {
    var controllerId = 'common.views.products.list';
    appModule.controller(controllerId, [
        '$scope', '$state', '$stateParams', '$uibModal', 'uiGridConstants', 'abp.services.app.product',
        function ($scope, $state, $stateParams, $uibModal, uiGridConstants, productService) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            //1.设置辅助参数 loading,加载Busy
            vm.loading = false;
            //vm.filterText = $stateParams.filterText || '';
            //vm.products = {};
            //2.设置权限集合
            //vm.permissions = {
            //    create: abp.auth.hasPermission('Pages.Administration.Languages.Create'),
            //    edit: abp.auth.hasPermission('Pages.Administration.Languages.Edit'),
            //    changeTexts: abp.auth.hasPermission('Pages.Administration.Languages.ChangeTexts'),
            //    'delete': abp.auth.hasPermission('Pages.Administration.Languages.Delete')
            //};

            //3.查询参数 requestParams
            var requestParams = {
                filter: '',
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: 'id'
            };

            //4.设置gridOptions 
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

                        vm.getProduct();
                    });
                    //分页查询
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getProduct();
                    });
                },
                data: []
            };

            //5.判断权限集合
            //if (!vm.permissions.edit &&
            //    !vm.permissions.changeTexts &&
            //    !vm.permissions.delete) {
            //    vm.gridOptions.columnDefs.shift();
            //}

            //5.No need to 'Default' field is this is a host user.
            //if (!vm.currentTenantId) {
            //    vm.productGridOptions.columnDefs.splice(vm.gridOptions.columnDefs.length - 2, 1);
            //}

            //6.1 Get Product
            vm.getProduct = function () {
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

            //6.2 Create product
            vm.createProduct = function () {
                openCreateOrEditproductModal(null);
            };
            //6.3 Edit product
            vm.editProduct = function (product) {
                openCreateOrEditproductModal(product.id); //TODO: CAN EDIT?
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
                            productService.deleteProduct({ productId: product.id })
                                .success(function () {
                                    vm.getProduct();
                                    abp.notify.info('物料:' + product.name + '已删除！');
                                });
                        }
                    });
            };

            //6.5 Open CreateOrEdit Modal
            function openCreateOrEditproductModal(id) {
                abp.notify.info('TODO:弹窗 物料增改 尚在制作中...');
            }

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
                                    vm.getProduct();
                                    abp.notify.info('物料:' + product.name + '已删除！');
                                });
                        }
                    });
            };

            vm.showDetails = function (product) {
                //$state.go('profile.info', { productId: product.id, subTitle: 'about' });
                $state.go('productEdited',{ productId: product.id });
            };

            //Init
            vm.getProduct();

        }
    ]);
})();