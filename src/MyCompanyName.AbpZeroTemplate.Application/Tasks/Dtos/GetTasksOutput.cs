using Abp.Application.Services.Dto;
using System.Collections.Generic;

namespace Taskever.Tasks.Dtos
{
    public class GetTasksOutput : IOutputDto
    {
        public List<TaskDto> Tasks { get; set; }
    }
}
