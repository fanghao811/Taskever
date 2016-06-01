using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using Taskever.Tasks.Dtos;

namespace Taskever.Tasks
{
    public interface ITaskOrderAppService : IApplicationService
    {
        GetTasksOutput GetTasks(GetTasksInput input);

        Task CreateOrUpdateTask(CreateOrUpdateTaskInput input);

        void DeleteTask(IdInput<long> input);
    }
}
