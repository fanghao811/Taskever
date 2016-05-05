using Abp.Domain.Entities;
using Taskever.People.Emun;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Taskever.People
{
    /// <summary>
    /// Represents a PersonPhone entity.
    /// 
    /// It inherits from <see cref="Entity"/> class (Optionally can implement <see cref="IEntity"/> directly).
    /// </summary>
    [Table("PersonPhone", Schema = "Person")]
    public class PersonPhone : Entity<long>
    {
        public const int MaxNumberLength = 16;

        [ForeignKey("PersonId")]
        public virtual Person Person { get; set; }
        public virtual int PersonId { get; set; }

        [Required]
        public virtual PhoneNumberType PhoneNumberType { get; set; }

        [Required]
        [MaxLength(MaxNumberLength)]
        public virtual string PhoneNumber { get; set; }

    }
}
