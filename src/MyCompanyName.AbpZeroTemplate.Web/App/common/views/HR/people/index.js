(function () {
    var controllerId = 'common.views.HR.people.index';
    appModule.controller(controllerId, [
        '$scope','$state', '$stateParams', '$uibModal', 'uiGridConstants', 'abp.services.app.person',
        function ($scope,$state, $stateParams, $uibModal, uiGridConstants, personService) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            //1.设置辅助参数 loading,加载Busy
            vm.loading = false;
            vm.filterText = $stateParams.filterText || '';
            vm.people = {};
            //2.设置权限集合
            //vm.permissions = {
            //    create: abp.auth.hasPermission('Pages.Administration.Languages.Create'),
            //    edit: abp.auth.hasPermission('Pages.Administration.Languages.Edit'),
            //    changeTexts: abp.auth.hasPermission('Pages.Administration.Languages.ChangeTexts'),
            //    'delete': abp.auth.hasPermission('Pages.Administration.Languages.Delete')
            //};

            //3.查询参数 requestParams
            var requestParams = {
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: 'id'
            };

            //4.设置gridOptions 
            vm.personGridOptions = {
                enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                paginationPageSizes: app.consts.grid.defaultPageSizes,
                paginationPageSize: app.consts.grid.defaultPageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                appScopeProvider: vm,
                columnDefs: [
                      {
                          name: 'Profile',
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
                          field: 'name',
                          displayName: '姓名',
                          width: 120
                      },
                      {
                          field: 'gender',
                          displayName: '性别',
                          width: 90,
                          cellFilter: 'mapGender'

                      },
                      {
                          field: 'birthDate',
                          displayName: '出生日期',
                          minWidth: 150,
                          cellFilter: 'momentFormat: \'L\''
                      },
                      {
                          field: 'nationalIDNumber',
                          displayName: '身份证号码'
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

                        vm.getPeople();
                    });
                    //分页查询
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getPeople();
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
            //    vm.personGridOptions.columnDefs.splice(vm.gridOptions.columnDefs.length - 2, 1);
            //}

            //6.1 Get people
            vm.getPeople = function () {
                vm.loading = true;
                personService.getPeople({
                    skipCount: requestParams.skipCount,
                    maxResultCount: requestParams.maxResultCount,
                    sorting: requestParams.sorting,
                    filter: vm.filterText
                }).success(function (result) {
                    vm.personGridOptions.data = result.items;
                    vm.personGridOptions.totalItems = result.totalCount;
                    vm.people = result.items;
                }).finally(function () {
                    vm.loading = false;
                });
            };

            //6.2 Create person
            vm.createPerson = function () {
                openCreateOrEditPersonModal(null);
            };
            //6.3 Edit person
            vm.editPerson = function (person) {
                openCreateOrEditPersonModal(person.id); //TODO: CAN EDIT?
            };
            //6.4 Delete person
            vm.deletePerson = function (person) {
                if (!person.id) {
                    abp.notify.error('所选人员无效，删除失败！');
                    return;
                }
                personService.deletePerson({ PersonId: person.id })
                    .success(function () {
                        vm.getPeople();
                        abp.notify.info('人员:' + person.name + '已删除！');
                    })
            };

            //6.5 Open CreateOrEdit Modal
            function openCreateOrEditPersonModal(id) {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/HR/people/createOrEditModal.cshtml',
                    controller: 'common.views.HR.people.createOrEditModal as vm',
                    backdrop: 'static',
                    resolve: {
                        personId: function () {
                            return id;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    vm.getPeople();
                });
            }

            vm.showDetails = function (person) {
                $state.go('profile.info', { personId: person.id,subTitle:'about' });
            };

            //Init
            vm.getPeople();

        }
    ]);
})();