using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Taskever.People.Emun;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Taskever.People
{
    /// <summary>
    /// Represents a Person entity.
    /// It inherits from <see cref="Entity"/> class (Optionally can implement <see cref="IEntity"/> directly).
    /// </summary>
    [Table("Person", Schema = "Person")]
    public class Person : FullAuditedEntity
    {
        public const int MaxNameLength = 32;
        public const int MaxNationalIDNumber = 32;

        public virtual DateTime? BirthDate { get; set; }
        public virtual Gender Gender { get; set; }

        [Required]
        [MaxLength(MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        [MaxLength(MaxNationalIDNumber)]
        public virtual string NationalIDNumber { get; set; }

        public virtual ICollection<PersonPhone> PhoneList { get; set; }
    }
}
