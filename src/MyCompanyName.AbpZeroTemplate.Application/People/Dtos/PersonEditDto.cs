using Abp.AutoMapper;
using Taskever.People.Emun;
using System;
using System.ComponentModel.DataAnnotations;

namespace Taskever.People.Dtos
{
    [AutoMapFrom(typeof(Person))]
    public class PersonEditDto
    {
        /// <summary>
        /// Set null to create a new person. Set user's Id to update a user
        /// </summary>
        public int? Id { get; set; }
        [Required]
        [MaxLength(Person.MaxNameLength)]
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public Gender Gender { get; set; }

        [Required]
        [MaxLength(Person.MaxNationalIDNumber)]
        public string NationalIDNumber { get; set; }
    }
}
