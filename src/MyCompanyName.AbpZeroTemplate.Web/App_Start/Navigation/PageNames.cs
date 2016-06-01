namespace Taskever.Web.Navigation
{
    public static class PageNames
    {
        public static class App
        {
            public static class Common
            {
                //ϵͳ����
                public const string Administration = "Administration";
                public const string Roles = "Administration.Roles";
                public const string Users = "Administration.Users";
                public const string AuditLogs = "Administration.AuditLogs";
                public const string OrganizationUnits = "Administration.OrganizationUnits";
                public const string Languages = "Administration.Languages";
                public const string ChatHub = "Administration.ChatHub";
                //��������
                public const string Task = "Task";
                public const string Task_List = "Task.List";
                //�豸����
                public const string Product = "Product";
                public const string Product_list = "Product.List";
                //���¹���
                public const string HumanResources = "HumanResources";
                public const string People = "HumanResources.People";
                public const string Profile = "HumanResources.Profile";
            }

            public static class Host
            {
                public const string Tenants = "Tenants";
                public const string Editions = "Editions";
                public const string Maintenance = "Administration.Maintenance";
                public const string Settings = "Administration.Settings.Host";
            }

            public static class Tenant
            {
                public const string Dashboard = "Dashboard.Tenant";
                public const string Settings = "Administration.Settings.Tenant";
            }
        }

        public static class Frontend
        {
            public const string Home = "Frontend.Home";
            public const string About = "Frontend.About";
        }
    }
}