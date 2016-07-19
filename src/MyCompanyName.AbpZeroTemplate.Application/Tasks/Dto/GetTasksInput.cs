using Abp.Application.Services.Dto;
using Taskever.Tasks.Emun;

namespace Taskever.Tasks.Dto
{
    public class GetTasksInput: IInputDto
    {
         public TaskState? State { get; set; }
    }
}
