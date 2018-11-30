namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_productModel_to_material : DbMigration
    {
        public override void Up()
        {
            AddColumn("Production.Product", "Abbreviation", c => c.String());
            AddColumn("Production.Product", "MnemonicCode", c => c.String());
            AddColumn("Production.Product", "Specification", c => c.String());
            AddColumn("Production.Product", "Unit", c => c.Byte(nullable: false));
            AddColumn("Production.Product", "Comment", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("Production.Product", "ProductNumber", c => c.String());
            AlterColumn("Production.Product", "ModelNumber", c => c.String(nullable: false, maxLength: 30));
            DropColumn("Production.Product", "Price");
            DropColumn("Production.Product", "UsingFlag");
            DropColumn("Production.Product", "StartDate");
            DropColumn("Production.Product", "DiscontinuedDate");
        }
        
        public override void Down()
        {
            AddColumn("Production.Product", "DiscontinuedDate", c => c.DateTime(nullable: false));
            AddColumn("Production.Product", "StartDate", c => c.DateTime(nullable: false));
            AddColumn("Production.Product", "UsingFlag", c => c.Boolean(nullable: false));
            AddColumn("Production.Product", "Price", c => c.Single(nullable: false));
            AlterColumn("Production.Product", "ModelNumber", c => c.String());
            AlterColumn("Production.Product", "ProductNumber", c => c.String(nullable: false, maxLength: 30));
            DropColumn("Production.Product", "Comment");
            DropColumn("Production.Product", "Unit");
            DropColumn("Production.Product", "Specification");
            DropColumn("Production.Product", "MnemonicCode");
            DropColumn("Production.Product", "Abbreviation");
        }
    }
}
