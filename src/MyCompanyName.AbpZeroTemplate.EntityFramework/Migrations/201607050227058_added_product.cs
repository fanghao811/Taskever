namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class added_product : DbMigration
    {
        public override void Up()
        {
            AddColumn("Production.Product", "ModelNumber", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("Production.Product", "ModelNumber");
        }
    }
}
