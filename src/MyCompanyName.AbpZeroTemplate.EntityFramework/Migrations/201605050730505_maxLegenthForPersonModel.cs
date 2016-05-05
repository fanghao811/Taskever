namespace Taskever.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class maxLegenthForPersonModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("Person.Person", "Name", c => c.String(nullable: false, maxLength: 32));
            AlterColumn("Person.Person", "NationalIDNumber", c => c.String(nullable: false, maxLength: 32));
        }
        
        public override void Down()
        {
            AlterColumn("Person.Person", "NationalIDNumber", c => c.String());
            AlterColumn("Person.Person", "Name", c => c.String());
        }
    }
}
