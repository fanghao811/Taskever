namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_seed_orgnization : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "Production.Product",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        DepartmentOuId = c.Long(),
                        LocationOuId = c.Long(),
                        CategoryOuId = c.Long(),
                        Name = c.String(nullable: false, maxLength: 30),
                        Price = c.Single(nullable: false),
                        ProductNumber = c.String(nullable: false, maxLength: 30),
                        ModelNumber = c.String(),
                        Description = c.String(nullable: false, maxLength: 100),
                        UsingFlag = c.Boolean(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        DiscontinuedDate = c.DateTime(nullable: false),
                        CreationTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AbpOrganizationUnits", t => t.CategoryOuId)
                .ForeignKey("dbo.AbpOrganizationUnits", t => t.DepartmentOuId)
                .ForeignKey("dbo.AbpOrganizationUnits", t => t.LocationOuId)
                .Index(t => t.DepartmentOuId)
                .Index(t => t.LocationOuId)
                .Index(t => t.CategoryOuId);
            
            AlterColumn("Tasks.TaskOrder", "Location", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropForeignKey("Production.Product", "LocationOuId", "dbo.AbpOrganizationUnits");
            DropForeignKey("Production.Product", "DepartmentOuId", "dbo.AbpOrganizationUnits");
            DropForeignKey("Production.Product", "CategoryOuId", "dbo.AbpOrganizationUnits");
            DropIndex("Production.Product", new[] { "CategoryOuId" });
            DropIndex("Production.Product", new[] { "LocationOuId" });
            DropIndex("Production.Product", new[] { "DepartmentOuId" });
            AlterColumn("Tasks.TaskOrder", "Location", c => c.String(maxLength: 50));
            DropTable("Production.Product");
        }
    }
}
