using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Taskever.People.Emun;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace Taskever.People
{
    /// <summary>
    /// Represents a Person entity.
    /// It inherits from <see cref="Entity"/> class (Optionally can implement <see cref="IEntity"/> directly).
    /// </summary>
    [Table("Person", Schema = "Person")]
    public class Person : FullAuditedEntity
    {
        public Person()
        {
            PhoneList = new HashSet<PersonPhone>();
        }

        public Person(string name, Gender gender, DateTime? birthDate, string nationalIDNumber)
        {
            PhoneList = new HashSet<PersonPhone>();
        }

        public DateTime? BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string Name { get; set; }
        public string NationalIDNumber { get; set; }

        public virtual ICollection<PersonPhone> PhoneList { get; set; }
    }
}
