using Abp.Application.Services.Dto;
using Taskever.People.Dtos;
using System.Collections.Generic;

namespace Taskever.People
{
    public class GetAllPeopleOutput : IOutputDto
    {
        public List<PersonListDto> People { get; set; }
    }
}
