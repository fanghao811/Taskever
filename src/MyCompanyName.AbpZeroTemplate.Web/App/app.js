/* 'app' MODULE DEFINITION */
var appModule = angular.module("app", [
    "ui.router",
    "ui.bootstrap",
    'ui.utils',
    "ui.jq",
    'ui.grid',
    'ui.grid.pagination',
    "oc.lazyLoad",
    "ngSanitize",
    'angularFileUpload',
    'daterangepicker',
    'angularMoment',
    'frapontillo.bootstrap-switch',
    'abp'
]);

/* LAZY LOAD CONFIG */

/* This application does not define any lazy-load yet but you can use $ocLazyLoad to define and lazy-load js/css files.
 * This code configures $ocLazyLoad plug-in for this application.
 * See it's documents for more information: https://github.com/ocombe/ocLazyLoad
 */
appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before', // load the css files before a LINK element with this ID.
        debug: false,
        events: true,
        modules: []
    });
}]);

/* THEME SETTINGS */
App.setAssetsPath(abp.appPath + 'metronic/assets/');
appModule.factory('settings', ['$rootScope', function ($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: true, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: App.getAssetsPath() + 'admin/layout4/img/',
        layoutCssPath: App.getAssetsPath() + 'admin/layout4/css/',
        assetsPath: abp.appPath + 'metronic/assets',
        globalPath: abp.appPath + 'metronic/assets/global',
        layoutPath: abp.appPath + 'metronic/assets/layouts/layout4'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* ROUTE DEFINITIONS */

appModule.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // Default route (overrided below if user has permission)
        //$urlRouterProvider.otherwise("/welcome");
        $urlRouterProvider.otherwise("/tenant/dashboard");//--设置起始页为Dashboard 160613


        //Welcome page
        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: '~/App/common/views/welcome/index.cshtml'
        });

        //COMMON routes

        if (abp.auth.hasPermission('Pages.Administration.Roles')) {
            $stateProvider.state('roles', {
                url: '/roles',
                templateUrl: '~/App/common/views/roles/index.cshtml',
                menu: 'Administration.Roles'
            });
        }

        if (abp.auth.hasPermission('Pages.Administration.Users')) {
            $stateProvider.state('users', {
                url: '/users?filterText',
                templateUrl: '~/App/common/views/users/index.cshtml',
                menu: 'Administration.Users'
            });
        }

        if (abp.auth.hasPermission('Pages.Administration.Languages')) {
            $stateProvider.state('languages', {
                url: '/languages',
                templateUrl: '~/App/common/views/languages/index.cshtml',
                menu: 'Administration.Languages'
            });

            if (abp.auth.hasPermission('Pages.Administration.Languages.ChangeTexts')) {
                $stateProvider.state('languageTexts', {
                    url: '/languages/texts/:languageName?sourceName&baseLanguageName&targetValueFilter&filterText',
                    templateUrl: '~/App/common/views/languages/texts.cshtml',
                    menu: 'Administration.Languages'
                });
            }
        }

        if (abp.auth.hasPermission('Pages.Administration.AuditLogs')) {
            $stateProvider.state('auditLogs', {
                url: '/auditLogs',
                templateUrl: '~/App/common/views/auditLogs/index.cshtml',
                menu: 'Administration.AuditLogs'
            });
        }

        if (abp.auth.hasPermission('Pages.Administration.OrganizationUnits')) {
            $stateProvider.state('organizationUnits', {
                url: '/organizationUnits',
                templateUrl: '~/App/common/views/organizationUnits/index.cshtml',
                menu: 'Administration.OrganizationUnits'
            });
        }

        //系统根节点
        $stateProvider.state('rootTree', {
            url: '/rootTree',
            templateUrl: '~/App/common/views/organizationUnits/rootTree.cshtml'
        });

        //通知消息
        $stateProvider.state('notifications', {
            url: '/notifications',
            templateUrl: '~/App/common/views/notifications/index.cshtml'
        });


        //chatHub
        $stateProvider.state('chatHub', {
            url: '/chatHub',
            templateUrl: '~/App/common/views/chatHub/index.cshtml',
            menu: 'Administration.ChatHub'
        });

        //HumanResources
        $stateProvider.state('people', {
            //'abstract': true,
            url: '/people',
            templateUrl: '~/App/common/views/HR/people/index.cshtml',
            menu: 'HumanResources.People'
        });

        $stateProvider
            .state('profile', {//员工管理父页
                url: '/profile/{personId:[0-9]}',
                templateUrl: '~/App/common/views/HR/people/profile.cshtml',
                controller: 'common.views.HR.people.profile',
                controllerAs: 'vm',
                menu: 'HumanResources.Profile',
                'abstract': true //5-24
            })
            .state("profile.info", {//员工管理子页
                url: "/info/:subTitle",
                templateUrl: function ($stateParams) {
                    return '~/App/common/views/HR/people/profile-' + $stateParams.subTitle + '.cshtml'
                },
                controllerProvider: function ($stateParams) {
                    var ctrlName = 'common.views.HR.people.profile-' + $stateParams.subTitle;
                    return ctrlName;
                },
                controllerAs: 'vm',
                menu: function ($stateParams) {
                    return 'HumanResources.Profile.' + $stateParams.subTitle;
                }
            });


        //Tasks 工单管理
        $stateProvider
            .state('task', {
                url: '/task',
                templateUrl: '~/App/common/views/tasks/index.cshtml',
                controller: 'common.views.tasks.index as vm',
                menu: 'Task'
            })
            .state('taskDetail', {
                url: '/taskDetail',
                templateUrl: '~/App/common/views/tasks/task_detail.cshtml',
                menu: 'Task.Detail'
            })
            .state('taskCE', {
                url: '/taskCE/:orderId',
                templateUrl: '~/App/common/views/tasks/task_ce.cshtml',
                controller: 'common.views.tasks.createOrEdit',
                controllerAs: 'vm', //IMPORTANT:省略此处出错！
                menu: 'Task.CE'
            });

        //地点树
        $stateProvider
        .state('location', {
            url: '/location',
            templateUrl: '~/App/common/views/locations/index.cshtml',
            menu: 'Location'
        });


        //Products
        $stateProvider
            .state('product', {
                'abstract': true,
                url: "/product",
                template: '<div ui-view class="fade-in-up"></div>'
            })
            .state('productDetail', {
                url: '/productDetail',
                templateUrl: '~/App/common/views/products/product_detail.cshtml',
                menu: 'Product.Detail'
            })
            .state('productEdited', {
                url: '/productEdited',
                templateUrl: '~/App/common/views/products/product_ce.cshtml',
                controller: 'common.views.products.createOrEdit',
                controllerAs: 'vm',
                menu: 'Product.Edited'
            });




        //HOST routes

        $stateProvider.state('host', {
            'abstract': true,
            url: '/host',
            template: '<div ui-view class="fade-in-up"></div>'
        });

        if (abp.auth.hasPermission('Pages.Tenants')) {
            $urlRouterProvider.otherwise("/host/tenants"); //Entrance page for the host
            $stateProvider.state('host.tenants', {
                url: '/tenants',
                templateUrl: '~/App/host/views/tenants/index.cshtml',
                menu: 'Tenants'
            });
        }

        if (abp.auth.hasPermission('Pages.Editions')) {
            $stateProvider.state('host.editions', {
                url: '/editions',
                templateUrl: '~/App/host/views/editions/index.cshtml',
                menu: 'Editions'
            });
        }

        if (abp.auth.hasPermission('Pages.Administration.Host.Settings')) {
            $stateProvider.state('host.settings', {
                url: '/settings',
                templateUrl: '~/App/host/views/settings/index.cshtml',
                menu: 'Administration.Settings.Host'
            });
        }

        //TENANT routes

        $stateProvider.state('tenant', {
            'abstract': true,
            url: '/tenant',
            template: '<div ui-view class="fade-in-up"></div>'
        });

        if (abp.auth.hasPermission('Pages.Tenant.Dashboard')) {
            $urlRouterProvider.otherwise("/tenant/dashboard"); //Entrance page for a tenant
            $stateProvider.state('tenant.dashboard', {
                url: '/dashboard',
                templateUrl: '~/App/tenant/views/dashboard/index.cshtml',
                menu: 'Dashboard.Tenant'
            });
        }

        if (abp.auth.hasPermission('Pages.Administration.Tenant.Settings')) {
            $stateProvider.state('tenant.settings', {
                url: '/settings',
                templateUrl: '~/App/tenant/views/settings/index.cshtml',
                menu: 'Administration.Settings.Tenant'
            });
        }
    }
]);

appModule.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state;
    $rootScope.$settings = settings;


    /* 切换状态后，更新面包屑导航 */
    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
          $rootScope.currentMenuName = toState.menu;
      });

    $rootScope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
}]);