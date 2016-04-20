using System.Data.Entity.Migrations;
using Taskever.Migrations.Seed;

namespace Taskever.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<EntityFramework.TaskeverDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Taskever";
        }

        protected override void Seed(EntityFramework.TaskeverDbContext context)
        {
            new InitialDbBuilder(context).Create();
        }
    }
}
