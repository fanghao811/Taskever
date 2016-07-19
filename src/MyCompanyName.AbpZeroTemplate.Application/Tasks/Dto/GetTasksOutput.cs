using Abp.Application.Services.Dto;
using System.Collections.Generic;

namespace Taskever.Tasks.Dto
{
    public class GetTaskForEditOutput : IOutputDto
    {
        public List<TaskEditDto> Tasks { get; set; }
    }
}
