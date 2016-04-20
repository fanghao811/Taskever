using System.Data.Common;
using System.Data.Entity;
using Abp.Zero.EntityFramework;
using Taskever.Authorization.Roles;
using Taskever.Authorization.Users;
using Taskever.MultiTenancy;
using Taskever.Storage;

namespace Taskever.EntityFramework
{
    public class TaskeverDbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        /* Define an IDbSet for each entity of the application */

        public virtual IDbSet<BinaryObject> BinaryObjects { get; set; }

        /* Setting "Default" to base class helps us when working migration commands on Package Manager Console.
         * But it may cause problems when working Migrate.exe of EF. ABP works either way.         * 
         */
        public TaskeverDbContext()
            : base("Default")
        {

        }

        /* This constructor is used by ABP to pass connection string defined in TaskeverDataModule.PreInitialize.
         * Notice that, actually you will not directly create an instance of TaskeverDbContext since ABP automatically handles it.
         */
        public TaskeverDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        /* This constructor is used in tests to pass a fake/mock connection.
         */
        public TaskeverDbContext(DbConnection dbConnection)
            : base(dbConnection, true)
        {

        }
    }
}
