using Abp.Application.Navigation;
using Abp.Localization;
using Taskever.Authorization;
using Taskever.Web.Navigation;

namespace Taskever.Web.App.Startup
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses ABP's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See .cshtml and .js files under App/Main/views/layout/header to know how to render menu.
    /// </summary>
    public class AppNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(new MenuItemDefinition(//租户管理
                    PageNames.App.Host.Tenants,
                    L("Tenants"),
                    url: "host.tenants",
                    icon: "icon-globe",
                    requiredPermissionName: AppPermissions.Pages_Tenants
                    )
                ).AddItem(new MenuItemDefinition(//版本编辑
                    PageNames.App.Host.Editions,
                    L("Editions"),
                    url: "host.editions",
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_Editions
                    )
                ).AddItem(new MenuItemDefinition(//工作台面板
                    PageNames.App.Tenant.Dashboard,
                    L("Dashboard"),
                    url: "tenant.dashboard",
                    icon: "icon-home",
                    requiredPermissionName: AppPermissions.Pages_Tenant_Dashboard
                    )
                ).AddItem(new MenuItemDefinition(//工单管理
                    PageNames.App.Common.Task,
                    L("MyTask"),
                    url: "task",
                    icon: "fa fa-home"
                    )
                ).AddItem(new MenuItemDefinition(//物料管理
                    PageNames.App.Common.Product,
                    L("MaterialManage"),
                    icon: "fa fa-home"
                    ).AddItem(new MenuItemDefinition(//物料新增
                        PageNames.App.Common.Product_list,
                        L("MaterialCreate"),
                        url: "productEdited",
                        icon: "fa fa-commenting"
                        )
                    ).AddItem(new MenuItemDefinition(//物料树
                        PageNames.App.Common.Location,
                        L("MaterialTree"),
                        url: "location",
                        icon: "fa fa-user"
                        )
                    ).AddItem(new MenuItemDefinition(//物料表格
                        PageNames.App.Common.Location,
                        L("MaterialTable"),
                        url: "auditLogs",
                        icon: "fa fa-user"
                        )
                    )
                ).AddItem(new MenuItemDefinition(//人事管理
                    PageNames.App.Common.HumanResources,
                    L("HumanResource"),
                    icon: "fa fa-home"
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.People,
                        L("People"),
                        url: "people",
                        icon: "fa fa-home"
                        )
                    )
                ).AddItem(new MenuItemDefinition(//SignalR测试
                    PageNames.App.Common.ChatHub,
                    L("chatHub"),
                    url: "chatHub",
                    icon: "fa fa-commenting"
                    )
                ).AddItem(new MenuItemDefinition(//系统管理
                    PageNames.App.Common.Administration,
                    L("Administration"),
                    icon: "icon-wrench"
                    ).AddItem(new MenuItemDefinition(//根节点管理
                        PageNames.App.Common.RootTree,
                        L("RootTree"),
                        url: "rootTree",
                        icon: "icon-layers"
                        )
                    ).AddItem(new MenuItemDefinition(//组织机构
                        PageNames.App.Common.OrganizationUnits,
                        L("OrganizationUnits"),
                        url: "organizationUnits",
                        icon: "icon-layers",
                        requiredPermissionName: AppPermissions.Pages_Administration_OrganizationUnits
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Roles,
                        L("Roles"),
                        url: "roles",
                        icon: "icon-briefcase",
                        requiredPermissionName: AppPermissions.Pages_Administration_Roles
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Users,
                        L("Users"),
                        url: "users",
                        icon: "icon-users",
                        requiredPermissionName: AppPermissions.Pages_Administration_Users
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Languages,
                        L("Languages"),
                        url: "languages",
                        icon: "icon-flag",
                        requiredPermissionName: AppPermissions.Pages_Administration_Languages
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.AuditLogs,
                        L("AuditLogs"),
                        url: "auditLogs",
                        icon: "icon-lock",
                        requiredPermissionName: AppPermissions.Pages_Administration_AuditLogs
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.Settings,
                        L("Settings"),
                        url: "host.settings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Host_Settings
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Tenant.Settings,
                        L("Settings"),
                        url: "tenant.settings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Tenant_Settings
                        )
                    )
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, TaskeverConsts.LocalizationSourceName);
        }
    }
}
