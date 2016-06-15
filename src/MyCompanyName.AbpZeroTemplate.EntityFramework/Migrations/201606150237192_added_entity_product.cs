namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class added_entity_product : DbMigration
    {
        public override void Up()
        {
            AddColumn("Production.Product", "DepartmentOuId", c => c.Long());
            AddColumn("Production.Product", "ProductNumber", c => c.String(nullable: false, maxLength: 30));
            AddColumn("Production.Product", "Description", c => c.String(nullable: false, maxLength: 100));
            AddColumn("Production.Product", "UsingFlag", c => c.Boolean(nullable: false));
            AddColumn("Production.Product", "StartDate", c => c.DateTime(nullable: false));
            AddColumn("Production.Product", "DiscontinuedDate", c => c.DateTime(nullable: false));
            AlterColumn("Production.Product", "Name", c => c.String(nullable: false, maxLength: 30));
            CreateIndex("Production.Product", "DepartmentOuId");
            AddForeignKey("Production.Product", "DepartmentOuId", "dbo.AbpOrganizationUnits", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("Production.Product", "DepartmentOuId", "dbo.AbpOrganizationUnits");
            DropIndex("Production.Product", new[] { "DepartmentOuId" });
            AlterColumn("Production.Product", "Name", c => c.String());
            DropColumn("Production.Product", "DiscontinuedDate");
            DropColumn("Production.Product", "StartDate");
            DropColumn("Production.Product", "UsingFlag");
            DropColumn("Production.Product", "Description");
            DropColumn("Production.Product", "ProductNumber");
            DropColumn("Production.Product", "DepartmentOuId");
        }
    }
}
