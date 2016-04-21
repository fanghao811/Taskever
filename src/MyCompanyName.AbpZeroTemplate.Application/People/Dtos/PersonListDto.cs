using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Taskever.People.Emun;
using System;

namespace Taskever.People.Dtos
{
    [AutoMapFrom(typeof(Person))]
    public class PersonListDto : CreationAuditedEntity
    {
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string NationalIDNumber { get; set; }
    }
}


