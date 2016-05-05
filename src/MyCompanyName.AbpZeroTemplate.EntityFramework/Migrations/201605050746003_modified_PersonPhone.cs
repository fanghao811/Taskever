namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modified_PersonPhone : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("Person.PersonPhone");
            AlterColumn("Person.PersonPhone", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("Person.PersonPhone", "PhoneNumber", c => c.String(nullable: false, maxLength: 16));
            AddPrimaryKey("Person.PersonPhone", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("Person.PersonPhone");
            AlterColumn("Person.PersonPhone", "PhoneNumber", c => c.String());
            AlterColumn("Person.PersonPhone", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("Person.PersonPhone", "Id");
        }
    }
}
