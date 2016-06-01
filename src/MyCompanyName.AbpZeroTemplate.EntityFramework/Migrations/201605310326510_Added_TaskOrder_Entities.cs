namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Added_TaskOrder_Entities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "Tasks.TaskOrder",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        DeviceName = c.String(nullable: false, maxLength: 30),
                        Department = c.String(maxLength: 30),
                        Location = c.String(maxLength: 50),
                        Description = c.String(nullable: false, maxLength: 100),
                        RequesterId = c.Long(),
                        CrewLeaderId = c.Long(),
                        Type = c.Byte(nullable: false),
                        Priority = c.Byte(nullable: false),
                        State = c.Byte(nullable: false),
                        DueTime = c.DateTime(),
                        EndTime = c.DateTime(),
                        CreationTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AbpUsers", t => t.CrewLeaderId)
                .ForeignKey("dbo.AbpUsers", t => t.RequesterId)
                .Index(t => t.RequesterId)
                .Index(t => t.CrewLeaderId);
            
            CreateTable(
                "Tasks.TaskMember",
                c => new
                    {
                        TaskOrderID = c.Long(nullable: false),
                        UserID = c.Long(nullable: false),
                    })
                .PrimaryKey(t => new { t.TaskOrderID, t.UserID })
                .ForeignKey("Tasks.TaskOrder", t => t.TaskOrderID, cascadeDelete: true)
                .ForeignKey("dbo.AbpUsers", t => t.UserID, cascadeDelete: true)
                .Index(t => t.TaskOrderID)
                .Index(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("Tasks.TaskOrder", "RequesterId", "dbo.AbpUsers");
            DropForeignKey("Tasks.TaskMember", "UserID", "dbo.AbpUsers");
            DropForeignKey("Tasks.TaskMember", "TaskOrderID", "Tasks.TaskOrder");
            DropForeignKey("Tasks.TaskOrder", "CrewLeaderId", "dbo.AbpUsers");
            DropIndex("Tasks.TaskMember", new[] { "UserID" });
            DropIndex("Tasks.TaskMember", new[] { "TaskOrderID" });
            DropIndex("Tasks.TaskOrder", new[] { "CrewLeaderId" });
            DropIndex("Tasks.TaskOrder", new[] { "RequesterId" });
            DropTable("Tasks.TaskMember");
            DropTable("Tasks.TaskOrder");
        }
    }
}
