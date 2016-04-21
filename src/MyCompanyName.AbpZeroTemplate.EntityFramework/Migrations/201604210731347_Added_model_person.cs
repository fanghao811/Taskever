namespace Taskever.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Infrastructure.Annotations;
    using System.Data.Entity.Migrations;
    
    public partial class Added_model_person : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "Person.Person",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BirthDate = c.DateTime(),
                        Gender = c.Int(nullable: false),
                        Name = c.String(),
                        NationalIDNumber = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                        DeleterUserId = c.Long(),
                        DeletionTime = c.DateTime(),
                        LastModificationTime = c.DateTime(),
                        LastModifierUserId = c.Long(),
                        CreationTime = c.DateTime(nullable: false),
                        CreatorUserId = c.Long(),
                    },
                annotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Person_SoftDelete", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "Person.PersonPhone",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PhoneNumber = c.String(),
                        PhoneNumberType = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("Person.Person", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("Person.PersonPhone", "PersonId", "Person.Person");
            DropIndex("Person.PersonPhone", new[] { "PersonId" });
            DropTable("Person.PersonPhone");
            DropTable("Person.Person",
                removedAnnotations: new Dictionary<string, object>
                {
                    { "DynamicFilter_Person_SoftDelete", "EntityFramework.DynamicFilters.DynamicFilterDefinition" },
                });
        }
    }
}
