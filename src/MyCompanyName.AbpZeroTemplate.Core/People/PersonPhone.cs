using Abp.Domain.Entities;
using Taskever.People.Emun;
using System.ComponentModel.DataAnnotations.Schema;

namespace Taskever.People
{
    /// <summary>
    /// Represents a PersonPhone entity.
    /// 
    /// It inherits from <see cref="Entity"/> class (Optionally can implement <see cref="IEntity"/> directly).
    /// </summary>
    [Table("PersonPhone", Schema = "Person")]
    public class PersonPhone : Entity
    {
        public PersonPhone(){}
        public string PhoneNumber { get; set; }
        public PhoneNumberType PhoneNumberType { get; set; }
        [ForeignKey("Person")]
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }
    }
}
