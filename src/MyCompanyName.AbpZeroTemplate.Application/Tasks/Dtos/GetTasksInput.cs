using Abp.Application.Services.Dto;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dtos
{
    public class GetTasksInput: IInputDto
    {
         public TaskState? State { get; set; }
    }
}
