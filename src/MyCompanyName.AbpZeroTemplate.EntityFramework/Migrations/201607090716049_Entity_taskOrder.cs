namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Entity_taskOrder : DbMigration
    {
        public override void Up()
        {
            AlterColumn("Tasks.TaskOrder", "Location", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            AlterColumn("Tasks.TaskOrder", "Location", c => c.String(maxLength: 50));
        }
    }
}
