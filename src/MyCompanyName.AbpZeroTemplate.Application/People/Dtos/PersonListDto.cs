using Abp.AutoMapper;
using Taskever.People.Emun;
using System;
using System.Collections.ObjectModel;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;

namespace Taskever.People.Dtos
{
    [AutoMapFrom(typeof(Person))]
    public class PersonListDto : CreationAuditedEntity
    {
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public Gender Gender { get; set; }
        public string NationalIDNumber { get; set; }

        public List<PhoneInPersonListDto> PhoneList { get; set; }
    }

    [AutoMapFrom(typeof(PersonPhone))]
    public class PhoneInPersonListDto : CreationAuditedEntityDto<long>
    {
        public PhoneNumberType PhoneNumberType { get; set; }

        public string PhoneNumber { get; set; }
    }

}


