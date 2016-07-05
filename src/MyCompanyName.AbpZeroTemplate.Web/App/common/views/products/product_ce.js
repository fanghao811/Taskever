(function () {
    appModule.controller('common.views.products.createOrEdit', [
        '$scope','$uibModal', 'abp.services.app.product', '$log',
      function ($scope, $uibModal,productService,$log) {
          var vm = this;
          vm.saving = false;
          vm.loading = false;
          //4 - 23
          vm.open = true;

          //viewModal
          vm.location = '';
          vm.department = '';
          vm.category = '';
       
          vm.product = {
              id: null,
              locationOuId: null,
              departmentOuId: null,
              categoryOuId: null,
              name: '惠普激光打印机',
              productNumber: '330724',
              modelNumber: 'HP-1606',
              description: '打印报表',
              price:120,
              usingFlag: true,
              startDate: '2016-6-16',
              discontinuedDate: '2016-6-16'
          };


          // =========================================================================
          // Datepicker set 
          // =========================================================================
          $scope.today = function () {
              $scope.dt = new Date();
          };
          $scope.today();

          $scope.open = function ($event, opened) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope[opened] = true;
          };

          $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
          };

          // =========================================================================
          // openLocationTreeModal 打开选择位置树Modal
          // =========================================================================

          vm.openTreeModal = function (rootId) {//树根Id, vm.product.locationOuId, vm.location
              var modalInstance = $uibModal.open({
                  templateUrl: '~/App/common/views/organizationUnits/oUTreeModal.cshtml',
                  controller: 'common.views.organizationUnits.oUTreeModal as vm',
                  backdrop: 'static',
                  resolve: { id: rootId}
                  //size:'lg'
              });

              modalInstance.result.then(function (result) {
                  switch(rootId)
                  {
                      case 1:
                          vm.product.locationOuId = result.id;
                          vm.location = result.displayName;
                          break;
                      case 2:
                          vm.product.departmentOuId = result.id;
                          vm.department = result.displayName;
                          break;
                      case 3:
                          vm.product.categoryOuId = result.id;
                          vm.category = result.displayName;
                          break;
                      default:

                          break;
                  }
              });
          };

          // =========================================================================
          // vm.save() && vm.cancel()
          // =========================================================================

          vm.save = function () {//TODO: 新增产品
              vm.saving = true;
              productService.createOrUpdateProduct(
                  vm.product
              ).success(function () {
                  abp.notify.info(app.localize('SavedSuccessfully'));

              }).finally(function () {
                  vm.saving = false;
              });
          };

          vm.cancel = function () {
              vm.product = {};
          };



          //function init() {
          //    if (!productId) {
          //        vm.loading = true;
          //        productService.getProductForEdit({
          //            id: productId
          //        }).success(function (result) {
          //            vm.product = result.product;
          //            vm.loading = false;
          //        });
          //    };
          //};

          //init();

          // =========================================================================
          // angular-bootstrap-switch  github:https://github.com/frapontillo/angular-bootstrap-switch 
          // =========================================================================

      }
    ]);
})();